import { CustomFileUploadList } from '@/components/shared/CustomFileUploadList';
import { LkButton } from '@/components/shared/LkButton';
import { toaster } from '@/components/ui/toaster';
import { COLORS } from '@/constants/colors';
import axios from '@/utils/axios';
import { FileUpload, useFileUpload, Box, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import { useState } from 'react';
import { BulkResponse } from '@/store/types';
import { isAxiosError } from 'axios';

interface Props {
	vacancyId: string;
	vacancySkills: string[];
	vacancyRequiredWorkExperience: string;
	onSuccess: (results: BulkResponse) => void;
}

export function MultipleUpload({
	vacancyId,
	vacancySkills,
	vacancyRequiredWorkExperience,
	onSuccess,
}: Props) {
	const [isLoading, setIsLoading] = useState(false);

	const severalFilesUpload = useFileUpload({
		maxFiles: 50,
		maxFileSize: 5 * 1000 * 1000,
		minFileSize: 1.6 * 1000,
		accept: 'application/pdf',
		onFileReject: (details) => {
			// Группируем ошибки по типам для каждого файла
			const errorMessages: string[] = [];

			details.files.forEach((file) => {
				if (file.errors && file.errors.length > 0) {
					const fileName = file.file.name;

					file.errors.forEach((error) => {
						let message = '';

						switch (error) {
							case 'FILE_INVALID_TYPE':
								message = `Файл "${fileName}" - поддерживаются только .pdf`;
								break;
							case 'FILE_TOO_LARGE':
								message = `Файл "${fileName}" - размер не должен превышать 5 МБ`;
								break;
							case 'FILE_TOO_SMALL':
								message = `Файл "${fileName}" - файл повреждён или пустой`;
								break;
							case 'TOO_MANY_FILES':
								message = `Превышено максимальное количество файлов (50)`;
								break;
							default:
								message = `Файл "${fileName}" - ошибка загрузки ${error}`;
								break;
						}

						if (message && !errorMessages.includes(message)) {
							errorMessages.push(message);
						}
					});
				}
			});

			// Показываем тостеры для каждой ошибки
			errorMessages.forEach((message) => {
				toaster.error({ title: message });
			});
		},
	});

	const isUploadReady = severalFilesUpload.acceptedFiles.length > 0;

	const sendResumes = () => {
		setIsLoading(true);
		const files = severalFilesUpload.acceptedFiles;

		const formData = new FormData();
		formData.append('vacancy_id', vacancyId);
		formData.append('vacancy_stack', vacancySkills.join(','));
		formData.append('required_work_experience', vacancyRequiredWorkExperience);
		files.forEach((file) => {
			formData.append('candidate_resume', file);
		});

		const promise = axios
			.post<BulkResponse>('/api/open_ai_services/resume/manual/bulk/', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})
			.then((res) => {
				severalFilesUpload.clearFiles();

				if (
					(res.data.duplicates_email.length > 0 ||
						res.data.duplicates_file_name.length > 0 ||
						res.data.resumes_without_email.length > 0) &&
					res.data.task_ids.length === 0
				) {
					// Создаем специальную ошибку с флагом для дубликатов
					const error = new Error(
						'Система выявила кандидатов, которые уже есть в базе или повторяются среди загружаемых файлов.'
					);
					(error as any).isDuplicateError = true;
					throw error;
				}

				if (res.data.task_ids.length === 0) {
					const error = new Error(
						'Не было добавлено ни одного кандидата, проверьте файлы на дубликаты'
					);
					(error as any).isDuplicateError = true;
					throw error;
				}

				// Передаем результаты в родительский компонент
				onSuccess(res.data);
				return res;
			})
			.catch((rej) => {
				if (isAxiosError(rej)) {
					// Для axios ошибок создаем новую ошибку без флага isDuplicateError
					const error = new Error(rej.message);
					throw error;
				}
				// Если это не axios ошибка, просто пробрасываем дальше
				throw rej;
			})
			.finally(() => {
				setIsLoading(false);
			});

		toaster.promise(promise, {
			success: {
				title: 'Кандидаты добавлены!',
			},
			error: (rejectValue: unknown) => {
				// Проверяем, является ли это ошибкой дубликатов
				if (rejectValue instanceof Error && (rejectValue as any).isDuplicateError) {
					return {
						title: 'Обнаружены дубликаты',
						description: rejectValue.message,
					};
				}

				// Для всех остальных ошибок (включая axios ошибки)
				return {
					title: 'Произошла ошибка получения кандидатов',
					description: 'Попробуйте позже',
				};
			},
			loading: { title: 'Добавляем кандидатов...' },
		});
	};

	return (
		<>
			<FileUpload.RootProvider value={severalFilesUpload} maxW="xl" alignItems="stretch">
				<FileUpload.HiddenInput />
				<FileUpload.Dropzone>
					<Image src="/icons/upload.svg" alt="Upload Icon" width={24} height={24} />
					<FileUpload.DropzoneContent>
						<Box>Выберите до 50 резюме или перетащите их сюда</Box>
						<Box>.pdf до 5MB каждый</Box>
					</FileUpload.DropzoneContent>
				</FileUpload.Dropzone>
				<CustomFileUploadList fileUploadApi={severalFilesUpload} />
			</FileUpload.RootProvider>

			<Flex gap={3} mt={6} justify="flex-end">
				<LkButton
					bg={COLORS.BLUE_400}
					disabled={!isUploadReady || isLoading}
					loading={isLoading}
					onClick={sendResumes}
				>
					Добавить кандидатов ({severalFilesUpload.acceptedFiles.length})
				</LkButton>
			</Flex>
		</>
	);
}
