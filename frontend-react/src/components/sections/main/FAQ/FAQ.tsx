'use client';

import React from 'react';
// import Image from 'next/image';
import { Accordion } from '@/components/ui-kit/Accordion';
// import { Button } from '@/components/ui-kit/Button';
import { Typography } from '@/components/ui-kit/Typography';
import styles from './FAQ.module.scss';

interface FAQItem {
	question: string;
	answer: string;
}

interface FAQProps {
	items: FAQItem[];
}

export const FAQ: React.FC<FAQProps> = ({ items }) => {
	return (
		<section className={styles.faq} id="questions">
			<Typography variant="h2" className={styles.title}>
				Ответы на часто задаваемые вопросы
			</Typography>

			<div className={styles.faqList}>
				{items.map((item, index) => (
					<Accordion key={index} title={item.question}>
						<Typography variant="body-text" color="text-secondary">
							{item.answer}
						</Typography>
					</Accordion>
				))}
			</div>
			{/*
      <div className={styles.contactBlock}>
        <div className={styles.contactImg}>
          <Image src="/images/group.png" alt="group" width={120} height={56} />
        </div>
        <Typography variant="h5">Остались вопросы?</Typography>
        <Typography variant="body-text" color="text-secondary">
          Не можете найти ответ? Пожалуйста, свяжитесь с нашей дружелюбной командой.
        </Typography>
        <Button variant="primary">Задать вопрос</Button>
      </div> */}
		</section>
	);
};
