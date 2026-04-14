export const getWorkDaysColor = (days: number): string => {
	let color: string = 'red';
	if (days <= 30) color = 'green';
	if (days > 30 && days <= 60) color = 'yellow';
	return color;
};
