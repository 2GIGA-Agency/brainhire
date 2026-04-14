import { Block } from '@/components/shared/Block';
import { InfoBlock } from '@/components/ui-kit/InfoBlock';
import { Button, Grid } from '@chakra-ui/react';
import Image from 'next/image';
import { useState } from 'react';
import { RealtimeDemo } from './RealtimeDemo';
import { RealtimeModal } from './RealtimeModal';
import styles from './styles.module.scss';
import { COLORS } from '@/constants/colors';
import { Typo } from '@/components/shared/Typo/Typo';

interface Props {
	candidateId: string;
	isVideoInterviewPassed?: boolean;
}

export function OrderRealtime({ candidateId, isVideoInterviewPassed = true }: Props) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);

	const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

	const handleIsOpen = (isOpen: boolean, isResponseSend?: boolean) => {
		setIsModalOpen(isOpen);
		if (isResponseSend) {
			setIsButtonDisabled(true);
		}
	};

	return (
		<>
			<RealtimeModal isOpen={isModalOpen} setIsOpen={handleIsOpen} candidateId={candidateId} />
			<RealtimeDemo isOpen={isDemoModalOpen} setIsOpen={setIsDemoModalOpen} />
			<Block
				headingText="Real-time avatar"
				subHeadingText="Второй раунд интервью с ИИ"
				tooltip="Что такое Real-time интервью?"
				tooltipClickHandler={() => setIsDemoModalOpen(true)}
				minH={'420px'}
			>
				<Grid h="100%" gridTemplateRows={'auto 1fr'}>
					<InfoBlock headingText="Пояснение" h={'auto'}>
						С помощью real-time avatar вы получите ИИ, который будет генерировать вопросы, на основе
						ответов кандидата, создавая живое взаимодействие. Стоимость интервью с 1 кандидатом - 3
						000 токенов.
					</InfoBlock>
					{/* Не сделал LkButton, т.к. есть проблемы с модульными стилями */}
					<Button
						size="sm"
						bg={COLORS.BLUE_400}
						_hover={{ bg: COLORS.BLUE_500 }}
						onClick={() => setIsModalOpen(true)}
						disabled={isButtonDisabled || !isVideoInterviewPassed}
						className={styles.button}
					>
						<Image alt="chat" src="/icons/AIEffect.svg" width={14} height={10} />
						<Typo color={COLORS.WHITE} fontSize="14px" weight="semibold">
							Позвать кандидата на real-time интервью
						</Typo>
					</Button>
				</Grid>
			</Block>
		</>
	);
}
