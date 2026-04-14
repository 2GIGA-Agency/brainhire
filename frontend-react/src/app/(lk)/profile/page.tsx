'use client';

import { ContentSpinner } from '@/components/shared/ContentSpinner';
import { useGetProfileQuery } from '@/store/rtkQuery/api';
import axios from '@/utils/axios';
import { Box, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { HiPencil } from 'react-icons/hi';
import styles from './Profile.module.scss';
import { useRouter } from 'next/navigation';
import { Typo } from '@/components/shared/Typo/Typo';
import { COLORS } from '@/constants/colors';
import { toaster } from '@/components/ui/toaster';

// Импортируем все наши новые компоненты-блоки
import { ProfileDataForm } from './components/ProfileDataForm';
import { ProfilePhotoEditor } from './components/ProfilePhotoEditor';
import { IntegrationsBlock } from './components/IntegrationBlock';
import { PasswordChangeBlock } from './components/PasswordChangeBlock';
import { RejectSettingsBlock } from './components/RejectSettings';

const Profile: React.FC = () => {
	const { data: profile, isLoading, refetch } = useGetProfileQuery();
	const router = useRouter();

	// Состояние для модального окна смены фото
	const [isPhotoEditorOpen, setIsPhotoEditorOpen] = useState(false);

	useEffect(() => {
		// Логика обработки callback'ов от OAuth сервисов
		const searchParams = new URLSearchParams(window.location.search);
		const code = searchParams.get('code');
		const code_avito = searchParams.get('code_avito');

		if (!profile || (!code && !code_avito)) {
			return;
		}

		const sendCode = async () => {
			try {
				if (
					code &&
					(profile?.hh_status === false ||
						(profile.hh_status === true && profile.hh_burned_token === true))
				) {
					await axios.post('/api/hh/code/', {
						code,
						host: window.location.origin,
					});
				} else if (code_avito && profile?.email && profile.avito_status === false) {
					await axios.post(`/api/avito/authorize/`, {
						code: code_avito,
						email: profile.email,
					});
				}
				await refetch();
				router.replace('/profile');
			} catch (error) {
				console.error('Ошибка при отправке кода:', error);
				toaster.create({ title: 'Ошибка при интеграции', description: 'Попробуйте позже' });
			}
		};

		sendCode();
	}, [profile, refetch, router]);

	if (isLoading) {
		return <ContentSpinner />;
	}

	// Колбэк для дочернего компонента ProfilePhotoEditor
	const handlePhotoUploadSuccess = () => {
		setIsPhotoEditorOpen(false); // Закрываем модальное окно
		refetch(); // Обновляем данные профиля
	};

	// Колбэк для дочернего компонента ProfileDataForm
	const handleProfileSaveSuccess = () => {
		refetch(); // Обновляем данные для синхронизации
	};

	const defaultPhotoUrl = '/images/default_user.avif';

	return (
		<>
			<ProfilePhotoEditor
				isOpen={isPhotoEditorOpen}
				onClose={() => setIsPhotoEditorOpen(false)}
				onPhotoUploaded={handlePhotoUploadSuccess}
				currentPhotoUrl={profile?.photo_url || defaultPhotoUrl}
			/>

			<Box className={styles.gradient} />
			<Flex className={styles.userInfo}>
				<Box position="relative">
					<Image
						className={styles.avatar}
						src={profile?.photo_url || defaultPhotoUrl}
						alt="User Profile"
						width={120}
						height={120}
						unoptimized={true}
					/>
					<Box className={styles.editIcon}>
						<HiPencil color="white" cursor="pointer" onClick={() => setIsPhotoEditorOpen(true)} />
					</Box>
				</Box>
				<Box color={COLORS.GRAY_800} className={styles.userData}>
					<Typo weight="medium" size="24px">
						{`${profile?.last_name} ${profile?.first_name} ${profile?.middle_name || ''}`}
					</Typo>
					<Typo size="16px" color={COLORS.GRAY_500}>
						{profile?.professional_role}
					</Typo>
				</Box>
			</Flex>

			<div className={styles.profileBlocks}>
				<div>
					{profile && (
						<ProfileDataForm initialData={profile} onSaveSuccess={handleProfileSaveSuccess} />
					)}
				</div>
				<div className={styles.integrations}>
					<IntegrationsBlock
						isHhAuthorized={!!profile?.hh_status}
						isHhTokenBurned={!!(profile?.hh_status && profile?.hh_burned_token)}
						isAvitoAuthorized={!!profile?.avito_status}
					/>
				</div>
				<div className={styles.rejectSettings}>
					<RejectSettingsBlock />
				</div>
				<div>
					<PasswordChangeBlock onPasswordChanged={refetch} />
				</div>
			</div>
		</>
	);
};

export default Profile;
