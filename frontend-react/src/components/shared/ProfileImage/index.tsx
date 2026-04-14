import { useGetProfileQuery } from '@/store/rtkQuery/api';
import Image from 'next/image';
import { BaseSpinner } from '../BaseSpinner/BaseSpinner';
import styles from './styles.module.scss';

export function ProfileImage() {
	const { data: profile, isLoading } = useGetProfileQuery();

	return (
		<>
			{isLoading ? (
				<BaseSpinner />
			) : (
				<Image
					className={styles.avatar}
					src={profile?.photo_url ? profile.photo_url : '/images/default_user.avif'}
					alt="User Profile"
					width={32}
					height={32}
					unoptimized={true}
				/>
			)}
		</>
	);
}
