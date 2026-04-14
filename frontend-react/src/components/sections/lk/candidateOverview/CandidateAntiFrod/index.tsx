import { Block } from '@/components/shared/Block';
import axios from '@/utils/axios';
import { Box, BoxProps, Flex, Skeleton, SkeletonText } from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';

interface Props extends BoxProps {
	candidateId: string;
}

interface AntiFrodReponse {
	dev_tools_count: number;
	lost_window_focus_count: number;
	copy_count: number;
}

export function CandidateAntiFrod({ candidateId, ...props }: Props) {
	const [lostWindowCount, setLostWindowCount] = useState(0);
	const [copyCount, setCopyCount] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const antiFrodNegative = lostWindowCount > 2 || copyCount > 1;

	useEffect(() => {
		const fetchAntiFrod = async () => {
			try {
				setIsLoading(true);
				const response = await axios.get<AntiFrodReponse>(
					`/api/candidates/antifrod/${candidateId}`
				);
				const { lost_window_focus_count, copy_count } = response.data;
				setLostWindowCount(lost_window_focus_count);
				setCopyCount(copy_count);
			} catch (e: unknown) {
				if (isAxiosError(e)) {
					setError('Произошла ошибка получения Антифрод данных, попробуйте позже');
				}
			} finally {
				setIsLoading(false);
			}
		};
		fetchAntiFrod();
	}, [candidateId]);

	// Skeleton на загрузку
	if (isLoading) {
		return (
			<Block
				heading={
					<Flex gap={2} alignItems="center">
						<Skeleton w={5} h={5} borderRadius={6} />
						<Skeleton h={4} w="200px" />
					</Flex>
				}
				{...props}
			>
				<SkeletonText mt={2} noOfLines={2} />
			</Block>
		);
	}

	return (
		<Block
			heading={
				<>
					<Flex gap={2} alignItems="center">
						<Box
							w={5}
							h={5}
							borderRadius={6}
							bgColor={antiFrodNegative ? 'red.400' : 'green.400'}
						></Box>
						Антифрод: действия при прохождении интервью
					</Flex>
				</>
			}
			{...props}
		>
			Переход на другое окно: {lostWindowCount}
			<br />
			Копирование текста: {copyCount}
			<br />
		</Block>
	);
}
