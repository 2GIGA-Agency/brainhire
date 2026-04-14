import { Block } from '@/components/shared/Block';
import { InfoBlock } from '@/components/ui-kit/InfoBlock';
import { useResize } from '@/hooks/useResize';
import { Button, Grid } from '@chakra-ui/react';
import Image from 'next/image';
import { useState } from 'react';
import { BehaviorDemo } from './BehaviorDemo';
import { BehaviorModal } from './BehaviorModal';
import styles from './styles.module.scss';
import { COLORS } from '@/constants/colors';
import { Typo } from '@/components/shared/Typo/Typo';

interface Props {
	candidateId: string;
	isVideoInterviewPassed?: boolean;
}

export function OrderBehaviorAnalysis({ candidateId, isVideoInterviewPassed = true }: Props) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);

	const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

	const [width] = useResize();

	const handleIsOpen = (isOpen: boolean, isResponseSend?: boolean) => {
		setIsModalOpen(isOpen);
		if (isResponseSend) {
			setIsButtonDisabled(true);
		}
	};

	const isMinified = width < 420;

	return (
		<>
			<BehaviorModal isOpen={isModalOpen} setIsOpen={handleIsOpen} candidateId={candidateId} />
			<BehaviorDemo isOpen={isDemoModalOpen} setIsOpen={setIsDemoModalOpen} />
			<Block
				headingText="Поведенческий анализ"
				subHeadingText="Анализ поведения кандидата на интервью"
				tooltip="Что такое поведенческий анализ?"
				tooltipClickHandler={() => setIsDemoModalOpen(true)}
				minH={'420px'}
			>
				<Grid h="100%" gridTemplateRows={'auto 1fr'}>
					<InfoBlock minified={isMinified} headingText="Пояснение">
						Наш ИИ сам проанализирует видео-интервью и даст краткий психологический портрет
						кандидата. Стоимость анализа мимики - 200 токенов.
					</InfoBlock>
					{/* Тут не делаю LkButton, т.к. есть проблема с модульными стилями CSS */}
					<Button
						size="sm"
						bg={COLORS.BLUE_400}
						_hover={{ bg: COLORS.BLUE_500 }}
						className={styles.button}
						onClick={() => setIsModalOpen(true)}
						disabled={isButtonDisabled || !isVideoInterviewPassed}
					>
						<Image alt="chat" src="/icons/AIEffect.svg" width={14} height={10} />
						<Typo color={COLORS.WHITE} size="14px" weight="semibold">
							Получить психологический портрет кандидата
						</Typo>
					</Button>
				</Grid>
			</Block>
		</>
	);
}
