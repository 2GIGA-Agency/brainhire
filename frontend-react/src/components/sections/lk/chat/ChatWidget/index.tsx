'use client';

import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { Box } from '@chakra-ui/react';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { toggleChatWidgetShow } from '@/store/slices/appSlice';

import styles from './ChatWidget.style.module.scss';
import { ChatWidgetContent } from '../ChatWidgetContent';
import { selectSelectedTopicId, setSelectedTopicId } from '@/store/slices/chatSlice';

const MIN_WIDTH_COLLAPSED = 380;
const MIN_HEIGHT = 500;
const DEFAULT_WIDTH_COLLAPSED = 400;
const DEFAULT_HEIGHT = 700;
const DEFAULT_POS_BOTTOM = 100;
const DEFAULT_POS_RIGHT = 32;
const BREAKPOINT = 900;

export const ChatWidget = () => {
	const dispatch = useAppDispatch();
	const widgetRef = useRef<HTMLDivElement>(null);

	const selectedTopicId = useAppSelector(selectSelectedTopicId);

	const [widgetSize, setWidgetSize] = useState({
		width: DEFAULT_WIDTH_COLLAPSED,
		height: DEFAULT_HEIGHT,
	});
	const [widgetPosition, setWidgetPosition] = useState({
		bottom: DEFAULT_POS_BOTTOM,
		right: DEFAULT_POS_RIGHT,
	});

	/// Refs для хранения промежуточных данных во время drag & resize
	const resizeDataRef = useRef<{
		isResizing: boolean;
		direction: string;
		startX: number;
		startY: number;
		startWidth: number;
		startHeight: number;
		startBottom: number;
		startRight: number;
	} | null>(null);
	const dragDataRef = useRef<{
		isDragging: boolean;
		startX: number;
		startY: number;
		startBottom: number;
		startRight: number;
	} | null>(null);

	const positionRef = useRef(widgetPosition);
	const sizeRef = useRef(widgetSize);

	useLayoutEffect(() => {
		positionRef.current = widgetPosition;
		sizeRef.current = widgetSize;
	}, [widgetPosition, widgetSize]);

	// --- Логика обработки событий мыши ---

	const handleMouseMove = useCallback((e: MouseEvent) => {
		if (resizeDataRef.current?.isResizing) {
			const { direction, startX, startY, startWidth, startHeight, startBottom, startRight } =
				resizeDataRef.current;

			const clampedX = Math.max(0, Math.min(e.clientX, window.innerWidth));
			const clampedY = Math.max(0, Math.min(e.clientY, window.innerHeight));

			const deltaX = clampedX - startX;
			const deltaY = clampedY - startY;

			let newWidth = startWidth;
			let newHeight = startHeight;
			let newBottom = startBottom;
			let newRight = startRight;

			if (direction.includes('e')) newWidth = startWidth + deltaX;
			else if (direction.includes('w')) newWidth = startWidth - deltaX;
			if (direction.includes('s')) newHeight = startHeight + deltaY;
			else if (direction.includes('n')) newHeight = startHeight - deltaY;

			const finalWidth = Math.max(MIN_WIDTH_COLLAPSED, newWidth);
			const finalHeight = Math.max(MIN_HEIGHT, newHeight);

			const actualWidthChange = finalWidth - startWidth;
			const actualHeightChange = finalHeight - startHeight;

			if (direction.includes('e')) newRight = startRight - actualWidthChange;
			if (direction.includes('s')) newBottom = startBottom - actualHeightChange;

			if (newBottom < 0) newBottom = 0;
			if (newRight < 0) newRight = 0;
			if (newBottom + finalHeight > window.innerHeight) {
				const overflow = newBottom + finalHeight - window.innerHeight;
				newBottom -= overflow;
				if (newBottom < 0) newBottom = 0;
			}
			if (newRight + finalWidth > window.innerWidth) {
				const overflow = newRight + finalWidth - window.innerWidth;
				newRight -= overflow;
				if (newRight < 0) newRight = 0;
			}

			setWidgetSize({ width: finalWidth, height: finalHeight });
			setWidgetPosition({ bottom: newBottom, right: newRight });
		} else if (dragDataRef.current?.isDragging) {
			const { startX, startY, startBottom, startRight } = dragDataRef.current;
			const currentWidth = sizeRef.current.width;
			const currentHeight = sizeRef.current.height;

			let newBottom = startBottom + (startY - e.clientY);
			let newRight = startRight + (startX - e.clientX);

			if (newBottom < 0) newBottom = 0;
			if (newRight < 0) newRight = 0;
			if (newBottom > window.innerHeight - currentHeight) {
				newBottom = window.innerHeight - currentHeight;
			}
			if (newRight > window.innerWidth - currentWidth) {
				newRight = window.innerWidth - currentWidth;
			}

			setWidgetPosition({ bottom: newBottom, right: newRight });
		}
	}, []);

	const handleMouseUp = useCallback(() => {
		if (resizeDataRef.current) resizeDataRef.current.isResizing = false;
		if (dragDataRef.current) dragDataRef.current.isDragging = false;
		document.body.style.cursor = '';
		document.removeEventListener('mousemove', handleMouseMove);
		document.removeEventListener('mouseup', handleMouseUp);
	}, [handleMouseMove]);

	const handleResizeMouseDown = useCallback(
		(e: React.MouseEvent<HTMLDivElement>, direction: string) => {
			e.preventDefault();
			e.stopPropagation();
			if (!widgetRef.current) return;

			resizeDataRef.current = {
				isResizing: true,
				direction,
				startX: e.clientX,
				startY: e.clientY,
				startWidth: sizeRef.current.width,
				startHeight: sizeRef.current.height,
				startBottom: positionRef.current.bottom,
				startRight: positionRef.current.right,
			};
			document.addEventListener('mousemove', handleMouseMove);
			document.addEventListener('mouseup', handleMouseUp);
		},
		[handleMouseMove, handleMouseUp]
	);

	const handleHeaderMouseDown = useCallback(
		(e: React.MouseEvent<HTMLElement>) => {
			if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('a'))
				return;
			e.preventDefault();
			dragDataRef.current = {
				isDragging: true,
				startX: e.clientX,
				startY: e.clientY,
				startBottom: positionRef.current.bottom,
				startRight: positionRef.current.right,
			};
			document.body.style.cursor = 'grabbing';
			document.addEventListener('mousemove', handleMouseMove);
			document.addEventListener('mouseup', handleMouseUp);
		},
		[handleMouseMove, handleMouseUp]
	);

	// ИЗМЕНЕНИЕ: Теперь эта функция диспатчит экшен в Redux
	const handleSelectChat = useCallback(
		(topicId: string) => {
			dispatch(setSelectedTopicId(topicId));
		},
		[dispatch]
	);

	// ИЗМЕНЕНИЕ: При возврате назад диспатчим пустую строку, чтобы сбросить ID
	const handleBack = useCallback(() => {
		dispatch(setSelectedTopicId(''));
	}, [dispatch]);

	const handleCloseWidget = useCallback(() => dispatch(toggleChatWidgetShow()), [dispatch]);

	const isMobileView = widgetSize.width < BREAKPOINT;

	// --- ИЗМЕНЕНИЕ: Упрощенная логика переключения ширины виджета ---
	const handleToggleChatArea = useCallback(() => {
		setWidgetSize((currentSize) => {
			if (currentSize.width < BREAKPOINT) {
				// Если виджет свернут, разворачиваем его до брекпоинта
				return { ...currentSize, width: BREAKPOINT };
			}
			// Если виджет развернут, сворачиваем до дефолтной ширины
			return { ...currentSize, width: DEFAULT_WIDTH_COLLAPSED };
		});
	}, []);

	// --- ИЗМЕНЕНИЕ: Состояние "развернут" теперь зависит только от ширины ---
	const isExpanded = widgetSize.width >= BREAKPOINT;

	return (
		<Box
			ref={widgetRef}
			className={clsx(styles.widgetContainer, isMobileView && styles.isMobileView)}
			style={{
				width: `${widgetSize.width}px`,
				height: `${widgetSize.height}px`,
				bottom: `${widgetPosition.bottom}px`,
				right: `${widgetPosition.right}px`,
			}}
		>
			{/* "Ручки" для изменения размера */}
			<div
				onMouseDown={(e) => handleResizeMouseDown(e, 'n')}
				className={clsx(styles.resizeHandle, styles.n)}
			/>
			<div
				onMouseDown={(e) => handleResizeMouseDown(e, 'ne')}
				className={clsx(styles.resizeHandle, styles.ne)}
			/>
			<div
				onMouseDown={(e) => handleResizeMouseDown(e, 'e')}
				className={clsx(styles.resizeHandle, styles.e)}
			/>
			<div
				onMouseDown={(e) => handleResizeMouseDown(e, 'se')}
				className={clsx(styles.resizeHandle, styles.se)}
			/>
			<div
				onMouseDown={(e) => handleResizeMouseDown(e, 's')}
				className={clsx(styles.resizeHandle, styles.s)}
			/>
			<div
				onMouseDown={(e) => handleResizeMouseDown(e, 'sw')}
				className={clsx(styles.resizeHandle, styles.sw)}
			/>
			<div
				onMouseDown={(e) => handleResizeMouseDown(e, 'w')}
				className={clsx(styles.resizeHandle, styles.w)}
			/>
			<div
				onMouseDown={(e) => handleResizeMouseDown(e, 'nw')}
				className={clsx(styles.resizeHandle, styles.nw)}
			/>

			<ChatWidgetContent
				isMobileView={isMobileView}
				selectedTopicId={selectedTopicId}
				onSelectChat={handleSelectChat}
				onBack={handleBack}
				onClose={handleCloseWidget}
				onHeaderMouseDown={handleHeaderMouseDown}
				isExpanded={isExpanded}
				onToggleChatArea={handleToggleChatArea}
			/>
		</Box>
	);
};
