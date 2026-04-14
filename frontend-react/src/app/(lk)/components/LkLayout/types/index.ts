export interface BreadCrumbItem {
	route: RegExp;
	heading: string;
	breadCrumbText?: string; // пишем, если заголовок отличается от текста в хлебной крошке
	isParentRoute?: boolean; // Этот флаг указывает, что маршрут может иметь дочерние страницы
	preHeading?: string[] | [string, string];
	tip?: React.ReactElement;
}
