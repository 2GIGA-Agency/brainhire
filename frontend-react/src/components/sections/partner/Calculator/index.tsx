'use client';

import React, { useState } from 'react';
import styles from './style.module.scss';

interface Status {
	id: string;
	name: string;
	percent: number;
	color: string;
	icon: string;
	statusColor: string;
}

const Calculator: React.FC = () => {
	const [selectedStatus, setSelectedStatus] = useState<string>('gold');
	const [salesAmount, setSalesAmount] = useState<string>('');
	const [commissionRate, setCommissionRate] = useState<number>(25);

	const statuses: Status[] = [
		{
			id: 'bronze',
			name: 'Bronze',
			percent: 15,
			color: styles.statusBronze,
			icon: '🥉',
			statusColor: styles.statusBronze,
		},
		{
			id: 'silver',
			name: 'Silver',
			percent: 20,
			color: styles.statusSilver,
			icon: '🥈',
			statusColor: styles.statusSilver,
		},
		{
			id: 'gold',
			name: 'Gold',
			percent: 25,
			color: styles.statusGold,
			icon: '🥇',
			statusColor: styles.statusGold,
		},
	];

	const handleStatusChange = (statusId: string, percent: number) => {
		setSelectedStatus(statusId);
		setCommissionRate(percent);
	};

	const handleSalesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\D/g, '');
		setSalesAmount(value);
	};

	const formatCurrency = (amount: number): string => {
		return new Intl.NumberFormat('ru-RU').format(amount) + ' ₽';
	};

	const sales = parseInt(salesAmount) || 0;
	const commission = (sales * commissionRate) / 100;
	const totalIncome = commission;

	const currentStatus = statuses.find((s) => s.id === selectedStatus);

	return (
		<div className={styles.calculator}>
			<h2 className={styles.calculatorTitle}>КАЛЬКУЛЯТОР ДОХОДА ПАРТНЕРСКОЙ ПРОГРАММЫ</h2>

			<div className={styles.calculatorContent}>
				{/* Блок выбора тарифа */}
				<div>
					<div className={styles.statuses}>
						{statuses.map((status) => (
							<div
								key={status.id}
								className={`${styles.status} ${status.color} ${
									selectedStatus === status.id ? styles.statusActive : ''
								}`}
								onClick={() => handleStatusChange(status.id, status.percent)}
							>
								<span className={styles.statusIcon}>{status.icon}</span>
								<div className={styles.statusName}>{status.name}</div>
								<div className={styles.statusPercent}>{status.percent}%</div>
							</div>
						))}
					</div>
				</div>

				{/* Поле для ввода суммы */}
				<div className={styles.inputGroup}>
					<label className={styles.inputLabel}>Сумма продаж (р):</label>
					<input
						type="text"
						value={salesAmount ? parseInt(salesAmount).toLocaleString('ru-RU') : ''}
						onChange={handleSalesChange}
						placeholder="Введите сумму продаж"
						className={styles.inputField}
					/>
				</div>

				{/* Блок с результатами */}
				<div className={styles.results}>
					<div className={styles.resultItem}>
						<span className={styles.resultLabel}>Текущий статус:</span>
						<span
							className={styles.resultStatus}
							style={{
								background:
									currentStatus?.id === 'bronze'
										? 'linear-gradient(135deg, #cd7f32 0%, #b8732d 100%)'
										: currentStatus?.id === 'silver'
											? 'linear-gradient(135deg, #c0c0c0 0%, #a8a8a8 100%)'
											: 'linear-gradient(135deg, #ffd700 0%, #ffcc00 100%)',
							}}
						>
							{currentStatus?.name}
						</span>
					</div>

					<div className={styles.resultItem}>
						<span className={styles.resultLabel}>Комиссионная ставка:</span>
						<span className={styles.resultValue}>{commissionRate}%</span>
					</div>

					<div className={`${styles.resultItem} ${styles.resultTotal}`}>
						<span className={styles.resultLabel}>Общий доход:</span>
						<span className={styles.resultValue}>{formatCurrency(totalIncome)}</span>
					</div>
				</div>

				{/* Кнопка */}
				<a href="https://brain-referral.ru/partner-signup" className={styles.button}>
					Стать агентом
				</a>
			</div>
		</div>
	);
};

export default Calculator;
