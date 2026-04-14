import React from 'react';
import styles from './style.module.scss';
import { Typography } from '@/components/ui-kit';
import { testimonialsData } from './constants';


const Testimonials = () => {
	return (
		<section className={styles.testimonialsSection}>
			<div className={styles.container}>
				<Typography variant="h1">Отзывы клиентов</Typography>
				<Typography variant="body-lg" color="text-secondary" className={styles.subtitle}>
					Компаниям удалось снизить расходы на 78%, ускорить найм в 5 раз и повысить качество
					кандидатов.
				</Typography>

				<div className={styles.grid}>
					{testimonialsData.map((testimonial) => (
						<div key={testimonial.id} className={styles.card}>
							<div className={styles.cardHeader}>
								<div className={styles.authorInfo}>
									<Typography variant="body-md" color="text-primary">
										{testimonial.name}
									</Typography>
									<Typography variant="body-sm" color="text-secondary">
										{testimonial.role}
										{testimonial.company && `, ${testimonial.company}`}
									</Typography>
								</div>
							</div>

							<Typography variant="body-text" color="grey-800" className={styles.cardText}>
								{testimonial.text}
							</Typography>

							<div className={styles.cardResult}>
								<Typography as="span" variant="caption" color="brand-primary-light">
									{testimonial.result}
								</Typography>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Testimonials;
