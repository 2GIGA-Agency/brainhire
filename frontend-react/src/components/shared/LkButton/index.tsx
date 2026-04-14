import { COLORS } from '@/constants/colors';
import { Button, ButtonProps, Flex } from '@chakra-ui/react';
import React from 'react';

interface Props extends ButtonProps {
	bg?: string;
	icon?: React.ReactNode;
	hoverColor?: string;
	disabled?: boolean;
	heightSize?: 'regular' | 'medium';
}

// Функция для поиска ключа цвета по значению RGBA
const findColorKey = (rgbaValue: string): keyof typeof COLORS | null => {
	// Нормализуем строку RGBA (удаляем пробелы после запятых)
	const normalizedInput = rgbaValue.replace(/,\s*/g, ',');

	for (const [key, value] of Object.entries(COLORS)) {
		// Нормализуем значение из COLORS
		const normalizedValue = value.replace(/,\s*/g, ',');
		if (normalizedValue === normalizedInput) {
			return key as keyof typeof COLORS;
		}
	}
	return null;
};

// Функция для получения более светлого цвета
const getLighterColor = (currentColor: string): string => {
	// Находим ключ текущего цвета
	const colorKey = findColorKey(currentColor);
	if (!colorKey) return currentColor;

	// Разбиваем ключ на части (например, "BLUE_500" -> ["BLUE", "500"])
	const parts = colorKey.split('_');
	if (parts.length !== 2) return currentColor;

	const [colorName, shadeStr] = parts;
	const shade = parseInt(shadeStr);

	// Ищем более тёмный оттенок (увеличиваем число на 100)
	const lighterShade = shade + 100;
	if (lighterShade > 900) return currentColor; // Не делаем темнее максимального оттенка

	const lighterColorKey = `${colorName}_${lighterShade}` as keyof typeof COLORS;

	// Возвращаем более тёмный цвет, если он существует
	return COLORS[lighterColorKey] || currentColor;
};

export const LkButton = ({
	bg = COLORS.BLUE_400,
	icon,
	hoverColor,
	onClick,
	disabled = false,
	heightSize = 'regular',
	children,
	...props
}: Props) => {
	let height;

	switch (heightSize) {
		case 'regular':
			height = '32px';
			break;
		case 'medium':
			height = '40px';
			break;
	}

	// Определяем цвет для hover
	const hoverBgColor = hoverColor || (bg ? getLighterColor(bg) : undefined);

	return (
		<Button
			padding="6px 12px"
			bg={bg}
			h={height}
			borderRadius="6px"
			_hover={hoverBgColor ? { bgColor: hoverBgColor } : undefined}
			onClick={onClick}
			disabled={disabled}
			{...props}
		>
			<Flex gap="8px" alignItems={'center'}>
				{icon}
				{children}
			</Flex>
		</Button>
	);
};
