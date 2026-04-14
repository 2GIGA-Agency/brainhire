import { setCurrentStep } from '@/store/slices/interviewFlow';
import { useAppDispatch } from '@/store/store';
import { fetchTestAttemptsByCandidate } from '@/store/thunks';
import { fetchVideoInterviewAttempt } from '@/store/thunks/interviewFlow/videoInterview/fetchVideoInterviewAttemptThunk';
import { InterviewSteps } from '@/store/types';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useEffect } from 'react';

// тип карточки
interface Card {
	image: string[]; // массив путей или имён иконок
	text: string; // текст внизу карточки
}

// данные для пяти карточек
const cards: Card[] = [
	{
		image: ['/icons/BsWindow.svg'],
		text: 'Вы используете последнюю версию браузера Chrome, Edge, Яндекс, Opera, Safari, Atlas',
	},
	{
		image: ['/icons/FiHeadphones.svg'],
		text: 'Ваши колонки или наушники включены и работают',
	},
	{
		image: ['/icons/HiOutlineMicrophone.svg', '/icons/MdOutlineCameraAlt.svg'],
		text: 'Ваш микрофон и камера включены и работают',
	},
	{
		image: ['/icons/BsGlobe2.svg'],
		text: 'Ваше соединение с Интернетом стабильно, а VPN выключен',
	},
	{
		image: ['/icons/BsBellSlash.svg'],
		text: 'Вы в тихом помещении и готовы сконцентрироваться на собеседовании',
	},
];

const InfoCard: React.FC<Card> = ({ image, text }) => {
	return (
		<Box w="166px" p="24px 12px" border="1px solid" borderColor="gray.200" borderRadius="md">
			<Flex justify="center" align="center" mb={4} gap={2}>
				{image.map((src) => (
					<Image key={src} src={src} alt="icon" width={32} height={32} />
				))}
			</Flex>
			<Text fontSize="xs" textAlign="start">
				{text}
			</Text>
		</Box>
	);
};

export const Requirements = () => {
	const dispatch = useAppDispatch();

	const handleClick = () => {
		dispatch(setCurrentStep(InterviewSteps.CHECK_INTERNET_CONNECTION));
	};

	useEffect(() => {
		dispatch(fetchVideoInterviewAttempt());
		dispatch(fetchTestAttemptsByCandidate());
	}, []);

	return (
		<Flex direction="column" align="center" px={4} py={6} gap={6}>
			<Text fontSize="md" fontWeight="semibold" alignSelf="start">
				Перед стартом убедитесь, что:
			</Text>

			<Flex wrap="wrap" justify="center" gap={4}>
				{cards.map((card, idx) => (
					<InfoCard key={idx} {...card} />
				))}
			</Flex>

			<Button colorPalette="orange" size="lg" mt={55} onClick={handleClick}>
				Начать интервью
			</Button>
		</Flex>
	);
};
