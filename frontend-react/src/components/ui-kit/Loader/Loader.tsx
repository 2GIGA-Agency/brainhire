import React from 'react';
import styles from './Loader.module.scss';

interface LoaderProps {
	size?: 'small' | 'medium' | 'large';
	color?: 'primary' | 'white' | 'grey';
}

export const Loader: React.FC<LoaderProps> = ({ size = 'medium', color = 'primary' }) => {
	return <div className={`${styles.loader} ${styles[size]} ${styles[color]}`} />;
};
