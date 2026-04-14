import { Box, Flex } from '@chakra-ui/react';

import { Block } from '@/components/shared/Block';
import { COLORS } from '@/constants/colors';
import Image from 'next/image';
import { useState } from 'react';
import { ConfirmedModal } from '../ConfirmedModal';
import { Typo } from '../Typo/Typo';
import { toaster } from '@/components/ui/toaster';
import axios from '@/utils/axios';
import { useGetProfileQuery } from '@/store/rtkQuery/api';
import { LkButton } from '../LkButton';

interface Props {
	name: string;
	isAuthorized: boolean;
	img: string;
	link: string;
	isDangerBorder?: boolean;
}

// Тут будут лежать текстовки для модалок отзыва авторизаций для различных площадок
const INTEGRATIONS_DATA = {
	'HH.ru': {
		title: 'Отмена авторизации HH.ru',
		text: 'При отключении авторизации будут удалены связи с аккаунтом на HH.ru у данного пользователя, а также все связи с вакансиями на HH.ru. Вы уверены что хотите отвязать аккаунт HH.ru от BRaiN?',
		api: '/api/hh/user/delete/',
	},
	Avito: {
		title: 'Отмена авторизации Avito',
		text: 'При отключении авторизации будут удалены связи с аккаунтом на Avito у данного пользователя, а также все связи с вакансиями на Avito. Вы уверены что хотите отвязать аккаунт Avito от BRaiN?',
		api: '/api/avito/user/delete',
	},
};

export const IntergrityItem = ({
	name,
	isAuthorized,
	img,
	link,
	isDangerBorder = false,
}: Props) => {
	const [openModal, setOpenModal] = useState(false);
	const { refetch } = useGetProfileQuery();

	const handleDisconnect = () => {
		setOpenModal(false);

		const promise = axios.delete(INTEGRATIONS_DATA[name].api).then(() => {
			refetch();
		});

		toaster.promise(promise, {
			success: {
				title: 'Авторизация отключена!',
			},
			error: {
				title: 'Возникла ошибка, попробуйте позже...',
			},
			loading: { title: 'Отключаем авторизацию...' },
		});
	};

	return (
		<Block maxWidth="274px" isDangerBorder={isDangerBorder}>
			<ConfirmedModal
				title={INTEGRATIONS_DATA[name].title}
				text={INTEGRATIONS_DATA[name].text}
				buttonConfirmText="Подтвердить"
				buttonCancelText="Отмена"
				isOpen={openModal}
				onClose={() => setOpenModal(false)}
				action={handleDisconnect}
			/>
			<Flex gap="16px" alignItems="center">
				<Image alt={name} src={img} width={40} height={40} />
				{name}
			</Flex>
			<Box mt="24px">
				{!isDangerBorder && isAuthorized ? (
					<>
						<Typo
							padding="4px 8px"
							color={COLORS.WHITE}
							bgColor={COLORS.GREEN_400}
							textAlign={'center'}
							weight="medium"
							size="16px"
							borderRadius={5}
						>
							Вы уже авторизованы
						</Typo>
						<LkButton
							variant="surface"
							size="xs"
							width="100%"
							colorPalette="red"
							marginTop="15px"
							bg={COLORS.RED_100}
							onClick={() => setOpenModal(true)}
						>
							<Typo color={COLORS.RED_600} weight="medium">
								Отозвать авторизацию
							</Typo>
						</LkButton>
					</>
				) : (
					<LkButton
						padding="0px 12px"
						onClick={(e) => {
							window.open(link, '_blank');
						}}
						bg={isDangerBorder ? COLORS.RED_400 : COLORS.BLUE_400}
					>
						<Typo color={COLORS.WHITE} alignItems="center" size="16px" textAlign={'center'}>
							{isDangerBorder ? 'Обновить токен' : 'Подключить'}
						</Typo>
					</LkButton>
				)}
			</Box>
		</Block>
	);
};
