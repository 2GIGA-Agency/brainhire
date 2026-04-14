'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import styles from './style.module.scss';
import { useParams } from 'next/navigation';
import { Flex } from '@chakra-ui/react';
import { Typo } from '@/components/shared/Typo/Typo';
import { COLORS } from '@/constants/colors';
import { Spinner } from '@/components/shared/Spinner';
import axios from 'axios';

export default function Reminder() {
	const params = useParams();
	const candidateId = params.candidateId as string;

	const [isRemind, setIsRemind] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		const fetchCandidate = async () => {
			try {
				setIsLoading(true);
				const response = await fetch(
					`/api/candidates/candidate_messages/${candidateId}/check_send_reminds/`
				);
				const data = await response.json();
				setIsRemind(data.send_reminds);
				return data;
			} catch (e: any) {
				console.error(e.message);
				setIsRemind(false);
				setError(e.response.data.message);
			} finally {
				setIsLoading(false);
			}
		};

		fetchCandidate();
	}, []);

	const handleToggleRemind = () => {
		if (isRemind) {
			setIsModalOpen(true);
		} else {
			// Если уведомления отключены, включаем их без подтверждения
			setIsRemind(true);
		}
	};

	const confirmDisable = () => {
		setIsRemind(false);
		axios.put(`/api/candidates/candidate_messages/${candidateId}/unsubscribe_reminds/`);
		setIsModalOpen(false);
	};

	const cancelDisable = () => {
		setIsModalOpen(false);
	};

	if (error) {
		return (
			<Flex justifyContent={'center'} alignItems={'center'}>
				<Typo size="24px" weight="semibold" color={COLORS.GRAY_800}>
					Произошла ошибка {error}
				</Typo>
			</Flex>
		);
	}

	if (isLoading) {
		return <Spinner />;
	}

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
