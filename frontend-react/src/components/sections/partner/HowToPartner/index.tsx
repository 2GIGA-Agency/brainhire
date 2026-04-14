import { Container, Typography } from '@/components/ui-kit';
import Image from 'next/image';
import styles from './HowToPartner.module.scss';

interface Props {
	reduced?: boolean;
}

export const HowToBecomePartner = ({ reduced = false }: Props) => {
	return (
		<section className={styles.howTo}>
			<Container>
				<Typography variant="h2" className={styles.title}>
					Как стать партнером?
				</Typography>
				<div className={styles.steps}>
					{/* Шаг 1 - всегда одинаковый */}
					<div className={styles.step}>
						<div className={styles.stepLine}>
							<div className={styles.linePlaceholder} />
							<Typography variant="h3" color="brand-primary" className={styles.circle}>
								1
							</Typography>
							<div className={styles.dotLine}></div>
						</div>
						<div className={styles.stepText}>
							<Typography variant="h4" className={styles.stepTitle}>
								Регистрация
							</Typography>
							<Typography variant="body-md">Зарегистрируйтесь на brainhire.ru</Typography>
						</div>
					</div>

					{/* Шаг 2 - меняется в зависимости от reduced */}
					<div className={styles.step}>
						<div className={styles.stepLine}>
							<div className={styles.dotLine}></div>
							<Typography variant="h3" color="brand-primary" className={styles.circle}>
								2
							</Typography>
							<div className={styles.dotLine}></div>
						</div>
						<div className={styles.stepText}>
							<Typography variant="h4" className={styles.stepTitle}>
								{reduced ? 'Подключение' : 'Подписание договора'}
							</Typography>
							<Typography variant="body-md">
								{reduced ? 'Передайте ссылку клиентам' : 'Подпишите договор о сотрудничестве'}
							</Typography>
						</div>
					</div>

					{/* Шаг 3 - показываем только если НЕ reduced */}
					{!reduced && (
						<div className={styles.step}>
							<div className={styles.stepLine}>
								<div className={styles.dotLine}></div>
								<Typography variant="h3" color="brand-primary" className={styles.circle}>
									3
								</Typography>
								<div className={styles.dotLine}></div>
							</div>
							<div className={styles.stepText}>
								<Typography variant="h4" className={styles.stepTitle}>
									Подключение
								</Typography>
								<Typography variant="body-md">Передайте ссылку клиентам</Typography>
							</div>
						</div>
					)}

					{/* Шаг 4 (или 3 при reduced) - Вознаграждение */}
					<div className={styles.step}>
						<div className={styles.stepLine}>
							<div className={styles.dotLine}></div>
							<Typography variant="h3" color="brand-primary" className={styles.circle}>
								{reduced ? 3 : 4}
							</Typography>
							<div className={styles.linePlaceholder} />
						</div>
						<div className={styles.stepText}>
							<Typography variant="h4" className={styles.stepTitle}>
								Вознаграждение
							</Typography>
							<Typography variant="body-md">Начните получать выплаты</Typography>
						</div>
					</div>

					<Image
						src="/icons/lighting.svg"
						alt="Lightning"
						height={200}
						width={69}
						className={styles.img}
					/>
				</div>
			</Container>
		</section>
	);
};
