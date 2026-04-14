import { useAudio } from '@/hooks/useAudio';
import { useEffect } from 'react';
import { AvatarWithBubble } from '../AvatarWithBubble';

const baseAudioFiles = {
	end: '/audio/end.mp3',
};

export const EndOfInterview = () => {
	const { playAudio } = useAudio({ audioFiles: baseAudioFiles });

	useEffect(() => {
		playAudio('end');
	}, []);

	return (
		<AvatarWithBubble
			text={
				<>
					Спасибо за прохождение интервью!
					<br />
					Ваши ответы успешно записаны. Следующий этап будет зависеть от результатов анализа. Если
					потребуется дополнительная информация, мы уведомим вас.
					<br />
					Спасибо за участие и интерес к нашей компании!
					<br />
					Вы можете закрыть эту страницу.
				</>
			}
		/>
	);
};
