###################
# BUILD FOR PRODUCTION
###################

# Use the official Node.js 20 image.
FROM node:20-alpine AS build
LABEL "org.opencontainers.image.source"="https://github.com/mehrdad-redhat/mehrdadhub-api"

# Create and set the working directory.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory.
COPY --chown=node:node package*.json ./

# Install the dependencies.
RUN npm ci

# Copy the rest of the application code to the working directory.
COPY --chown=node:node . .

RUN npm run prisma:generate

# Build the application.
RUN npm run build

# Running `npm ci` removes the existing node_modules directory and passing in --only=production ensures that only the production dependencies are installed. This ensures that the node_modules directory is as optimized as possible
RUN npm ci --omit=dev && npm cache clean --force

# Use the node user from the image (instead of the root user)
USER node

###################
# PRODUCTION
###################

FROM node:20-alpine AS production
LABEL "org.opencontainers.image.source"="https://github.com/mehrdad-redhat/mehrdadhub-api"

# Install PM2 globally
RUN npm install -g pm2

# Copy the PM2 ecosystem configuration file
COPY --chown=node:node --from=build /usr/src/app/ecosystem.config.js .
# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/package.json .
COPY --chown=node:node --from=build /usr/src/app/build ./build
COPY --chown=node:node --from=build /usr/src/app/prisma/schema.prisma ./prisma/schema.prisma

# Expose the application port.
EXPOSE 5050
EXPOSE 4040

# Run the application with PM2 using the ecosystem file.
CMD ["npm", "run", "start:prod"]
