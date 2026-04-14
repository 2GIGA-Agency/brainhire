'use client';

// import { ContentSpinner } from '@/components/shared/ContentSpinner';
import { SpeedCard } from '@/components/shared/SpeedCard';
import { useAudio } from '@/hooks/useAudio';
// import { useNetworkSpeed } from '@/hooks/useNetworkSpeed';
import { setCurrentStep } from '@/store/slices/interviewFlow';
// import { useAppDispatch, useAppSelector } from '@/store/store';
import { useAppDispatch } from '@/store/store';
// import Speedtest from '@/utils/speedtest/speedtest';
import { Button, Flex } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { AvatarWithBubble } from '../AvatarWithBubble';
import { InterviewSteps } from '@/store/types';

type PageSteps = 'start' | 'show';

export const baseAudioFiles = {
	check_internet_start: '/audio/check_internet_connection_start.mp3',
	check_internet_good: '/audio/check_internet_connection_good.mp3',
	check_internet_bad: '/audio/check_internet_connection_bad.mp3',
	start_checking: '/audio/start_checking.mp3',
};

export const CheckInternet = () => {
	// const { downloadSpeed, uploadSpeed } = useAppSelector((state) => state.interviewFlow);
	const dispatch = useAppDispatch();
	const [step, setStep] = useState<PageSteps>('start');

	const { playAudio, stopAudio } = useAudio({
		audioFiles: baseAudioFiles,
	});

	const [download, setDownload] = useState<number | null>(null);
	const [upload, setUpload] = useState<number | null>(null);
	const [inProgress, setInProgress] = useState(false);
	// const [error, setError] = useState(null);

	// временно храним «сырые» значения до конца теста
	const lastDownload = useRef(0);
	const lastUpload = useRef(0);

	// const isLoading = downloadSpeed === null && uploadSpeed === null;
	const slowInternet = !inProgress && (Number(download) < 10 || Number(upload) < 10);
	const goodInternet = !inProgress && Number(download) > 10 && Number(upload) > 10;

	const handleStartClick = () => {
		stopAudio();
		playAudio('check_internet_start');
		setDownload(null);
		setUpload(null);
		// setError(null);
		setInProgress(true);
		lastDownload.current = 0;
		lastUpload.current = 0;

		setStep('show');
	};

	useEffect(() => {
		// stopAudio();
		if (!inProgress && goodInternet) playAudio('check_internet_good');

		if (!inProgress && slowInternet) playAudio('check_internet_bad');
	}, [inProgress]);

	useEffect(() => {
		playAudio('start_checking');
		const handler = (e: MessageEvent) => {
			if (e.origin !== window.location.origin) return;
			const { download, upload } = e.data as { download?: number; upload?: number };
			if (
				typeof download === 'number' &&
				!isNaN(download) &&
				typeof upload === 'number' &&
				!isNaN(upload)
			) {
				setDownload(Math.round(download));
				setUpload(Math.round(upload));
				setInProgress(false);
			}
		};
		window.addEventListener('message', handler);
		return () => window.removeEventListener('message', handler);
	}, []);

	const handleShowClick = () => {
		stopAudio();
		if (goodInternet) {
			dispatch(setCurrentStep(InterviewSteps.CHECK_VIDEO));
		} else {
			playAudio('check_internet_start');
			setInProgress(true);
		}
	};

	if (step === 'show') {
		let chatText = '';
		if (inProgress) {
			chatText = 'Измеряю скорость вашего интернет-соединения...';
		} else if (slowInternet) {
			chatText =
				'Кажется, у вас нестабильный интернет. Давайте продолжим собеседование, когда соединение будет лучше. Попробуйте перезагрузить страницу или вернуться позже.';
		} else if (goodInternet) {
			chatText = 'Отлично, можем двигаться дальше!';
		}

		return (
			<>
				<AvatarWithBubble text={chatText} />
				{inProgress && (
					<iframe
						src="/speedtest/hosted.html?Run"
						style={{ width: '100%', height: '300px', border: 'none' }}
					/>
				)}
				{!inProgress && (
					<>
						<Flex justify="center" gap={6} wrap="wrap" py={6}>
							<SpeedCard label="Входящая скорость" speed={String(download)} direction="down" />
							<SpeedCard label="Исходящая скорость" speed={String(upload)} direction="up" />{' '}
						</Flex>
						<Flex justify={'center'}>
							<Button colorPalette={goodInternet ? 'orange' : 'red'} onClick={handleShowClick}>
								{goodInternet && 'Отлично, идем дальше'}
								{slowInternet && 'Проверить соединение'}
							</Button>
						</Flex>
					</>
				)}
			</>
		);
	}

	return (
		<>
			<AvatarWithBubble text="Здравствуйте, давайте проверим вашу скорость Интернета. Нажмите на кнопку ниже:" />
			<Flex justifyContent="center">
				<Button colorPalette="orange" onClick={handleStartClick} mx="auto" mt={5}>
					Начать проверку скорости Интернета
				</Button>
			</Flex>
		</>
	);
};
