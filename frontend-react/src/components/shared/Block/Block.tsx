'use client';

import { Tooltip } from '@/components/ui/tooltip';
import { COLORS } from '@/constants/colors';
import { Box, BoxProps, Flex, Separator } from '@chakra-ui/react';
import clsx from 'clsx';
import React from 'react';
import { CiCircleQuestion } from 'react-icons/ci';
import styles from './Block.module.scss';
import { Typo } from '../Typo/Typo';
import { Tip, TooltipPlacement } from '../Tip';
import { useAppSelector } from '@/store/store';
import { selectIsTipsShow } from '@/store/slices/appSlice';

interface Props extends BoxProps {
	heading?: React.ReactNode; // Заголовок опционален
	showSeparator?: boolean; // Опциональный флаг для отображения разделителя
	headingText?: string | React.ReactNode; // Жирный чёрный текст - заголовок для блока
	subHeadingText?: string; // Серый текст, подзаголовок
	tooltip?: string; // Наличие значка ? с тултипом
	tooltipClickHandler?: () => void; // Коллбэк для открытия модалки при клике на ?
	separatorProps?: {
		width?: string;
		marginTop?: string;
		marginBottom?: string;
	}; // Пропсы для кастомизации разделителя
	isDanger?: boolean;
	// Минифицированная версия для адаптива (обрезацет subHeadingText и выравнивает элементы heading по вертикали)
	minified?: boolean;
	// Пропс для красной обводки блока
	isDangerBorder?: boolean;
	helpTipText?: React.ReactElement; // Текст для подсказки при включении функционала подсказок
	helpTipPlacement?: TooltipPlacement; // Расположение подсказки
	showArrowHelpTip?: boolean; // Показывать ли стрелочку на подсказке
	paddingDisabled?: boolean;
}

export const Block: React.FC<Props> = ({
	heading,
	children,
	headingText,
	subHeadingText,
	showSeparator = true, // По умолчанию разделитель отображается
	separatorProps = { width: '100%', marginTop: '16px', marginBottom: '24px' },
	isDanger = false,
	minified = false,
	isDangerBorder = false,
	tooltip,
	helpTipText,
	helpTipPlacement,
	showArrowHelpTip = true,
	tooltipClickHandler,
	paddingDisabled = false,
	...props
}) => {
	const headerStyle = [styles.header, styles.container].join(' ');
	const subHeaderTextColor = isDanger ? COLORS.ORANGE_400 : COLORS.GRAY_500;
	const className = clsx(
		styles.block,
		props.className,
		minified && styles.minified,
		isDangerBorder && styles.dangerBorder
	);
	const isTipsShow = useAppSelector(selectIsTipsShow);

	return (
		<Box className={className} {...props}>
			{(heading || headingText) && (
				<>
					<Box className={headerStyle}>
						{headingText && (
							<Box className={styles.headings}>
								<Flex alignItems="center" gap={2}>
									<Typo
										padding={`${headingText && !subHeadingText && `12px`} 0`}
										size="16px"
										weight="medium"
										color={COLORS.GRAY_800}
									>
										{headingText}
									</Typo>
									{isTipsShow && helpTipText && (
										<Tip
											questionIconSize={16}
											showArrow={showArrowHelpTip}
											content={helpTipText}
											placement={helpTipPlacement}
										/>
									)}
								</Flex>

								{!minified && subHeadingText && (
									<Typo size="14px" fontWeight="400" color={subHeaderTextColor}>
										{subHeadingText}
									</Typo>
								)}
							</Box>
						)}
						{heading}
						{tooltip && (
							<Tooltip content={tooltip} openDelay={0}>
								<CiCircleQuestion
									className={styles.tooltip}
									color={COLORS.BLUE_400}
									onClick={tooltipClickHandler}
								/>
							</Tooltip>
						)}
					</Box>
					{showSeparator && <Separator {...separatorProps} />}
				</>
			)}
			<Box className={clsx(styles.container, paddingDisabled && styles.paddingDisabled)}>
				{children}
			</Box>
		</Box>
	);
};
