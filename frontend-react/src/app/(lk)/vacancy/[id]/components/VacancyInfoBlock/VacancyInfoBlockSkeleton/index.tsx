// VacancyInfoBlockSkeleton.tsx

// 1. Добавьте SimpleGrid в импорты из @chakra-ui/react
import { Box, Flex, SimpleGrid, Skeleton } from '@chakra-ui/react';
import styles from '../style.module.scss';
import { Block } from '@/components/shared/Block';

export const VacancyInfoBlockSkeleton = () => {
	// Скелет для заголовка остается тем же
	const skeletonHeading = (
		<Box className={styles.heading}>
			<Flex alignItems="center">
				<Skeleton height="24px" width="150px" borderRadius="md" />
			</Flex>
			<Flex alignItems={'center'} gap={2} className={styles.headingButtons}>
				<Skeleton height="28px" width="170px" borderRadius="md" />
				<Skeleton height="28px" width="230px" borderRadius="md" />
				<Skeleton height="28px" width="150px" borderRadius="md" />
			</Flex>
		</Box>
	);

	return (
		<Block heading={skeletonHeading}>
			<Box className={styles.px}>
				<Box my={6}>
					{' '}
					{/* Добавлен отступ для визуального разделения */}
					<SimpleGrid columns={2} spaceY={4}>
						{/* Создаем массив из 8 элементов и рендерим скелет для каждого */}
						{Array.from({ length: 16 }).map((_, index) => (
							<Skeleton height="16px" width="150px" borderRadius="md" key={index} />
						))}
					</SimpleGrid>
				</Box>

				{/* Скелет для аккордеона остается тем же */}
				<Flex direction="column" gap={4} mt={4}>
					<Skeleton height="48px" width="100%" borderRadius="md" />
					<Skeleton height="48px" width="100%" borderRadius="md" />
					<Skeleton height="48px" width="100%" borderRadius="md" />
				</Flex>
			</Box>
		</Block>
	);
};
