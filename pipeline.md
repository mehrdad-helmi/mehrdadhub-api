# Whole CI/CD Pipeline
#### Start Feature Development
* [x] Create a new branch from `develop` like `featureA`
* [ ] Develop and commit to featureA

#### Finish **Primary** Work on `featureA`
* [ ] Create a pull request to merge branch with `deevpment` ***(must have .changeset)***
* [ ] After accepting PR `featureA` branch will be removed.
* [ ] Commit bug fixes on develop ***(must have .changeset)***

> - Each push to `develop` has a deployment to `staging`
> - If it has no .changeset deploy must not precede
> - Version will pull from package.json after version bump
> - Build tag example : 1.0.0-beta

#### Ready Package for release
* [ ] Create a `release-1.2` branch from develop.***(must not have .changeset)***
* [ ] At this point developing new feature could start on `develop` branch.
* [ ] Commit last minute fixes on `release-1.2`***(must have .changeset)***

> - Each push to `release` has a deployment to `staging`
> - Build tag example : 1.2.1-rc

#### Production Deployment
* [ ] Tag `release-1.2` branch with latest version number.
* [ ] Merge `release-1.2` branch to `master`.
* [ ] Create a GitHub release from the tag.
* [ ] Deploy.
* [ ] Merge `release-1.2` branch back to `develop`.
* [ ] Delete `release-1.2` branch.

> - Each push to `master` has a deployment to `production`
> - Build tag example : 1.2.1

#### Hotfixes
* [ ] Create a `hotfix-1.2.2` branch from `master`.
* [ ] Fix the bug and create a changeset.
* [ ] Bump the version after all fix commits.
* [ ] Create a tag.
* [ ] Merge with `master`.
* [ ] Create a GitHub release from the tag.
* [ ] Delete `hotfix-1.2.2`
