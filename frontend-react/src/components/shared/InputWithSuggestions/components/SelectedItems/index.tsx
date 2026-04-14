import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { EllipsisTextWithTooltip } from '@/components/shared/EllipsisTextWithTooltip';

interface Props {
	selectedItems: string[];
	renderItem?: (item: string) => React.ReactNode;
	onRemoveItem: (item: string) => void;
	position?: 'top' | 'down';
}

export function SelectedItems({
	selectedItems,
	renderItem,
	onRemoveItem,
	position = 'top',
}: Props) {
	return (
		<>
			{selectedItems.length > 0 && (
				<Flex gap={2} wrap="wrap" mb={position === 'top' ? 2 : 0} mt={position === 'down' ? 2 : 0}>
					{selectedItems.map((item, index) => (
						<Box
							key={index}
							bg="blue.50"
							px={2}
							py={1}
							borderRadius="md"
							display="inline-flex"
							alignItems="center"
							zIndex={1}
						>
							{renderItem ? (
								renderItem(item)
							) : (
								<EllipsisTextWithTooltip text={item} maxW="180px" />
							)}
							<Box
								as="button"
								ml={2}
								cursor="pointer"
								onClick={() => onRemoveItem(item)}
								aria-label="Удалить"
							>
								×
							</Box>
						</Box>
					))}
				</Flex>
			)}
		</>
	);
}
