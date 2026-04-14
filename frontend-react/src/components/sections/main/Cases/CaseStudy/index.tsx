// src/components/CaseStudy/CaseStudy.tsx

import React from 'react';
import {
	CaseItem,
	CaseKpiGrid,
	CaseResultsChart,
	CaseInfoBlock,
	CaseTestimonialBlock,
	RelatedCases,
} from '@/components/sections/main'; // Вы сказали, что предоставите этот тип
import styles from './style.module.scss';
import { Typography } from '@/components/ui-kit';

// Placeholder-иконки. В реальном проекте их лучше вынести или импортировать как SVG
const ProblemIcon = () => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.546-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
		/>
	</svg>
);
const SolutionIcon = () => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
		/>
	</svg>
);
const ResultsIcon = () => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
		/>
	</svg>
);

// Определяем тип для пропсов компонента
interface CaseStudyProps {
	study: CaseItem;
	allCases: CaseItem[];
}

export const CaseStudy: React.FC<CaseStudyProps> = ({ study, allCases }) => {
	const { title, author, readTime, details } = study;

	return (
		<>
			<div className={styles.container}>
				{/* --- Заголовок --- */}
				<Typography as="h1" variant="h1" className={styles.mainTitle}>
					{title}
				</Typography>

				{/* --- Блок с автором --- */}
				<div className={styles.authorBlock}>
					<div className={styles.authorInfo}>
						<Typography variant="body-lg" className={styles.authorName}>
							{author.name}
						</Typography>
						<Typography variant="body-md" className={styles.authorJobTitle}>
							{author.jobTitle}
						</Typography>
						<Typography variant="body-sm" color="grey-500" className={styles.readTime}>
							{readTime} мин время чтения
						</Typography>
					</div>
				</div>

				{/* --- Информационные блоки --- */}
				<div className={styles.infoBlocks}>
					<CaseInfoBlock
						title="В чем проблема?"
						intro={details.problem.intro}
						points={details.problem.points}
						backgroundColor="#FAE6FF"
						icon={<ProblemIcon />}
					/>
					<CaseInfoBlock
						title="Что было сделано?"
						intro={details.solution.intro}
						points={details.solution.points}
						backgroundColor="#E6F4FF"
						icon={<SolutionIcon />}
					/>
					<CaseInfoBlock
						title="Результаты и эффект от внедрений"
						intro={details.results.intro}
						points={details.results.points}
						backgroundColor="#E6FEFF"
						icon={<ResultsIcon />}
					/>
				</div>
				<CaseResultsChart metrics={details.results.chartsAndMetrics} />
				<CaseKpiGrid kpi={details.results.chartsAndMetrics.kpi} />
			</div>
			<CaseTestimonialBlock testimonial={details.testimonial} />
			<RelatedCases allCases={allCases} currentCaseId={study.id} />
		</>
	);
};
