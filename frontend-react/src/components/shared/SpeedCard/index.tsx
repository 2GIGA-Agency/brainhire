import { Box, Flex, Spinner, Text } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

interface SpeedCardProps {
	label: string;
	speed: string | null;
	unit?: string;
	direction: 'down' | 'up';
	loading?: boolean;
}

const getBorderColor = (speed: number) => {
	if (speed < 5) {
		return 'red.400';
	} else if (speed < 20) {
		return 'yellow.400';
	} else {
		return 'green.400';
	}
};

export const SpeedCard: React.FC<SpeedCardProps> = ({
	label,
	speed = 0,
	unit = 'Мбит/сек',
	direction,
	loading = false,
}) => {
	const borderColor = getBorderColor(Number(speed));
	const iconPath = direction === 'down' ? '/icons/IoArrowDown.svg' : '/icons/IoArrowUp.svg';

	return (
		<Box
			border="2px solid"
			borderColor={loading ? 'gray.300' : borderColor}
			borderRadius="md"
			p={4}
			minW="200px"
			textAlign="center"
		>
			<Text fontSize="sm" color="gray.600" mb={2}>
				{label}
			</Text>

			<Flex align="baseline" justify="center" mb={1} alignItems="center" gap={2} height="45px">
				{loading ? (
					<Spinner colorPalette="orange" color="gray.300" />
				) : (
					<>
						<Image src={iconPath} alt="arrow" height={32} width={32} />
						<Text fontSize="3xl" fontWeight="bold">
							{speed}
						</Text>
					</>
				)}
			</Flex>

			<Text fontSize="sm" color="gray.600">
				{unit}
			</Text>
		</Box>
	);
};
