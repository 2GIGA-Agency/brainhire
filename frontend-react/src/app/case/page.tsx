import { CaseStudies } from '@/components/sections/main/Cases/';
import styles from './style.module.scss';

export const metadata = {
	title: 'Кейсы | BRaiN HR',
	description:
		'Практические кейсы внедрения ИИ в HR от BRaiN HR. Изучите реальные примеры автоматизации рекрутинга и посмотрите, каких результатов добились наши клиенты.',
	alternates: {
		canonical: `https://brainhire.ru/case`,
	},
};

// 1. Определяем тип пропсов для CasePage, чтобы он мог принять searchParams
interface CasePageProps {
	searchParams: {
		category?: string;
	};
}

// 2. Указываем, что CasePage принимает searchParams в качестве пропса
export default function CasePage({ searchParams }: CasePageProps) {
	return (
		<div className={styles.wrapper}>
			{/* 3. Передаем полученные searchParams дальше в компонент CaseStudies */}
			<CaseStudies searchParams={searchParams} />
		</div>
	);
}
