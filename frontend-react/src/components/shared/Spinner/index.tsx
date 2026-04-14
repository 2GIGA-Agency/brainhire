// Spinner.tsx
import styles from './style.module.scss';
import { CSSProperties } from 'react';

interface SpinnerProps {
	isVisible?: boolean;
}

export function Spinner({ isVisible = true }: SpinnerProps) {
	const spinnerStyle: CSSProperties = {
		opacity: isVisible ? 1 : 0,
		transition: 'opacity 300ms ease-in-out',
	};

	return (
		<div className={styles.wrapper} style={spinnerStyle}>
			<div className={styles.container}>
				<div className={styles.loaderContainer}>
					<span className={styles.loader}></span>
				</div>
			</div>
		</div>
	);
}
