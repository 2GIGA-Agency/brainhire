// src/components/sections/lk/vacancy/create/CompanyVideo.tsx
'use client';

import { Block } from '@/components/shared/Block';
import { VideoUploadDragZone } from '@/components/shared/VideoUpdaloadDragZone';
import { Typography } from '@/components/ui-kit';
import { LkField } from '@/components/shared/LkField';
import { LkInput } from '@/components/shared/LkInput';
import { RadioButtonGroup } from '@/components/ui-kit/RadioButtonGroup';
import { Flex } from '@chakra-ui/react';
import {
	selectHasVideo,
	selectVideoUrl,
	setHasVideo,
	setVideoFile,
	setVideoUrl,
} from '@/store/slices/vacancyCreation/companyVideoSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';

const selectItems = [
	{ label: 'Да', value: 'yes' },
	{ label: 'Нет', value: 'no' },
];

export const CompanyVideo = () => {
	const dispatch = useAppDispatch();
	const hasVideo = useAppSelector(selectHasVideo);
	const videoUrl = useAppSelector(selectVideoUrl);

	// Вычисляем initialValue для RadioButtonGroup
	const initialValue = hasVideo ? 'yes' : 'no';

	return (
		<Block headingText="Хотите ли Вы загрузить видео о компании?" subHeadingText="Выберите ответ">
			<RadioButtonGroup
				items={selectItems}
				initialValue={initialValue} // Передаем начальное значение
				onChange={(e) => dispatch(setHasVideo(e?.value === 'yes'))}
			/>
			{hasVideo && (
				<Flex mt="24px" gap="24px" flexDirection="column">
					<Typography variant="body-xs">
						Загрузите видео с устройства или введите URL с видео
					</Typography>
					<VideoUploadDragZone onFileSelect={(file) => dispatch(setVideoFile(file))} />
					<LkField label="URL">
						<LkInput
							placeholder="Введите URL с видео"
							onChange={(e) => dispatch(setVideoUrl(e.target.value))}
							value={videoUrl}
						/>
					</LkField>
				</Flex>
			)}
		</Block>
	);
};
