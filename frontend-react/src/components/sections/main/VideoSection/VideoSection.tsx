import { Typography, VideoPlayer } from '@/components/ui-kit';
import styles from './VideoSection.module.scss';
import { LANDING_VIDEO_LINK } from '@/constants/links';

export const VideoSection = () => {
	return (
		<section className={styles.video}>
			<Typography variant="h2">
				Как BRaiN HR помогает бизнесу получать лучших кандидатов на рынке?
			</Typography>
			<VideoPlayer url={LANDING_VIDEO_LINK} />
		</section>
	);
};
