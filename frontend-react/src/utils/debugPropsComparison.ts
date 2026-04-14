// Создайте файл comparisonDebugger.ts
export function debugPropsComparison<T extends object>(
	componentName: string,
	prevProps: T,
	nextProps: T,
	keysToCheck: (keyof T)[]
): boolean {
	console.group(`${componentName} comparison for ${(prevProps as any).candidate?.id}`);

	let allEqual = true;

	for (const key of keysToCheck) {
		const prevValue = prevProps[key];
		const nextValue = nextProps[key];

		if (prevValue !== nextValue) {
			console.log(`❌ ${String(key)} changed:`, prevValue, '→', nextValue);
			allEqual = false;
		} else {
			console.log(`✅ ${String(key)} equal`);
		}
	}

	console.groupEnd();
	return allEqual;
}