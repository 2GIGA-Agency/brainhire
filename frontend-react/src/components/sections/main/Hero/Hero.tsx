'use client';
import { Button } from '@/components/ui-kit/Button';
import { Typography } from '@/components/ui-kit/Typography';
import Image from 'next/image';
import { FC } from 'react';
import styles from './Hero.module.scss';
// Import Swiper React components
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Autoplay, Navigation } from 'swiper/modules';

interface HeroProps {
	heading: string;
	subheading: string;
	firstButtonText: string;
	secondButtonText: string;
}

export const Hero: FC<HeroProps> = ({ firstButtonText, secondButtonText, heading, subheading }) => {
	return (
		<section className={styles.hero}>
			<div className={styles.container}>
				<Typography variant="h1" margin="0 0 16px">
					{heading}
				</Typography>
				<Typography variant="body-md" className={styles.subheading}>
					{subheading}
				</Typography>
				<div className={styles.heroButtons}>
					<Button variant="primary" as="link" href="/signup">
						{firstButtonText}
					</Button>
					<Button variant="primary" as="link" href="#solutionForm">
						{secondButtonText}
					</Button>
				</div>
				<div className={styles.imageContainer}>
					<Swiper
						centeredSlides={true}
						modules={[Navigation, Autoplay]}
						spaceBetween={20}
						scrollbar={{ draggable: true }}
						navigation
						className={styles.swapperContainer}
						loop
						breakpoints={{
							640: {
								slidesPerView: 1,
							},
							768: {
								slidesPerView: 2,
							},
							1024: {
								slidesPerView: 3,
							},
						}}
						autoplay={{
							delay: 3000,
							disableOnInteraction: false,
						}}
						speed={600}
					>
						<SwiperSlide>
							<div className={styles.imgWrapper}>
								<Image
									src="/images/land3_mini.avif"
									alt=""
									width={549}
									height={366}
									priority
									className={styles.poster}
								/>
							</div>
						</SwiperSlide>
						<SwiperSlide>
							<div className={styles.imgWrapper}>
								<Image
									src="/images/land1_mini.avif"
									alt=""
									width={549}
									height={366}
									priority
									className={styles.poster}
								/>
							</div>
						</SwiperSlide>{' '}
						<SwiperSlide>
							<div className={styles.imgWrapper}>
								<Image
									src="/images/land2_5_mini.avif"
									alt=""
									width={549}
									height={366}
									priority
									className={styles.poster}
								/>
							</div>
						</SwiperSlide>{' '}
						<SwiperSlide>
							<div className={styles.imgWrapper}>
								<Image
									src="/images/land4_mini.avif"
									alt=""
									width={549}
									height={366}
									className={styles.poster}
								/>
							</div>
						</SwiperSlide>
						<SwiperSlide>
							<div className={styles.imgWrapper}>
								<Image
									src="/images/land5_mini.avif"
									alt=""
									width={549}
									height={366}
									className={styles.poster}
								/>
							</div>
						</SwiperSlide>
						<SwiperSlide>
							<div className={styles.imgWrapper}>
								<Image
									src="/images/land7_3_mini.avif"
									alt=""
									width={549}
									height={366}
									className={styles.poster}
								/>
							</div>
						</SwiperSlide>
						<SwiperSlide>
							<div className={styles.imgWrapper}>
								<Image
									src="/images/land4_mini.avif"
									alt=""
									width={549}
									height={366}
									className={styles.poster}
								/>
							</div>
						</SwiperSlide>
					</Swiper>
				</div>
			</div>
		</section>
	);
};
