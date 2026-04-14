import { FeatureBlock } from '@/components/ui-kit/FeatureBlock';
import { Typography } from '@/components/ui-kit/Typography';
import styles from './FeatureListSection.module.scss';

// --- Типы ---

// Тип для одного элемента в списке преимуществ
export type Feature = {
	title: string | React.ReactNode;
	description: string | React.ReactNode;
	image: string;
	reverse?: boolean; // опциональное свойство
};

// Тип для пропсов самого компонента
type FeatureListSectionProps = {
	/** Основной заголовок секции */
	title?: string;
	/** Массив с данными о преимуществах */
	features: Feature[];
	/** Опциональный текст-примечание внизу секции */
	footnote?: string;
};

// --- Компонент ---

export const FeatureListSection = ({ title = '', features, footnote }: FeatureListSectionProps) => {
	return (
		<section className={styles.features} id="solutions">
			<div className={styles.container}>
				{/* Используем title из пропсов */}
				{title && (
					<Typography variant="h2" className={styles.heading}>
						{title}
					</Typography>
				)}

				{/* Рендерим список преимуществ */}
				{features.map((feature, index) => (
					<FeatureBlock key={index} {...feature} />
				))}

				{/* Рендерим примечание, только если оно было передано */}
				{footnote && (
					<Typography variant="body-sm" color="text-secondary" className={styles.footnote}>
						{footnote}
					</Typography>
				)}
			</div>
		</section>
	);
};
