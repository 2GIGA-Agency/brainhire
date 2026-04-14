import { Typo } from '@/components/shared/Typo/Typo';
import styles from './Footer.module.scss';
import { COLORS } from '@/constants/colors';

export const Footer = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<Typo color={COLORS.GRAY_400} fontWeight="medium">
					2025 © Brain.
				</Typo>
			</div>
		</div>
	);
};
