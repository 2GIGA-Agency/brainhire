'use client';

import { useState } from 'react';
import Image from 'next/image';

import styles from './style.module.scss';

export default function Reminder() {
	const [isRemind, setIsRemind] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleToggleRemind = () => {
		if (isRemind) {
			// Если уведомления включены, показываем модалку для подтверждения отключения
			setIsModalOpen(true);
		} else {
			// Если уведомления отключены, включаем их без подтверждения
			setIsRemind(true);
		}
	};

	const confirmDisable = () => {
		setIsRemind(false);
		setIsModalOpen(false);
	};

	const cancelDisable = () => {
		setIsModalOpen(false);
	};

	return (
		<div className={styles.pageContainer}>
			<div className={styles.wrapper}>
				<div className={styles.contentBox}>
					<div className={styles.headerWrapper}>
						<div className={styles.header}>
							<Image
								src="/icons/Logo.svg"
								alt=""
								width={120}
								height={40}
								className={styles.img}
							/>
						</div>
					</div>
					<div className={styles.content}>
						{isRemind ? (
							<button className={styles.rejectButton} onClick={handleToggleRemind}>
								Отключить уведомления
							</button>
						) : (
							'Вы отключили уведомления и больше не будете получать напоминания о прохождение интервью'
						)}
					</div>
				</div>
			</div>

			{/* Модальное окно подтверждения */}
			{isModalOpen && (
				<div className={styles.modalOverlay}>
					<div className={styles.modal}>
						<h3>Подтверждение</h3>
						<p>Вы действительно хотите отключить уведомления?</p>
						<div className={styles.modalButtons}>
							<button className={styles.confirmButton} onClick={confirmDisable}>
								Да, отключить
							</button>
							<button className={styles.cancelButton} onClick={cancelDisable}>
								Отмена
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
