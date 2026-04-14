import React from 'react';
import styles from './style.module.scss';
import { Typography } from '@/components/ui-kit';

interface Props {
	speedUpData: ISpeedUpData;
}

interface ISpeedUpData {
	title: string;
	blocks: ISpeedUpBlock[];
}

interface ISpeedUpBlock {
	title: string;
	content: React.ReactNode;
}

export function SpeedUpSection({ speedUpData }: Props) {
	const { title, blocks } = speedUpData;

	return (
		<div className={styles.section}>
			<Typography variant="h2" className={styles.title}>
				{title}
			</Typography>
			<div className={styles.content}>
				{blocks.map((i, idx) => {
					return (
						<div className={styles.block} key={idx}>
							<Typography variant="h3" color="inherit">
								{i.title}
							</Typography>
							<div className={styles.content}>{i.content}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
