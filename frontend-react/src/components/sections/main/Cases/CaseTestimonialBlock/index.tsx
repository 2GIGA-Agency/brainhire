// src/components/CaseTestimonialBlock/CaseTestimonialBlock.tsx

import React from 'react';
import styles from './style.module.scss';
import { Testimonial } from '../types';
import { Typography } from '@/components/ui-kit';
import { FaQuoteRight } from 'react-icons/fa';

const BackgroundCircle = ({ className }: { className?: string }) => (
	<svg
		className={className}
		width="400"
		height="400"
		viewBox="0 0 400 400"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle cx="200" cy="200" r="200" />
	</svg>
);

const BackgroundLightning = ({ className }: { className?: string }) => (
	<svg
		className={className}
		width="200"
		height="200"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#E6F4FF" />
	</svg>
);

// --- Основной компонент ---

interface CaseTestimonialBlockProps {
	testimonial: Testimonial;
}

export const CaseTestimonialBlock: React.FC<CaseTestimonialBlockProps> = ({ testimonial }) => {
	return (
		<section className={styles.wrapper}>
			<BackgroundCircle className={styles.backgroundCircle} />
			<BackgroundLightning className={styles.backgroundLightning} />

			<div className={styles.container}>
				<Typography as="h2" variant="h2" color="white" className={styles.title}>
					Отзыв клиента
				</Typography>

				<div className={styles.testimonialCard}>
					<div className={styles.quoteSection}>
						<Typography variant="body-lg" className={styles.quoteText}>
							“{testimonial.quote}”
						</Typography>
					</div>
					<hr className={styles.divider} />
					<div className={styles.authorSection}>
						<div className={styles.quoteIcon}>
							<FaQuoteRight color="white" size={28} />
						</div>
						<div className={styles.authorInfo}>
							<Typography variant="body-lg" className={styles.authorName}>
								{testimonial.authorName}
							</Typography>
							<Typography variant="body-md" color="text-secondary" className={styles.authorTitle}>
								{testimonial.authorTitle}
							</Typography>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
