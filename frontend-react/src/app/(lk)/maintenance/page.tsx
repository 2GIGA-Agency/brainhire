'use client';
import { Text } from '@chakra-ui/react';
import Image from 'next/image';
import styles from './Maintance.module.scss';

const Maintenance = () => {
	return (
		<>
			<div className={styles.logo}>
				<Image src="/icons/Logo.svg" alt="" width={150} height={50} />
			</div>
			<Text textStyle="xl" textAlign="center" mt={5}>
				В настоящее время проводится обслуживание серверов.
			</Text>
			<Text textStyle="xl" textAlign="center">
				Система будет доступна сегодня после 15:00 МСК.
			</Text>
			<Text textStyle="xl" textAlign="center" mb={5}>
				Приносим извинения за временные неудобства.
			</Text>
				<div className={styles.logo}>
				<Image src="/images/maintance.png" alt="Maintance" width={300} height={250} />
			</div>
		</>
	);
};

export default Maintenance;
