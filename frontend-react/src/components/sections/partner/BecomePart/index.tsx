import { Button } from '@/components/ui-kit';
import { Typography } from '@/components/ui-kit/Typography';
import Image from 'next/image';
import React from 'react';
import styles from './Become.module.scss';

interface Props {
	text: string;
	isReferral: boolean;
	buttonText: string;
}

export const BecomePart = ({ text, buttonText, isReferral }: Props) => {
	const href = `https://brain-referral.ru/${isReferral ? 'partner-' : ''}signup`;

	return (
		<section className={styles.become}>
			<div className={styles.text}>
				<Typography variant="h1" className={styles.title}>
					{text}
				</Typography>
				<Typography variant="body-lg" className={styles.subtitle} margin="0 0 25px">
					Подключайте клиентов к BRaiN HR и получайте денежные вознаграждения, исходя из их
					активности и объёмов покупок
				</Typography>
				<Button href={href} size="L" as="link">
					{buttonText}
				</Button>
			</div>
			<Image
				src="/images/hr_partner2.svg"
				alt="HR Partner"
				className={styles.hrImg}
				width={650}
				height={489}
			/>
		</section>
	);
};
