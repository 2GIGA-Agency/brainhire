import { ContentSpinner } from '@/components/shared/ContentSpinner';
import { ModalVideo } from '@/components/shared/ModalVideo';
import { setCurrentStep } from '@/store/slices/interviewFlow';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { fetchTestingByVacancy, sendCode } from '@/store/thunks';
import { InterviewSteps } from '@/store/types';
import { Button, Checkbox, Flex, Link, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { PERSONAL_DATA_CONSENT_LINK, PRIVACY_POLICY_LINK } from '@/constants/links';

export const StartInterview = () => {
	const [videoPresentationModal, setVideoPresentationModal] = useState(false);

	const [privacyCheck, setPrivacyCheck] = useState(false);
	const [seenPrivacyCheck, setSeenPrivacyCheck] = useState(false);

	const {
		startInterviewData,
		startInterviewStatus,
		videoInterviewQuestions,
		// sendCodeLoading,
		// fetchTestingLoading,
	} = useAppSelector((state) => state.interviewFlow);
	const dispatch = useAppDispatch();
	const isActiveInterviewExists = Boolean(startInterviewData?.vacancy_with_interview?.active_interview);
	const isPdfPresentation = Boolean(startInterviewData?.vacancy_with_interview.pdf);
	const isVideoPresentation = Boolean(startInterviewData?.vacancy_with_interview.video);
	const isVideoPresentationExternal = Boolean(startInterviewData?.vacancy_with_interview.video_url);
	const isGlobalLoading = 
		startInterviewStatus === 'idle' || 
		startInterviewStatus === 'loading'

	useEffect(() => {
		if (startInterviewStatus === 'succeeded' && isActiveInterviewExists) {
			dispatch(fetchTestingByVacancy());
			dispatch(sendCode());
		}
	}, [startInterviewStatus, dispatch, isActiveInterviewExists]);

	const handleClick = () => {
		dispatch(setCurrentStep(InterviewSteps.REQUIREMENTS));
	};

	if (isGlobalLoading) {
		return <ContentSpinner />;
	}

	if (!isActiveInterviewExists) {
		return (
			<Text textStyle="md" mb={6} color="gray.800" pt={6}>
				Интервью по этой вакансии не существует. Свяжитесь с HR-менеджером для получения дополнительной информации.
			</Text>
		);
	}

	return (
		<>
			{isVideoPresentation && (
				<ModalVideo
					isOpen={videoPresentationModal}
					setIsOpen={setVideoPresentationModal}
					url={startInterviewData?.vacancy_with_interview?.video}
					modalTitle={startInterviewData?.company.company_name}
				/>
			)}
			<Text textStyle="md" mb={6} color="gray.800" pt={6}>
				Здравствуйте, BRaiN HR приглашает пройти интервью на вакансию
			</Text>
			<Text textStyle="2xl" mb={6} color="gray.800">
				{startInterviewData?.vacancy_with_interview.vacancy_name}
			</Text>

			<Flex direction="column">
				{isPdfPresentation && (
					<Link
						color="blue.600"
						fontSize={12}
						fontWeight={500}
						href={startInterviewData?.vacancy_with_interview.pdf}
						target="_blank"
						rel="noopener noreferrer"
					>
						Pdf-презентация компании/вакансии
					</Link>
				)}
				{!isVideoPresentation && isVideoPresentationExternal && (
					<Link
						color="blue.600"
						fontSize={12}
						fontWeight={500}
						href={startInterviewData?.vacancy_with_interview?.video_url || '#'}
						target="_blank"
						rel="noopener noreferrer"
						onKeyDown={(e) => {
							if (e.key === ' ') {
								e.preventDefault();
								window.open(startInterviewData?.vacancy_with_interview?.video_url || '', '_blank');
							}
						}}
					>
						Видео-презентация компании/вакансии
					</Link>
				)}
				{isVideoPresentation && (
					<Link
						color="blue.600"
						fontSize={12}
						fontWeight={500}
						onClick={() => setVideoPresentationModal(true)}
						onKeyDown={(e) => {
							if (e.key === ' ') {
								e.preventDefault();
								setVideoPresentationModal(true);
							}
						}}
					>
						Видео-презентация компании/вакансии
					</Link>
				)}
			</Flex>

			<Flex direction="column" mb={6} pt={4}>
				<Flex mb={2}>
					<Image src="/icons/BiBuildings.svg" width={16} height={16} alt="company" />
					<Flex>
						<Text textStyle="sm" color="gray.600" mx={2}>
							Компания:{' '}
						</Text>
						<Text textStyle="sm" color="gray.800">
							{startInterviewData?.company.company_name}
						</Text>
					</Flex>
				</Flex>
				<Flex mb={2}>
					<Image src="/icons/IoEarthOutline.svg" width={16} height={16} alt="company" />
					<Flex>
						<Text textStyle="sm" color="gray.600" mx={2}>
							Язык:{' '}
						</Text>
						<Text textStyle="sm" color="gray.800">
							Русский
						</Text>
					</Flex>
				</Flex>
				<Flex mb={2}>
					<Image src="/icons/CkTime.svg" width={16} height={16} alt="company" />
					<Flex>
						<Text textStyle="sm" color="gray.600" mx={2}>
							Примерное время прохождения:{' '}
						</Text>
						<Text textStyle="sm" color="gray.800">
							{(startInterviewData?.vacancy_with_interview?.active_interview?.time_per_answer || 0) *
								(videoInterviewQuestions?.length || 0)}{' '}
							мин
						</Text>
					</Flex>
				</Flex>
			</Flex>

			<VStack align="flex-start" pt={4}>
				{/* Все 4 чекбокса с динамическими ссылками */}
				<Checkbox.Root
					size="sm"
					variant="solid"
					colorPalette="blue"
					pb={4}
					checked={privacyCheck}
					onCheckedChange={(e) => setPrivacyCheck(!!e.checked)}
					cursor={'pointer'}
				>
					<Checkbox.HiddenInput />
					<Checkbox.Control />
					<Checkbox.Label fontSize={12}>
						Я ознакомлен с{' '}
						<Link
							href={PRIVACY_POLICY_LINK}
							target="_blank"
							rel="noopener noreferrer"
							color="blue.600"
							textDecoration="underline"
							onKeyDown={(e) => {
								if (e.key === ' ') {
									e.preventDefault();
									window.open(PRIVACY_POLICY_LINK, '_blank');
								}
							}}
						>
							политикой обработки персональных данных
						</Link>
					</Checkbox.Label>
				</Checkbox.Root>

				<Checkbox.Root
					size="sm"
					variant="solid"
					colorPalette="blue"
					pb={4}
					checked={seenPrivacyCheck}
					onCheckedChange={(e) => setSeenPrivacyCheck(!!e.checked)}
					cursor={'pointer'}
				>
					<Checkbox.HiddenInput />
					<Checkbox.Control />
					<Checkbox.Label fontSize={12}>
						Я согласен на{' '}
						<Link
							href={PERSONAL_DATA_CONSENT_LINK}
							target="_blank"
							rel="noopener noreferrer"
							color="blue.600"
							textDecoration="underline"
							onKeyDown={(e) => {
								if (e.key === ' ') {
									e.preventDefault();
									window.open(PERSONAL_DATA_CONSENT_LINK, '_blank');
								}
							}}
						>
							обработку персональных данных
						</Link>
					</Checkbox.Label>
				</Checkbox.Root>

				<Button
					colorPalette="orange"
					size="md"
					mx="auto"
					mt={6}
					disabled={!(privacyCheck && seenPrivacyCheck)}
					onClick={() => handleClick()}
				>
					Продолжить
				</Button>
			</VStack>
		</>
	);
};
