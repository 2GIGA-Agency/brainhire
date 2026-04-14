import React, { memo } from 'react';
import { Typo } from '@/components/shared/Typo/Typo';
import { SortHeader } from '@/components/shared/SortHeader';
import { COLORS } from '@/constants/colors';
import { formatNumber } from '@/utils/formatNumber';
import { formatDateTime } from '@/utils/formatDate';
import { getWorkDaysColor } from '../../lib/helpers';
import styles from './style.module.scss';
import { VacancyActions } from '../VacancyActions';
import { TABLE_TAB } from '../../types';
import clsx from 'clsx';

interface VacancyTableProps {
	data: any[];
	isUpdating: boolean;
	ordering: { order: string; value: number };
	onSort: (key: any) => void;
	tab: TABLE_TAB;
	onView: (id: string) => void;
	onEdit: (id: string) => void;
	onClone: (id: string, companyId: string) => void;
	onArchiveToggle: (id: string) => void;
}

const tableColumns = [
	{ title: 'Дата размещения', sortType: 'date', dataKey: 'create_date' },
	{ title: 'Компания', sortType: 'string', dataKey: 'company' },
	{ title: 'Название вакансии', sortType: 'string', dataKey: 'vacancy_name' },
	{ title: 'Кандидаты', sortType: 'number', dataKey: 'number_candidates' },
	{ title: 'Кандидаты 7+', sortType: 'number', dataKey: 'number_best_candidates' },
	{ title: 'Дней в работе', sortType: 'number', dataKey: 'number_days' },
	{ title: 'Создатель', sortType: 'string', dataKey: 'user_full_name' },
	{ title: 'Действия' },
];

const VacancyTableRaw: React.FC<VacancyTableProps> = ({
	data,
	ordering,
	onSort,
	isUpdating,
	tab,
	onView,
	onEdit,
	onClone,
	onArchiveToggle,
}) => {
	if (!data.length) {
		return (
			<div className={styles.emptyContainer}>
				<div className={styles.emptyText}>
					<Typo color={COLORS.GRAY_600}>Список вакансий пуст</Typo>
				</div>
			</div>
		);
	}

	return (
		<table
			className={clsx(styles.tableRoot, {
				[styles.updating]: isUpdating,
			})}
		>
			<thead className={styles.thead}>
				<tr>
					{tableColumns.map((item) => (
						<th
							key={item.title}
							className={`${styles.th} ${item.sortType ? styles.sortable : ''}`}
							onClick={() => item.sortType && onSort(item.dataKey)}
						>
							{item.sortType && item.dataKey ? (
								<SortHeader title={item.title} ordering={ordering} sortType={item.dataKey} />
							) : (
								<Typo weight="semibold">{item.title}</Typo>
							)}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map((vacancy) => {
					const colorKey = getWorkDaysColor(vacancy.number_days);
					const colorClass =
						styles[`tag${colorKey.charAt(0).toUpperCase() + colorKey.slice(1)}`] || styles.tagGray;

					return (
						<tr key={vacancy.id} className={styles.tr}>
							{/* Дата */}
							<td className={`${styles.td} ${styles.cellNowrap}`}>
								<Typo color={COLORS.GRAY_600}>{formatDateTime(vacancy.create_date)}</Typo>
							</td>

							{/* --- КОМПАНИЯ --- */}
							<td
								className={styles.td}
								title={vacancy.company.company_name} // Показываем полный текст при наведении
							>
								<div className={`${styles.truncateWrapper}`}>
									<Typo transition="color .2s ease" color={COLORS.GRAY_600}>
										{vacancy.company.company_name}
									</Typo>
								</div>
							</td>

							{/* --- НАЗВАНИЕ ВАКАНСИИ --- */}
							<td
								className={`${styles.td} ${styles.clickableText}`}
								onClick={() => onView(vacancy.id)}
								title={vacancy.vacancy_name} // Показываем полный текст при наведении
							>
								<div className={styles.truncateWrapper} style={{ maxWidth: '250px' }}>
									<Typo
										transition="color .2s ease"
										_hover={{ color: COLORS.BLUE_400 }}
										color={COLORS.GRAY_600}
									>
										{vacancy.vacancy_name}
									</Typo>
								</div>
							</td>

							{/* Остальные колонки без изменений */}
							<td className={`${styles.td} ${styles.cellNowrap}`}>
								<Typo color={COLORS.GRAY_600}>{formatNumber(vacancy.number_candidates)}</Typo>
							</td>
							<td className={`${styles.td} ${styles.cellNowrap}`}>
								<Typo color={COLORS.GRAY_600}>{formatNumber(vacancy.number_best_candidates)}</Typo>
							</td>
							<td className={`${styles.td} ${styles.cellNowrap}`}>
								<span className={`${styles.tag} ${colorClass}`}>{vacancy.number_days}</span>
							</td>
							<td className={styles.td}>
								<Typo color={COLORS.GRAY_600}>{vacancy.user_full_name}</Typo>
							</td>
							<td className={`${styles.td} ${styles.cellCenter}`}>
								<VacancyActions
									vacancyId={vacancy.id}
									companyId={vacancy.company.id}
									isArchiveTab={tab === TABLE_TAB.ARCHIVE}
									onView={onView}
									onEdit={onEdit}
									onClone={onClone}
									onArchiveToggle={onArchiveToggle}
								/>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export const VacancyTable = memo(VacancyTableRaw);
