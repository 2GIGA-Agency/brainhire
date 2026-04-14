import { Flex, Skeleton, Stack } from '@chakra-ui/react';
import styles from '../Publications.module.scss';
import { Block } from '@/components/shared/Block';

export const PublicationsSkeleton = () => (
	// Убрали <Box className={styles.secondaryBlock}>
	<Block
		width="100%" // Добавляем явную ширину, чтобы совпадало с соседями
		separatorProps={{ marginTop: '16px', marginBottom: '16px' }}
		heading={
			<Flex justifyContent="space-between" alignItems="center" w={'100%'}>
				<Skeleton height="24px" width="180px" />
				<Skeleton height="24px" width="80px" />
			</Flex>
		}
	>
		<Stack className={styles.px} gap={4} pt={2}>
			<Skeleton height="48px" borderRadius="md" />
			<Skeleton height="40px" />
		</Stack>
	</Block>
);
