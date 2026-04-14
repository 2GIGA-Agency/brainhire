import { Skeleton } from '@chakra-ui/react';
import styles from './style.module.scss'; // если нужны стили

interface CandidateButtonSkeletonProps {
	isMobile?: boolean;
}

export const CandidateButtonSkeleton = ({ isMobile = false }: CandidateButtonSkeletonProps) => {
	return (
		<div className={styles.skeletonWrapper}>
			{isMobile ? (
				// Мобильная версия - только иконка
				<Skeleton width="24px" height="24px" borderRadius="6px" className={styles.mobileSkeleton} />
			) : (
				// Десктопная версия - кнопка с текстом
				<Skeleton
					width="160px"
					height="36px"
					borderRadius="6px"
					className={styles.desktopSkeleton}
				/>
			)}
		</div>
	);
};
