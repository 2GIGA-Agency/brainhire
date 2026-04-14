import { Button } from '@/components/ui-kit/Button';
import { Checkbox } from '@/components/ui-kit/Checkbox';
import { Input } from '@/components/ui-kit/Input';
import { Typography } from '@/components/ui-kit/Typography';
import React, { useState } from 'react';
import styles from './SubscribeCard.module.scss';

export const SubscribeCard: React.FC = () => {
	const [email, setEmail] = useState('');
	const [agreed, setAgreed] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (agreed && email) {
			console.log('Subscribed with:', email);
		}
	};

	return (
		<div className={styles.subscribeCard}>
			<Typography variant="h3" className={styles.title}>
				Подпишитесь на нашу рассылку
			</Typography>
			<Typography variant="body-md" className={styles.description}>
				Еженедельно рассылаем обновления, полезные статьи и актуальные материалы в сфере HR
			</Typography>

			<form className={styles.form} onSubmit={handleSubmit}>
				<Input
					placeholder="Ваша почта"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className={styles.input}
				/>
				<Checkbox variant="white" checked={agreed} onChange={() => setAgreed(!agreed)}>
					Я даю согласие на обработку своих персональных данных
				</Checkbox>
				<Button variant="secondary1" fullWidth disabled={!agreed || !email}>
					Получать полезный контент
				</Button>
			</form>
		</div>
	);
};
