import React from 'react';
import Image from 'next/image';
import { Tooltip } from '@/components/ui/tooltip';
import styles from './style.module.scss';

interface VacancyActionsProps {
	vacancyId: string;
	companyId: string;
	isArchiveTab: boolean;
	onView: (id: string) => void;
	onEdit: (id: string) => void;
	onClone: (id: string, companyId: string) => void;
	onArchiveToggle: (id: string) => void;
}

export const VacancyActions: React.FC<VacancyActionsProps> = ({
	vacancyId,
	companyId,
	isArchiveTab,
	onView,
	onEdit,
	onClone,
	onArchiveToggle,
}) => {
	return (
		<div className={styles.actions}>
			<Tooltip
				content="Посмотреть"
				positioning={{ placement: 'top' }}
				showArrow
				openDelay={200}
				closeDelay={0}
			>
				<Image
					onClick={() => onView(vacancyId)}
					src="/icons/HiEye.svg"
					alt="Посмотреть"
					height={16}
					width={16}
					className={styles.hoverDarken}
				/>
			</Tooltip>
			<Tooltip
				content="Редактировать"
				positioning={{ placement: 'top' }}
				showArrow
				openDelay={200}
				closeDelay={0}
			>
				<Image
					onClick={() => onEdit(vacancyId)}
					src="/icons/HiPencil.svg"
					alt="Редактировать"
					height={16}
					width={16}
					className={styles.hoverDarken}
				/>
			</Tooltip>
			<Tooltip
				content="Клонировать"
				positioning={{ placement: 'top' }}
				showArrow
				openDelay={200}
				closeDelay={0}
			>
				<Image
					onClick={() => onClone(vacancyId, companyId)}
					src="/icons/CloneVacancy2.svg"
					alt="Клонировать"
					height={16}
					width={16}
					className={styles.hoverDarken}
				/>
			</Tooltip>
			<Tooltip
				content={isArchiveTab ? 'Разархивировать' : 'Архивировать'}
				positioning={{ placement: 'top' }}
				showArrow
				openDelay={200}
				closeDelay={0}
			>
				<Image
					onClick={() => onArchiveToggle(vacancyId)}
					src="/icons/BsArchiveFill.svg"
					alt={isArchiveTab ? 'Разархивировать' : 'Архивировать'}
					height={16}
					width={16}
					className={styles.hoverDarken}
				/>
			</Tooltip>
		</div>
	);
};
