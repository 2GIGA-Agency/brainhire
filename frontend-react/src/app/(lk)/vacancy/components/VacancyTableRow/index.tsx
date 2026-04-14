import React, { memo } from 'react';
import { Tooltip } from '@/components/ui/tooltip';
import { Typo } from '@/components/shared/Typo/Typo';
import { COLORS } from '@/constants/colors';
import Image from 'next/image';
import { formatDateTime } from '@/utils/formatDate';
import { formatNumber } from '@/utils/formatNumber';
import styles from './style.module.scss';
import { getWorkDaysColor } from '../../lib/helpers';
import { IVacancyInVacanciesResponse } from '@/store/rtkQuery/types/Vacancies';
// Рекомендую использовать clsx или classnames для удобства, но можно и шаблонами строк

interface VacancyTableRowProps {
	vacancy: IVacancyInVacanciesResponse;
	tableTab: 'all' | 'archive';
	onView: (id: string) => void;
	onEdit: (id: string) => void;
	onClone: (vacancy: IVacancyInVacanciesResponse) => void;
	onArchive: (id: string) => void;
}

export const VacancyTableRow: React.FC<VacancyTableRowProps> = memo(function VacancyTableRow({
	vacancy,
	tableTab,
	onView,
	onEdit,
	onClone,
	onArchive,
}) {
	const workDaysColor = getWorkDaysColor(vacancy.number_days); // например 'green'
	const archiveTooltip = tableTab === 'archive' ? 'Разархивировать' : 'Архивировать';

	// Формируем класс для тега динамически.
	// styles[`tag_${workDaysColor}`] сработает, если в scss есть классы tag_green, tag_red и т.д.
	// Если цвет возвращается сложный, возможно придется использовать inline styles.
	const tagClass = styles[`tag_${workDaysColor}`] || styles.tag_gray;

	return (
		<tr className={styles.tr}>
			{/* Дата */}
			<td className={`${styles.td} ${styles.cellNowrap}`}>
				<Typo color={COLORS.GRAY_600}>{formatDateTime(vacancy.create_date)}</Typo>
			</td>

			{/* Компания */}
			<td
				className={styles.td}
				style={{ maxWidth: '200px' }}
				title={vacancy.company.company_name.length > 20 ? vacancy.company.company_name : ''}
			>
				<div className={styles.cellTruncated}>
					<Typo color={COLORS.GRAY_600}>{vacancy.company.company_name}</Typo>
				</div>
			</td>

			{/* Название вакансии */}
			<td
				className={styles.td}
				style={{ maxWidth: '275px', cursor: 'pointer' }}
				onClick={() => onView(vacancy.id)}
				title={vacancy.vacancy_name.length > 30 ? vacancy.vacancy_name : ''}
			>
				<div className={`${styles.cellTruncated} ${styles.linkText}`}>
					<Typo className={styles.linkText} color="inherit">
						{vacancy.vacancy_name}
					</Typo>
				</div>
			</td>

			{/* Кандидаты */}
			<td className={`${styles.td} ${styles.cellNowrap}`}>
				<Typo color={COLORS.GRAY_600}>
					{vacancy.number_candidates ? formatNumber(vacancy.number_candidates) : '0'}
				</Typo>
			</td>

			{/* Кандидаты 7+ */}
			<td className={`${styles.td} ${styles.cellNowrap}`}>
				<Typo color={COLORS.GRAY_600}>
					{vacancy.number_best_candidates ? formatNumber(vacancy.number_best_candidates) : '0'}
				</Typo>
			</td>

			{/* Дней в работе (Кастомный Tag) */}
			<td className={`${styles.td} ${styles.cellNowrap}`}>
				<span className={`${styles.tag} ${tagClass}`}>{vacancy.number_days}</span>
			</td>

			{/* Создатель */}
			<td className={styles.td}>
				<Typo color={COLORS.GRAY_600}>{vacancy.user_full_name}</Typo>
			</td>

			{/* Действия */}
			<td className={styles.td}>
				<div className={styles.actions}>
					<Tooltip
						content="Посмотреть"
						positioning={{ placement: 'top' }}
						showArrow
						openDelay={0}
						closeDelay={0}
					>
						<Image
							onClick={() => onView(vacancy.id)}
							src="/icons/HiEye.svg"
							alt="view"
							height={16}
							width={16}
							className={styles.hoverDarken}
						/>
					</Tooltip>
					<Tooltip
						content="Редактировать"
						positioning={{ placement: 'top' }}
						showArrow
						openDelay={0}
						closeDelay={0}
					>
						<Image
							onClick={() => onEdit(vacancy.id)}
							src="/icons/HiPencil.svg"
							alt="edit"
							height={16}
							width={16}
							className={styles.hoverDarken}
						/>
					</Tooltip>
					<Tooltip
						content="Клонировать"
						positioning={{ placement: 'top' }}
						showArrow
						openDelay={0}
						closeDelay={0}
					>
						<Image
							onClick={() => onClone(vacancy)}
							src="/icons/CloneVacancy2.svg"
							alt="clone"
							height={16}
							width={16}
							className={styles.hoverDarken}
						/>
					</Tooltip>
					<Tooltip
						content={archiveTooltip}
						positioning={{ placement: 'top' }}
						showArrow
						openDelay={0}
						closeDelay={0}
					>
						<Image
							onClick={() => onArchive(vacancy.id)}
							src="/icons/BsArchiveFill.svg"
							alt="archive"
							height={16}
							width={16}
							className={styles.hoverDarken}
						/>
					</Tooltip>
				</div>
			</td>
		</tr>
	);
});
