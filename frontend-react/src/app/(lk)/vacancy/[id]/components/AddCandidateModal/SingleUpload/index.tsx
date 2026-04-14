import { CustomFileUploadList } from '@/components/shared/CustomFileUploadList';
import { LkButton } from '@/components/shared/LkButton';
import { LkField } from '@/components/shared/LkField';
import { LkInput } from '@/components/shared/LkInput';
import { Typo } from '@/components/shared/Typo/Typo';
import { toaster } from '@/components/ui/toaster';
import { COLORS } from '@/constants/colors';
import axios from '@/utils/axios';
import { isEmailValid } from '@/utils/isEmailValid';
import { FileUpload, useFileUpload, Box, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
	vacancyId: string;
	vacancySkills: string[];
	vacancyRequiredWorkExperience: string;
	onSuccess: () => void;
}

export function SingleUpload({
	vacancyId,
	vacancySkills,
	vacancyRequiredWorkExperience,
	onSuccess,
}: Props) {
	const [email, setEmail] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const singleFileUpload = useFileUpload({
		maxFiles: 1,
		maxFileSize: 5 * 1000 * 1000,
		minFileSize: 1.6 * 1000,
		accept: 'application/pdf',
		onFileReject: (details) => {
			const fileError = details.files[0].errors[0];
			let message = '';

			switch (fileError) {
				case 'FILE_INVALID_TYPE':
					message = 'Поддерживаются только файлы формата .pdf';
					break;
				case 'FILE_TOO_LARGE':
					message = 'Размер файла не должен превышать 5 МБ';
					break;
				case 'FILE_TOO_SMALL':
					message = 'Файл повреждён или пустой';
					break;
				default:
					message = fileError;
					break;
			}
			if (message) {
				toaster.error({ title: message });
			}
		},
	});

	const isUploadReady = email !== '' && singleFileUpload.acceptedFiles.length === 1;

	const sendResume = () => {
		setIsLoading(true);
		const file = singleFileUpload.acceptedFiles[0];
		const formData = new FormData();
		formData.append('email', email);
		formData.append('vacancy_id', vacancyId);
		formData.append('vacancy_stack', vacancySkills.join(','));
		formData.append('required_work_experience', vacancyRequiredWorkExperience);
		formData.append('candidate_resume', file);

		const promise = axios
			.post('/api/open_ai_services/resume/manual/', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})
			.then(() => {
				singleFileUpload.clearFiles();
				setEmail('');
				onSuccess();
			})
			.finally(() => {
				setIsLoading(false);
			});

		toaster.promise(promise, {
			success: {
				title: 'Кандидат добавлен! Он находится во вкладке "Ожидают разбора"',
			},
			error: {
				title: 'Возникла ошибка, попробуйте позже...',
			},
			loading: { title: 'Добавляю кандидата...' },
		});

		return promise;
	};

	return (
		<>
			<FileUpload.RootProvider value={singleFileUpload} maxW="xl" alignItems="stretch">
				<FileUpload.HiddenInput />
				<FileUpload.Dropzone>
					<Image src="/icons/upload.svg" alt="Upload Icon" width={24} height={24} />
					<FileUpload.DropzoneContent>
						<Box>Выберите резюме или перетащите его сюда</Box>
						<Box>.pdf до 5MB</Box>
					</FileUpload.DropzoneContent>
				</FileUpload.Dropzone>
				<CustomFileUploadList fileUploadApi={singleFileUpload} />
			</FileUpload.RootProvider>

			<LkField required mt={4} label={'Email'}>
				<LkInput
					placeholder="Введите email кандидата"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				{email && !isEmailValid(email) && (
					<Typo color={COLORS.RED_400} mt={2} weight="medium">
						Некорректный формат email
					</Typo>
				)}
			</LkField>

			<Flex gap={3} mt={6} justify="flex-end">
				<LkButton
					bg={COLORS.BLUE_400}
					disabled={!isUploadReady || isLoading || !isEmailValid(email)}
					loading={isLoading}
					onClick={sendResume}
				>
					<Typo weight="semibold" color={COLORS.WHITE}>
						Добавить кандидата
					</Typo>
				</LkButton>
			</Flex>
		</>
	);
}
