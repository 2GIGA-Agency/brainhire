import { Typography } from '@/components/ui-kit';
import styles from './achievements.module.scss';

interface Props {
	text: string;
	external: boolean;
	link: string;
	image: string | undefined;
}

export const ContentCard: React.FC<Props> = ({ link, external, text, image }) => {
	return (
		<a href={link} target="_blank" rel="noopener noreferrer">
			<div className={styles.card}>
				<Typography variant="h3" color="brand-primary">
					{text}
				</Typography>
				{Boolean(image) && <img src={image} alt={text} className={styles.logo} />}
			</div>
		</a>
	);
};
