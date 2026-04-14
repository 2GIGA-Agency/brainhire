// src/components/ui-kit/FileUploadDragZone.tsx
import { Typography } from '@/components/ui-kit/Typography';
import { isFileSizeValid, isFileTypeValid } from '@/utils/fileUploading';
import { FileUpload, Icon } from '@chakra-ui/react';
import { FiUpload } from 'react-icons/fi';

interface Props {
    text: string; // Текст, который будет отображаться под иконкой загрузки
    fileTypes: string[]; // Доступные расширения файлов
    mbAmount: number; // Ограничение по памяти (в МБ)
    onFileSelect: (file: File) => void; // Коллбэк для передачи выбранного файла
}

export const FileUploadDragZone = ({ text, fileTypes, mbAmount, onFileSelect }: Props) => {
    const fileTypesString = fileTypes.map((i) => '.' + i).join(', '); // Получаем строку перечисления типов
    const maxBites = mbAmount * 10e6;

    // Обработчик изменения файла
    const handleFileChange = (files: FileList | null) => {
        if (!files) return;

        Array.from(files).forEach((file) => {
            if (!isFileTypeValid(file, fileTypes)) {
                alert(`Файл "${file.name}" имеет недопустимый тип. Разрешены только: ${fileTypesString}`);
                return;
            }

            if (!isFileSizeValid(file, mbAmount)) {
                alert(`Файл "${file.name}" слишком большой. Максимальный размер: ${mbAmount}MB`);
                return;
            }

            onFileSelect(file); // Передаем выбранный файл
        });
    };

    return (
        <FileUpload.Root alignItems="stretch" maxFileSize={maxBites} maxFiles={1}>
            {/* Скрытый инпут для загрузки файлов */}
            <FileUpload.HiddenInput
                accept={fileTypes.map((type) => `.${type}`).join(',')} // Указываем допустимые типы файлов
                onChange={(e) => handleFileChange(e.target.files)} // Обработчик изменения файла
            />
            {/* Зона перетаскивания файлов */}
            <FileUpload.Dropzone cursor="pointer">
                <Icon size="md" color="fg.muted">
                    <FiUpload />
                </Icon>
                <FileUpload.DropzoneContent>
                    <Typography variant="body-xss-regular" color="grey-500">
                        {text}
                    </Typography>
                    <Typography variant="body-xss-regular" color="grey-500">
                        {fileTypesString} до {mbAmount}MB
                    </Typography>
                </FileUpload.DropzoneContent>
            </FileUpload.Dropzone>
            {/* Список загруженных файлов */}
            <FileUpload.List />
        </FileUpload.Root>
    );
};