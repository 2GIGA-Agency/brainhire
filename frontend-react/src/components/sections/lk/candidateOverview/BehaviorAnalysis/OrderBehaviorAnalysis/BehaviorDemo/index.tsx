import { CloseButton, Dialog, Flex, Portal } from '@chakra-ui/react';
import { BehaviorAnalysis } from '../..';
import { LkButton } from '@/components/shared/LkButton';
import { COLORS } from '@/constants/colors';
import { Typo } from '@/components/shared/Typo/Typo';

interface Props {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}

const templateData = {
	non_verbal_analysis: {
		mimicry:
			'Мимика сдержанная, конгруэнтная словам. Эмоции выражены слабо. Нет явных мимических признаков стресса.',
		other_significant_signals:
			'Зрительный контакт в основном устойчивый (с камерой). Зафиксированы редкие короткие взгляды в сторону и касания уха/шеи (возможно, при обдумывании).',
	},
	communication_skills: {
		persuasiveness: 'Убедителен за счет фактов и технических знаний',
		clarity_structure_logic:
			'Речь ясная, структурированная, логичная в рамках технических объяснений',
		vocabulary_lexicon_relevance:
			'Хороший словарный запас, адекватное использование проф. лексики Frontend React Developer (Middle+) (React hooks, TS utility types, FSD и т.д.)',
		naturalness_potential_prompts:
			'Речь преимущественно естественная, хотя и размеренная. Периодические короткие взгляды в сторону возможны, но явных признаков чтения нет.',
	},
	psychological_profile: {
		confidence: 'Уверенный в рамках обсуждаемых технических тем',
		thinking_style: 'Аналитическое, последовательное, ориентированное на технические детали',
		stress_reaction:
			'Спокойная, конструктивная. Демонстрирует сосредоточенность при ответах на технические вопросы.',
		conflict_potential: 'Признаков конфликтности не выявлено',
		communication_style: 'Сдержанный, технически-ориентированный, деловой',
		emotional_stability: 'Выглядит эмоционально стабильным, сохраняет спокойствие при ответах',
		introversion_extroversion: 'Склонен к Интроверсии',
	},
	summary_and_recommendations: {
		recommendation: 'Рассматривать дальше',
		next_steps_focus: [
			'Проверить глубину практических навыков через live-coding или тестовое задание (особенно по React, TypeScript, Redux).',
			'Оценить опыт работы в команде и взаимодействие с дизайнерами/бэкендом на следующем этапе.',
			'Уточнить опыт работы с Vue (указано в требованиях, но не обсуждалось в видео).',
			'Оценить культурное соответствие команде и ценностям ООО "НДК" (инновации, решение сложных задач).',
		],
		overall_summary_by_key_parameters:
			'Кандидат демонстрирует интровертный профиль, уверенность в технических знаниях (React, TS, оптимизация, FSD), эмоциональную стабильность и аналитический стиль мышления. Коммуникация сдержанная, технически-ориентированная, ясная и логичная. Невербальные сигналы соответствуют спокойному, сосредоточенному состоянию.',
	},
};

export function BehaviorDemo({ isOpen, setIsOpen }: Props) {
	return (
		<Dialog.Root
			lazyMount
			open={isOpen}
			onOpenChange={(e) => setIsOpen(e.open)}
			closeOnInteractOutside={false}
		>
			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.Header>
							<Flex w="100%" align="center" justify="space-between">
								<Dialog.Title fontSize="lg" fontWeight="bold">
									Пример поведенческого анализа
								</Dialog.Title>
								<CloseButton size="sm" onClick={() => setIsOpen(false)} />
							</Flex>
						</Dialog.Header>
						<Dialog.Body>
							<BehaviorAnalysis {...templateData} />
						</Dialog.Body>
						<Dialog.Footer>
							<Dialog.ActionTrigger asChild>
								<LkButton heightSize="regular" onClick={() => setIsOpen(false)}>
									<Typo color={COLORS.WHITE} weight="semibold">
										Закрыть
									</Typo>
								</LkButton>
							</Dialog.ActionTrigger>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
}
