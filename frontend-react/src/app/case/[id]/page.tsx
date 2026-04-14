import { CaseStudy } from '@/components/sections/main';
import { caseStudiesData } from '../mockData';
import { Metadata } from 'next';
import CaseWebPageSchema from '@/components/shared/Schemas/CaseWebPageSchema';
import CaseBreadcrumbsSchema from '@/components/shared/Schemas/CaseBreadCrumbsSchema';
import WebSiteSchema from '@/components/shared/Schemas/WebSiteSchema';
import ProductSchema from '@/components/shared/Schemas/ProductSchema';

interface Props {
	params: { id: number };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = await params;

	// Находим нужный кейс в mock-данных. Используем parseInt, чтобы сравнить число с числом.
	const study = caseStudiesData.find((item) => item.id == id);

	// Если кейс не найден, возвращаем метаданные для страницы ошибки
	if (!study) {
		return {
			title: 'Кейс не найден | BRaiN HR',
			description: 'Запрошенный для просмотра кейс не был найден.',
		};
	}

	// Формируем канонический URL
	const canonicalUrl = `https://brainhire.ru/case/${id}`;

	// Возвращаем метаданные на основе найденного кейса
	return {
		title: `${study.title} | Кейс BRaiN HR`,
		description: study.description, // Используем краткое описание кейса
		alternates: {
			canonical: canonicalUrl,
		},
	};
}

export default async function CaseStudyPage({ params }: Props) {
	const { id } = await params;

	const study = caseStudiesData.find((i) => i.id == id);

	return (
		<>
			{study ? (
				<>
					<WebSiteSchema />
					<ProductSchema />
					<CaseWebPageSchema study={study} />
					<CaseBreadcrumbsSchema id={study.id} title={study.title} />
					<CaseStudy study={study} allCases={caseStudiesData} />
				</>
			) : (
				'Ошибка отображения кейсов, попробуйте позже'
			)}
		</>
	);
}
