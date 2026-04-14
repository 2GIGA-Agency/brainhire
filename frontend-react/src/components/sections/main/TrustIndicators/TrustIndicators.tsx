import React from 'react';
import { Card } from '@/components/ui-kit/Card';
import { Typography } from '@/components/ui-kit/Typography';
import styles from './TrustIndicators.module.scss';

interface TrustItem {
	title: string;
	description: string;
	backgroundColor: string;
	icon: string;
}

interface TrustIndicatorsProps {
	title?: string;
	indicatorsData: TrustItem[];
}

export const TrustIndicators: React.FC<TrustIndicatorsProps> = ({ title, indicatorsData }) => {
	return (
		<section className={styles.trust}>
			{title && (
				<Typography variant="h2" className={styles.heading}>
					{title}
				</Typography>
			)}

			<div className={styles.grid}>
				{indicatorsData.map((item, index) => (
					<Card
						key={index}
						title={item.title}
						description={item.description}
						backgroundColor={item.backgroundColor}
						variant="highlighted"
						number={index < 9 ? `0${index + 1}` : `${index + 1}`}
						icon={item.icon}
					/>
				))}
			</div>
		</section>
	);
};
