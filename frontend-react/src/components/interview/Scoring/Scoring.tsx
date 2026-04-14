import { useAudio } from '@/hooks/useAudio';
import { selectCandidateInterviewId, setCurrentStep } from '@/store/slices/interviewFlow';
import { useAppDispatch, useAppSelector } from '@/store/store';
import axios from '@/utils/axios';
import { useEffect, useRef } from 'react';
import { AvatarWithBubble } from '../AvatarWithBubble';
import { InterviewSteps } from '@/store/types';

const baseAudioFiles = {
	scoring: '/audio/scoring.mp3',
};

export const Scoring = () => {
	const dispatch = useAppDispatch();
	const candidateInterviewId = useAppSelector(selectCandidateInterviewId);
	const { playAudio } = useAudio({ audioFiles: baseAudioFiles });

	// Флаги готовности: когда аудио доиграло и когда скоринг завершён
	const audioFinishedRef = useRef(false);
	const scoringFinishedRef = useRef(false);

	const tryProceed = () => {
		if (audioFinishedRef.current && scoringFinishedRef.current) {
			dispatch(setCurrentStep(InterviewSteps.END_OF_INTERVIEW));
		}
	};

	function startScoring() {
		axios
			.patch(`/api/candidates/current_interview/${candidateInterviewId}/`, {
				interview_finish: true,
			})
			.then(() => {
				return axios.post('/api/candidates/scoring/', {
					candidate_interview_id: candidateInterviewId,
				});
			})
			.then(() => {
				scoringFinishedRef.current = true;
				tryProceed();
			})
			.catch((error) => {
				console.error('Ошибка при обновлении статуса интервью:', error);
				alert('Ошибка при оценке интервью' + error);
			});
	}

	useEffect(() => {
		startScoring();
		// Дождаться полного окончания аудио и только затем переключать шаг
		playAudio('scoring', () => {
			audioFinishedRef.current = true;
			tryProceed();
		});
	}, []);

	return (
		<AvatarWithBubble
			text={
				<>
					Оцениваем ваши ответы (это может занять до 3-х минут)
					<br />
					Пожалуйста не закрывайте окно пока не закончится оценка
				</>
			}
		/>
	);
};
