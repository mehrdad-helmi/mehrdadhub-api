/**
 * It's a helper method that returns whatever it takes without the provided keys
 * For example excluding password field from returing user object
 * @param model
 * @param keys
 */
export function excludeFields<T extends object, Key extends keyof T>(
	model: T,
	keys: Key[],
): Omit<T, Key> {
	return Object.fromEntries(
		Object.entries(model).filter(([key]) => !keys.includes(key as Key)),
	) as Omit<T, Key>;
}
