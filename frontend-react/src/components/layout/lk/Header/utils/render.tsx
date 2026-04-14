// utils/renderNavigationLinks.tsx (или utils/render.ts)

import Link from 'next/link';
import { List } from '@chakra-ui/react';
import { IHeaderLinkItemExtended } from '../types'; // Убедитесь, что тип импортирован

interface RenderNavigationLinksOptions {
	items: IHeaderLinkItemExtended[];
	currentPath: string;
	condition?: (item: IHeaderLinkItemExtended) => boolean;
	activeClassName?: string;
	onItemClick?: () => void;
}

export const renderNavigationLinks = ({
	items,
	currentPath,
	condition,
	activeClassName = 'active',
	onItemClick,
}: RenderNavigationLinksOptions) => {
	const filteredItems = condition ? items.filter(condition) : items;

	const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
		if (e.key === ' ') {
			e.preventDefault();
			e.currentTarget.click();
		}
	};

	return filteredItems.map((item) => {
		const isActive = currentPath.startsWith(item.path);
		const className = isActive ? activeClassName : '';

		return (
			<List.Item mt={1} key={item.path} onClick={onItemClick}>
				<Link href={item.path} className={className} onKeyDown={handleKeyDown}>
					{item.name}
				</Link>
			</List.Item>
		);
	});
};
