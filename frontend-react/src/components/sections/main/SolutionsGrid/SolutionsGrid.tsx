import { Button } from '@/components/ui-kit/Button';
import { Typography } from '@/components/ui-kit/Typography';
import Image from 'next/image';
import styles from './SolutionsGrid.module.scss';

interface SolutionItem {
	id: string;
	title: string;
	description: string;
	image?: string;
	gradient: string;
	isMain: boolean;
	textColor?: string;
}

interface SolutionsGridProps {
	title: string;
	solutionsList: SolutionItem[];
}

export const SolutionsGrid: React.FC<SolutionsGridProps> = ({ title, solutionsList }) => {
	return (
		<section className={styles.solutions} id="solutions">
			<Typography variant="h2" className={styles.heading}>
				{title}
			</Typography>
			<div className={styles.grid}>
				{solutionsList.map((solution) => (
					<div
						id={solution.id}
						key={solution.id}
						className={`${styles.card} ${styles[solution.gradient]} ${
							solution.isMain ? styles.mainCard : styles.smallCard
						}`}
					>
						<div className={styles.content}>
							<Typography
								variant="h3"
								className={styles.title}
								margin="0 0 32px"
								color={solution.textColor ?? 'white'}
							>
								{solution.title}
							</Typography>
							{solution.isMain && solution.image && (
								<div className={styles.image}>
									<Image
										src={solution.image}
										alt={solution.title}
										unoptimized
										priority
										width={550}
										height={328}
									/>
								</div>
							)}
							<Typography
								variant="body-md"
								className={`${styles.description} ${solution.isMain ? styles.mainText : ''}`}
								margin="0 0 32px"
								color={solution.textColor ?? 'white'}
							>
								{solution.description}
							</Typography>
							{solution.isMain && (
								<div className={styles.mainBtn}>
									<Button variant="secondary1" fullWidth as="link" href="/signup">
										Попробовать бесплатно
									</Button>
								</div>
							)}
							{!solution.isMain && (
								<div className={styles.btn}>
									<Button
										variant={solution?.textColor ? 'secondary2' : 'secondary1'}
										as="link"
										href="/signup"
										fullWidth
									>
										Попробовать бесплатно
									</Button>
								</div>
							)}
						</div>
					</div>
				))}
			</div>
		</section>
	);
};
