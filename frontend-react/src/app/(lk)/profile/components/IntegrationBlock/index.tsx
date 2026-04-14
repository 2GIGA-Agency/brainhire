// components/Profile/components/IntegrationsBlock/IntegrationsBlock.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Block } from '@/components/shared/Block';
import { Typo } from '@/components/shared/Typo/Typo';
import { Tip } from '@/components/shared/Tip';
import { IntergrityItem } from '@/components/shared/IntegrityItem/IntegrityItem';
import { COLORS } from '@/constants/colors';
import styles from './style.module.scss';
import { useAppSelector } from '@/store/store';
import { selectIsTipsShow } from '@/store/slices/appSlice';

interface IntegrationsBlockProps {
	isHhAuthorized: boolean;
	isHhTokenBurned: boolean;
	isAvitoAuthorized: boolean;
}

export const IntegrationsBlock: React.FC<IntegrationsBlockProps> = ({
	isHhAuthorized,
	isHhTokenBurned,
	isAvitoAuthorized,
}) => {
	const isTipsShow = useAppSelector(selectIsTipsShow);

	const [shouldShowItems, setShouldShowItems] = useState(false);
	// Состояния для блока интеграций
	const [hhIntegrityLink, setHhIntegrityLink] = useState('');
	const [avitoIntegrityLink, setAvitoIntegrityLink] = useState('');

	useEffect(() => {
		if (typeof window === 'undefined') return; // Защита от SSR

		// Логика для отображения Avito в зависимости от хоста
		const hostname = window.location.hostname;
		setShouldShowItems(hostname.includes('localhost') || hostname.includes('brainhire.tech'));

		// Формирование ссылок для OAuth
		setHhIntegrityLink(
			`https://hh.ru/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_HH_CLIENT_ID}&state=${window.location.host}`
		);
		setAvitoIntegrityLink(
			`https://avito.ru/oauth?response_type=code&client_id=${process.env.NEXT_PUBLIC_AVITO_CLIENT_ID}&state=avito.${window.location.host}&scope=job:cv,job:applications,job:vacancy,job:write,messenger:read,messenger:write,user:read,user_balance:read,user_operations:read`
		);
	}, []);

	return (
		<Block
			heading={
				<Flex alignItems="center" gap={2}>
					<Typo size="16px" weight="medium">
						Интеграции
					</Typo>
					{isTipsShow && (
						<Tip
							placement="right"
							content={
								<>
									<Typo color={COLORS.GRAY_800} weight="medium">
										Для публикации вакансий на HH.ru необходимо авторизовать ваш аккаунт – нажмите
										кнопку «Подключить», заполните все необходимые поля на внешнем сервисе.
									</Typo>
									<Typo color={COLORS.GRAY_800} mt={3} weight="medium">
										После этого вы сможете размещать вакансии напрямую из BRaiN HR в HH, и все
										данные автоматически передадутся в черновик на HH.ru. (Кнопка публикации станет
										активной только после авторизации).
									</Typo>
									<Typo color={COLORS.GRAY_800} mt={3} weight="medium">
										Обратите внимание: аккаунт, с которого вы публикуете вакансию с нашего сайта,
										должен быть менеджером аккаунта на HH.
									</Typo>
								</>
							}
						/>
					)}
				</Flex>
			}
			subHeadingText="Выберите площадки для подключения"
			id="integrations"
		>
			<Box className={styles.integration}>
				<IntergrityItem
					name="HH.ru"
					isAuthorized={isHhAuthorized}
					img={'/images/hh.png'}
					link={hhIntegrityLink}
					isDangerBorder={isHhTokenBurned}
				/>
				{shouldShowItems && (
					<IntergrityItem
						name="Avito"
						isAuthorized={isAvitoAuthorized}
						img={'/images/avtio.png'}
						link={avitoIntegrityLink}
					/>
				)}
			</Box>
		</Block>
	);
};
