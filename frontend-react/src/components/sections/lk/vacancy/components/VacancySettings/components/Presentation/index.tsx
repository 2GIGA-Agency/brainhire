import { Block } from '@/components/shared/Block';

import { useAppDispatch, useAppSelector } from '@/store/store';
import {
	Box,
	CloseButton,
	Field,
	FileUpload,
	Flex,
	Input,
	InputGroup,
	useFileUpload,
} from '@chakra-ui/react';
import { useState } from 'react';
import { LuFileUp } from 'react-icons/lu';
import { Heading } from '../Heading';
import styles from './styles.module.scss';
import { HeadingRadioGroup } from '@/components/shared/RadioChoice/HeadingRadioGroup';
import {
	selectPresentation,
	selectPreviousPdf,
	setPdf,
	setPresentation,
	setVideoUrl,
} from '@/store/slices/vacancyCreation/vacancySettings';
import { RootState } from '@/store/store';

export function Presentation() {
	const dispatch = useAppDispatch();
	const previousVideoUrl = useAppSelector((state: RootState) => state.vacancyCreation.vacancySettings.video_url);
	const previousPdf = useAppSelector(selectPreviousPdf);
	const isPresentation = useAppSelector(selectPresentation);
	const [videoUrl, setVideoUrlInput] = useState(previousVideoUrl);
	const [videoUrlError, setVideoUrlError] = useState(false);

	const isPresentationNeeded = useAppSelector(selectPresentation);

	// Обработчик кнопкок Да/Нет для выбора нужна ли презентация
	const handleOnRadioChange = (choice: boolean) => {
		dispatch(setPresentation(choice));
	};

	const handleVideoUrlChange = (url: string) => {
		setVideoUrlInput(url);
		try {
			const parsed = new URL(url);
			const hostname = parsed.hostname.toLowerCase();
			const isValidUrl = hostname.includes('youtube.com') || hostname.includes('rutube.ru');

			if (isValidUrl) {
				dispatch(setVideoUrl(url));
				setVideoUrlError(false);
			} else {
				setVideoUrlError(true);
			}
		} catch {
			if (url === '') {
				dispatch(setVideoUrl(''));
				setVideoUrlError(false);
			} else {
				setVideoUrlError(true);
			}
		}
	};

	const pdfUpload = useFileUpload({
		maxFiles: 1,
		accept: ['application/pdf'],
		onFileChange(details) {
            dispatch(setPdf(details.acceptedFiles[0] ?? null));
        },
	});

	// Вспомогательная функция для получения имени файла
	const getFileName = (url: string) => {
		try {
			return decodeURIComponent(url.split('?')[0].split('/').pop() || url);
		} catch {
			return url;
		}
	};

	// Определяем состояние для отображения
    const hasNewFile = pdfUpload.acceptedFiles.length > 0;
    const hasPreviousFile = Boolean(previousPdf);
    // Файл есть, если загрузили новый ИЛИ есть старый
    const hasFile = hasNewFile || hasPreviousFile;
    
    // Текст для отображения
    const displayText = hasNewFile 
        ? pdfUpload.acceptedFiles[0].name 
        : hasPreviousFile 
            ? getFileName(previousPdf as string) 
            : 'Выберите файл'; // Ваш кастомный плейсхолдер

    // Обработчик очистки
    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation(); // Чтобы не открывалось окно выбора файла
        e.preventDefault();
        
        // 1. Очищаем локальный стейт загрузчика
        // Обычно это clearFiles() или setFiles([])
        if (pdfUpload.clearFiles) {
            pdfUpload.clearFiles();
        }
        
        // 2. Очищаем глобальный стейт
        dispatch(setPdf(null));
    };

	return (
		<Block
			showSeparator={false}
			heading={
				<Flex justifyContent="space-between" w="100%" mt={2}>
					<Heading
						text="Презентация вакансии или компании"
						tooltipText="Добавить .pdf или видео-презентацию вашей компании или вакансии для кандидатов?"
					/>
					<HeadingRadioGroup value={isPresentationNeeded} onChange={handleOnRadioChange} />
				</Flex>
			}
		>
			{isPresentation && (
				<Box className={styles.presentationContainer} mt={4}>
					<FileUpload.RootProvider value={pdfUpload} maxWidth="300px">
						<FileUpload.HiddenInput />
						<FileUpload.Label>
							Загрузка .pdf презентации вашей вакансии или компании
						</FileUpload.Label>
						<InputGroup
							startElement={<LuFileUp />}
							endElement={
                                hasFile ? (
									<CloseButton
										me="-1"
										size="xs"
										variant="plain"
										focusVisibleRing="inside"
										focusRingWidth="2px"
										pointerEvents="auto"
                                        onClick={handleClear}
										position="relative"
										zIndex={2}
									/>
                                ) : null
							}
						>
							<Input asChild>
								<FileUpload.Trigger
									width="100%" 
                                    textAlign="left" 
                                    paddingRight="40px"
								>
                                    <Box 
                                        as="span"
										display="block"
                                        truncate 
                                        color={hasFile ? "inherit" : "gray.500"}
                                        width="100%"
                                    >
                                        {displayText}
                                    </Box>
								</FileUpload.Trigger>
							</Input>
						</InputGroup>
					</FileUpload.RootProvider>

					<Field.Root maxWidth="300px" invalid={videoUrlError}>
						<Field.Label mb="10px">Ссылка на видео-презентацию (youtube, rutube)</Field.Label>
						<Input
							placeholder="https://rutube.ru/video/..."
							value={videoUrl}
							onChange={(e) => handleVideoUrlChange(e.target.value)}
						/>
						<Field.ErrorText>Неверный формат ссылки</Field.ErrorText>
					</Field.Root>
				</Box>
			)}
		</Block>
	);
}
