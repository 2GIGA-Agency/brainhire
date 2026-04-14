import { CandidateAntiFrod } from '@/components/sections/lk/candidateOverview/CandidateAntiFrod';
import { CandidateOverview } from '@/app/(lk)/vacancy/[id]/[candidateId]/types/types';
import { InterviewAnswer } from '@/components/shared/InterviewAnswer/InterviewAnswer';
import { ScoringItem } from '@/components/shared/ScoringItem';
import { Typo } from '@/components/shared/Typo/Typo';
import { COLORS } from '@/constants/colors';
import { Flex } from '@chakra-ui/react';
import { memo, useState } from 'react';
import { useParams } from 'next/navigation';

interface VideoInterviewAnswersProps {
	candidateData: CandidateOverview;
	isExternal?: boolean;
}

export const VideoInterviewAnswers = memo(function VideInterviewAnswers({
	candidateData,
	isExternal = false,
}: VideoInterviewAnswersProps) {
	const params = useParams();
	const candidateId = params.candidateId as string;

	const candidateInterview = candidateData.candidate_interview;

	if (!candidateInterview) {
		return (
			<Typo color={COLORS.GRAY_800} textAlign="center" py={6}>
				Видеоинтервью ещё не проведено для этого кандидата.
			</Typo>
		);
	}

	const {
		answers,
		answers_rating,
		average_answers_rating = null,
	} = candidateInterview;
	const { questions } = candidateData;

	const [answerIdxPlaying, setAnswerIdxPlaying] = useState(-1);

	const handleChangePlay = (idx: number) => {
		setAnswerIdxPlaying(idx);
	};
	const numAvgRating = Number(average_answers_rating);

	// Создаем массивы вопросов и ответов, гарантируя соответствие по номерам
	const questionEntries = Object.entries(questions)
		.map(([key, value]) => ({
			id: key,
			question: value.question,
			number: parseInt(key.replace('question_', '')),
		}))
		.sort((a, b) => a.number - b.number);

	const answerEntries = Object.entries(answers)
		.map(([key, value]) => ({
			id: key,
			...value,
			number: parseInt(key.replace('answer_', '')),
		}))
		.sort((a, b) => a.number - b.number);

	const ratingEntries = Object.entries(answers_rating)
		.map(([key, value]) => {
			return {
				id: key,
				...value,
				number: parseInt(key.replace('answer_', '')),
			};
		})
		.sort((a, b) => a.score - b.score);

	// Сопоставляем вопросы с ответами и оценками по номерам
	const matchedItems = questionEntries.map((question) => {
		const answer = answerEntries.find((a) => a.number === question.number);
		const rating = ratingEntries.find((r) => r.number === question.number);

		return {
			question: question.question,
			answer: answer?.text || '',
			videoUrl: answer?.file_url || '',
			score: rating?.score || 0,
			answerId: answer?.id || '',
			isAnswerExists: !!answer,
		};
	});

	return (
		<>
			{!isExternal && <CandidateAntiFrod candidateId={candidateId} mb={6} />}
			{!isExternal && <ScoringItem text="Оценка видеоинтервью" score={numAvgRating} />}
			<Flex direction="column" gap="24px">
				{matchedItems.map((item, idx) => {
					if (!item.isAnswerExists) return null; // Пропускаем если нет ответа

					return (
						<InterviewAnswer
							isVideoPlaying={idx === answerIdxPlaying}
							onPlayClick={() => handleChangePlay(idx)}
							key={item.answerId}
							question={item.question}
							score={item.score}
							answer={item.answer}
							videoUrl={item.videoUrl}
						/>
					);
				})}
			</Flex>
		</>
	);
}, arePropsEqual);

function arePropsEqual(oldProps: VideoInterviewAnswersProps, newProps: VideoInterviewAnswersProps) {
	return (
		oldProps.candidateData.id === newProps.candidateData.id &&
		oldProps.isExternal === newProps.isExternal
	);
}
