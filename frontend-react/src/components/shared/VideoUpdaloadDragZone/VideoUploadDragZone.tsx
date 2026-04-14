// src/components/shared/VideoUpdaloadDragZone.tsx
import { FileUploadDragZone } from '@/components/ui-kit/FileUploadDragZone';

interface Props {
	onFileSelect: (file: File) => void;
}

export const VideoUploadDragZone = ({ onFileSelect }: Props) => {
	const videoTypes = ['mkv', 'avi', 'mp4'];

	return (
		<FileUploadDragZone
			text="Выберите видео или перетащите его сюда"
			fileTypes={videoTypes}
			mbAmount={50}
			onFileSelect={onFileSelect}
		/>
	);
};
