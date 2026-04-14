import { BreadCrumbItem } from '../types';

export const generateBreadcrumbs = (headings: BreadCrumbItem[], pathname: string) => {
	const breadcrumbs = [
		{
			href: '/vacancy',
			label: 'BRaiN',
		},
	];
	let currentPath = '';

	const pathParts = pathname.split('/').filter(Boolean);

	for (let i = 0; i < pathParts.length; i++) {
		currentPath += `/${pathParts[i]}`;

		const matchedHeading = headings.find((item) => item.route.test(currentPath));

		if (matchedHeading) {
			if (matchedHeading.isParentRoute && currentPath !== pathname) {
				continue;
			}

			breadcrumbs.push({
				href: currentPath,
				label: matchedHeading.breadCrumbText || matchedHeading.heading,
			});
		}

		if (matchedHeading?.preHeading && breadcrumbs.length) {
			const endCrumb = breadcrumbs.pop();
			matchedHeading.preHeading.map((i) => {
				breadcrumbs.push({
					href: currentPath,
					label: i,
				});
			});
			// @ts-expect-error В if есть проверка на пустоту массива, endCrumb не может быть пустым никак
			breadcrumbs.push(endCrumb);
		}
	}

	return breadcrumbs;
};
