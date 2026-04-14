export function mapObjectToArray<T>(
	obj: Record<string, T>,
	idKey: string
): Array<T & Record<string, string>> {
	return Object.entries(obj).map(
		([key, value]) =>
			({ ...value, [idKey]: key }) as T & Record<string, string>
	);
}
