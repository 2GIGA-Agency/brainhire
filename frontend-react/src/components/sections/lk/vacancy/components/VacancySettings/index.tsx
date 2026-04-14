import { Presentation } from './components/Presentation';
import { RadioChoice } from '@/components/shared/RadioChoice';
import { PatternButton } from '@/components/shared/ChangePatternModal';
import { useAppDispatch } from '@/store/store';
import { useEffect } from 'react';
import {
	fetchVacancyTemplates,
	selectChangePatterns,
	selectFeedback,
	selectReminder,
	setChangePattern,
	setFeedback,
	setReminder,
} from '@/store/slices/vacancyCreation/vacancySettings';
import { TemplateCategoryKey } from '@/store/slices/vacancyCreation/vacancySettings/types';

const choices = [
	{
		text: 'Обратная связь',
		tooltipText:
			'Большинству кандидатов нравится получать быструю обратную связь после собеседований...',
		selector: selectFeedback,
		actionCreator: setFeedback,
		patterns: [
			{
				title: `Обратная связь`,
				type: 'feedback' as TemplateCategoryKey,
				buttons: ['Name', 'link_feedback', 'HRName'] as PatternButton[],
			},
		],
	},
	{
		text: 'Напоминания об интервью',
		tooltipText: 'Напоминания отправляются через 24, 48 и 72 часа после приглашения...',
		selector: selectReminder,
		actionCreator: setReminder,
		patterns: [
			{
				title: `Напоминание о прохождении первичного собеседования`,
				type: 'reminder' as TemplateCategoryKey,
				buttons: ['Name', 'Vacancy', 'link_interview', 'link_drop', 'HRName'] as PatternButton[],
			},
		],
	},
	{
		text: 'Изменение шаблонов сообщений',
		tooltipText:
			'В данном разделе вы можете настроить внешний вид сообщений, которые отправляются кандидатам',
		selector: selectChangePatterns,
		actionCreator: setChangePattern,
		patterns: [
			{
				title: `Приветствие`,
				type: 'greeting' as TemplateCategoryKey,
				buttons: ['Name', 'HRName'] as PatternButton[],
			},
			{
				title: `Отказ`,
				type: 'reject' as TemplateCategoryKey,
				buttons: ['Name', 'HRName'] as PatternButton[],
			},
			{
				title: `Приглашение на интервью (отклик)`,
				type: 'invite' as TemplateCategoryKey,
				buttons: ['Name', 'link_interview', 'HRName'] as PatternButton[],
			},
			{
				title: `Приглашение на интервью (исходящий поиск)`,
				type: 'outbound' as TemplateCategoryKey,
				buttons: ['Name', 'link_interview', 'HRName'] as PatternButton[],
			},
			{
				title: `Отказ при дубликате`,
				type: 'reject_duplicate' as TemplateCategoryKey,
				buttons: ['Name', 'Vacancy', 'email', 'HRName'] as PatternButton[],
			},
		],
	},
];

interface Props {
	isEdit: boolean; // Флаг нужен для следующего кейса: при создании, когда есть кастомные шаблоны, выбранным должен быть последний созданный выбранный шаблон
}

export function VacancySettings({ isEdit }: Props) {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchVacancyTemplates({ isEdit }));
	}, [dispatch, isEdit]);

	return (
		<>
			<Presentation />
			{/* Просто рендерим компоненты на основе конфигурации выше */}
			{choices.map((choice, idx) => (
				<RadioChoice
					key={idx}
					text={choice.text}
					tooltipText={choice.tooltipText}
					selector={choice.selector}
					actionCreator={choice.actionCreator}
					patterns={choice.patterns}
				/>
			))}
		</>
	);
}
