import { Accordion, Box, Text } from '@chakra-ui/react';
import { BehaviorAnalyzeData } from './types/types';

export const BehaviorAnalysis: React.FC<BehaviorAnalyzeData> = ({
	non_verbal_analysis,
	communication_skills,
	psychological_profile,
	summary_and_recommendations,
}) => {
	const sections = [
		{
			title: 'Психологический профиль',
			content: [
				{
					label: 'Интроверсия/экстраверсия',
					text: psychological_profile.introversion_extroversion,
				},
				{ label: 'Уверенность', text: psychological_profile.confidence },
				{ label: 'Потенциал конфликтности', text: psychological_profile.conflict_potential },
				{ label: 'Эмоциональная стабильность', text: psychological_profile.emotional_stability },
				{ label: 'Реакция на стресс', text: psychological_profile.stress_reaction },
				{ label: 'Стиль мышления', text: psychological_profile.thinking_style },
				{ label: 'Стиль общения', text: psychological_profile.communication_style },
			],
		},
		{
			title: 'Коммуникативные навыки',
			content: [
				{
					label: 'Ясность, структура и логичность речи',
					text: communication_skills.clarity_structure_logic,
				},
				{ label: 'Убедительность', text: communication_skills.persuasiveness },
				{
					label: 'Словарный запас и проф. лексика',
					text: communication_skills.vocabulary_lexicon_relevance,
				},
				{
					label: 'Естественность речи и возможность подсказок',
					text: communication_skills.naturalness_potential_prompts,
				},
			],
		},
		{
			title: 'Невербальный анализ',
			content: [
				{ label: 'Мимика', text: non_verbal_analysis.mimicry },
				{
					label: 'Другие значимые невербальные сигналы',
					text: non_verbal_analysis.other_significant_signals,
				},
			],
		},
		{
			title: 'Итоговый анализ и рекомендации',
			content: [
				{
					label: 'Общая оценка ключевых параметров',
					text: summary_and_recommendations.overall_summary_by_key_parameters,
				},
				{ label: 'Рекомендации', text: summary_and_recommendations.recommendation },
				{
					label: 'Следующие шаги',
					text: (
						<ul style={{ paddingLeft: '20px', marginTop: '5px' }}>
							{summary_and_recommendations.next_steps_focus.map((step, idx) => (
								<li key={idx}>
									{'• '}
									{step}
								</li>
							))}
						</ul>
					),
				},
			],
		},
	];

	return (
		<Accordion.Root multiple variant="outline">
			{sections.map((item, index) => (
				<Accordion.Item key={index} value={item.title} mb={2} pt={2} pb={2}>
					<Accordion.ItemTrigger>
						<Text textStyle="lg">{item.title}</Text>
						<Accordion.ItemIndicator />
					</Accordion.ItemTrigger>
					<Accordion.ItemContent>
						<Accordion.ItemBody>
							<Box as="ul" listStyleType="circle">
								{item.content.map((content) => (
									<li key={content.label} style={{ marginBottom: '4px' }}>
										<strong>{content.label}:</strong> {content.text}
									</li>
								))}
							</Box>
						</Accordion.ItemBody>
					</Accordion.ItemContent>
				</Accordion.Item>
			))}
		</Accordion.Root>
	);
};
