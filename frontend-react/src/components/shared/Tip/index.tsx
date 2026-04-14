import { Tooltip, TooltipProps } from '@/components/ui/tooltip';
import React from 'react';
import { HiOutlineQuestionMarkCircle } from 'react-icons/hi';
import styles from './styles.module.scss';
import { toggleIsModalShow } from '@/store/slices/appSlice';
import { COLORS } from '@/constants/colors';
import { useAppDispatch } from '@/store/store';
import { Box } from '@chakra-ui/react';

export type TooltipPlacement =
	| 'top'
	| 'right'
	| 'bottom'
	| 'left'
	| 'top-start'
	| 'top-end'
	| 'right-start'
	| 'right-end'
	| 'bottom-start'
	| 'bottom-end'
	| 'left-start'
	| 'left-end';

interface Props extends TooltipProps {
	children?: React.ReactElement;
	placement?: TooltipPlacement;

	content: React.ReactElement;
	open?: boolean;
	showArrow?: boolean;
	questionIcon?: boolean;
	questionIconSize?: number;
}

export function Tip({
	content,
	children,
	open,
	showArrow = false,
	questionIcon = true,
	placement = 'top',
	questionIconSize = 24,
}: Props) {
	const dispatch = useAppDispatch();

	return (
		<Tooltip
			open={open}
			openDelay={0}
			closeDelay={0}
			showArrow={showArrow}
			content={content}
			onOpenChange={() => {
				dispatch(toggleIsModalShow());
			}}
			contentProps={{ css: { '--tooltip-bg': COLORS.WHITE, padding: '12px' } }}
			positioning={{ placement: placement }}
		>
			<Box zIndex={701}>
				{children}
				{questionIcon && (
					<HiOutlineQuestionMarkCircle
						className={styles.tip}
						cursor={'help'}
						size={questionIconSize}
					/>
				)}
			</Box>
		</Tooltip>
	);
}
