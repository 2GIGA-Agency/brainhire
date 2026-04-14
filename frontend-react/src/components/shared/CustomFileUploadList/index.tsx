import {
	Box,
	Button,
	CloseButton,
	List,
	ListItem,
	Text,
	UseFileUploadReturn,
} from '@chakra-ui/react';
import { Typo } from '../Typo/Typo';

function formatBytes(bytes: number, decimals = 2) {
	if (!+bytes) return '0 Bytes';

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

interface CustomFileUploadListProps {
	// Мы будем передавать сюда результат хука useFileUpload
	fileUploadApi: UseFileUploadReturn;
}

export const CustomFileUploadList = ({ fileUploadApi }: CustomFileUploadListProps) => {
	const { acceptedFiles, deleteFile, clearFiles } = fileUploadApi;

	if (acceptedFiles.length === 0) {
		return null; // Не рендерим ничего, если файлов нет
	}

	return (
		<Box mt={4} width="100%">
			<List.Root>
				{acceptedFiles.map((file, index) => (
					<ListItem
						key={index}
						p={2}
						borderWidth="1px"
						borderRadius="md"
						mb={3}
						display="flex"
						justifyContent="space-between"
						alignItems="center"
					>
						<Box>
							<Typo>{file.name}</Typo>
							<Text fontSize="sm" color="gray.500">
								{formatBytes(file.size)}
							</Text>
						</Box>
						<CloseButton
							aria-label="Remove file"
							size="sm"
							variant="ghost"
							colorScheme="red"
							onClick={() => deleteFile(file)} // Удаляем конкретный файл
						/>
					</ListItem>
				))}
			</List.Root>

			{/* Кнопка для очистки всех файлов */}
			{acceptedFiles.length > 1 && (
				<Button mt={4} variant="outline" size="sm" onClick={clearFiles}>
					Очистить все
				</Button>
			)}
		</Box>
	);
};
