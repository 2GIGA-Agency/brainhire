import { Skeleton } from '@chakra-ui/react';
import styles from './style.module.scss'; // если нужны стили

export const CandidateInfoSkeleton = () => {
	return (
		<div className={styles.skeletonContainer}>
			<Skeleton width="150px" height="20px" borderRadius="4px" marginBottom="4px" />
			<Skeleton width="200px" height="16px" borderRadius="4px" />
		</div>
	);
};
