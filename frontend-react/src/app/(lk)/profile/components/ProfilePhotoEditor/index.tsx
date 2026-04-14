// components/Profile/components/ProfilePhotoEditor/ProfilePhotoEditor.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { CloseButton, Dialog, FileUpload, Flex, Portal } from '@chakra-ui/react';
import Image from 'next/image';
import { HiUpload } from 'react-icons/hi';
import { LkButton } from '@/components/shared/LkButton';
import { Typo } from '@/components/shared/Typo/Typo';
import { COLORS } from '@/constants/colors';
import { toaster } from '@/components/ui/toaster';
import axios from '@/utils/axios';
import styles from './style.module.scss';

// Определяем пропсы для компонента
interface ProfilePhotoEditorProps {
	isOpen: boolean;
	onClose: () => void;
	onPhotoUploaded: () => void; // Колбэк для родителя после успешной загрузки
	currentPhotoUrl: string;
}

export const ProfilePhotoEditor: React.FC<ProfilePhotoEditorProps> = ({
	isOpen,
	onClose,
	onPhotoUploaded,
	currentPhotoUrl,
}) => {
	const [previewImage, setPreviewImage] = useState<string | null>(null);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	// Сбрасываем состояние при закрытии модального окна
	useEffect(() => {
		if (!isOpen) {
			setPreviewImage(null);
			setSelectedFile(null);
		}
	}, [isOpen]);

	const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
		if (!allowedTypes.includes(file.type)) {
			toaster.create({ title: 'Ошибка: Допустимы только файлы JPG, PNG, WEBP.' });
			return;
		}

		const maxSizeMB = 2;
		if (file.size > maxSizeMB * 1024 * 1024) {
			toaster.create({ title: `Ошибка: Файл не должен превышать ${maxSizeMB}MB.` });
			return;
		}

		setSelectedFile(file);
		setPreviewImage(URL.createObjectURL(file));
	};

	const uploadFile = () => {
		if (!selectedFile) return;

		const formData = new FormData();
		formData.append('user_photo', selectedFile);

		const promise = axios.patch('/api/profiles/photo/', formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});

		toaster.promise(promise, {
			success: { title: 'Фото обновлено' },
			error: { title: 'Ошибка при обновлении, попробуйте позже...' },
			loading: { title: 'Обновление фото...' },
		});

		promise.then(() => {
			onPhotoUploaded(); // Сообщаем родителю об успехе
		});
	};

	return (
		<Dialog.Root lazyMount open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>
								<Typo size="20px" lineHeight="24px" weight="semibold">
									Фото профиля
								</Typo>
							</Dialog.Title>
							<Dialog.CloseTrigger asChild top="17px" right="15px">
								<CloseButton size="sm" />
							</Dialog.CloseTrigger>
						</Dialog.Header>
						<Dialog.Body display="flex" justifyContent="center">
							<Image
								className={styles.avatar}
								src={previewImage || currentPhotoUrl}
								alt="Avatar"
								width={120}
								height={120}
								unoptimized={true}
							/>
						</Dialog.Body>
						<Dialog.Footer display="flex" justifyContent="center">
							<Flex gap="10px">
								<FileUpload.Root>
									<FileUpload.HiddenInput onChange={handleFileSelected} />
									<FileUpload.Trigger asChild>
										<LkButton icon={<HiUpload />}>
											<Typo color={COLORS.WHITE} weight="semibold">
												Выбрать фото
											</Typo>
										</LkButton>
									</FileUpload.Trigger>
								</FileUpload.Root>
								{selectedFile && (
									<LkButton onClick={uploadFile}>
										<Typo weight="semibold" color={COLORS.WHITE}>
											Сохранить
										</Typo>
									</LkButton>
								)}
							</Flex>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
};
