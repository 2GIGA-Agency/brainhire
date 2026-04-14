import { memo } from 'react';
import { Box, Tabs, Tag } from '@chakra-ui/react';
import { formatNumber } from '@/utils/formatNumber';
import styles from './style.module.scss';
import { TableTab } from './types';

interface CandidatesTableTabsProps {
	activeTableTab: TableTab;
	counters: {
		all?: number;
		awaiting?: number;
		reject?: number;
		invitation?: number;
		average_answers_rating?: number;
		crash?: number;
	};
	isActionsActive: boolean;
	onTabChange: (tab: TableTab) => void;
}

const TAB_CONFIGS = [
	{
		value: 'all' as TableTab,
		label: 'Все кандидаты',
		colorPalette: 'blue' as const,
		bgColor: 'rgba(66, 153, 225, 1)',
		counterKey: 'all' as const,
	},
	{
		value: 'awaiting' as TableTab,
		label: 'Ожидают разбора',
		colorPalette: 'cyan' as const,
		bgColor: 'rgba(11, 197, 234, 1)',
		counterKey: 'awaiting' as const,
	},
	{
		value: 'reject' as TableTab,
		label: 'Отказ',
		colorPalette: 'red' as const,
		bgColor: 'rgba(245, 101, 101, 1)',
		counterKey: 'reject' as const,
	},
	{
		value: 'invitation' as TableTab,
		label: 'Прошедшие скоринг',
		colorPalette: 'yellow' as const,
		bgColor: 'rgba(236, 201, 75, 1)',
		textColor: 'white',
		counterKey: 'invitation' as const,
	},
	{
		value: 'scoring' as TableTab,
		label: 'С оценкой интервью',
		colorPalette: 'teal' as const,
		bgColor: 'rgba(56, 178, 172, 1)',
		counterKey: 'average_answers_rating' as const,
	},
	{
		value: 'crash' as TableTab,
		label: 'Неполное интервью',
		colorPalette: 'orange' as const,
		bgColor: 'rgba(237, 137, 54, 1)',
		counterKey: 'crash' as const,
	},
];

const CandidatesTableTabsComponent = ({
	activeTableTab,
	onTabChange,
	counters,
	isActionsActive,
}: CandidatesTableTabsProps) => {
	const handleTabChange = (value: string) => {
		if (isActionsActive) return;
		onTabChange(value as TableTab);
	};

	return (
		<Box className={styles.tabsScrollContainer}>
			<Tabs.Root
				value={activeTableTab}
				mb={6}
				onValueChange={(e) => handleTabChange(e.value)}
				variant="plain"
			>
				<Tabs.List>
					{TAB_CONFIGS.map((tab) => {
						const isDisabled = isActionsActive && activeTableTab !== tab.value;

						return (
							<Tabs.Trigger
								key={tab.value}
								value={tab.value}
								borderRadius="0"
								borderBottom="2px solid rgba(226, 232, 240, 1)"
								_selected={{
									color: '#4299E1',
									border: 'none',
									borderBottom: '2px solid #4299E1',
								}}
								disabled={isDisabled}
								style={isDisabled ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
							>
								{tab.label}{' '}
								<Tag.Root
									colorPalette={tab.colorPalette}
									variant="solid"
									bg={tab.bgColor}
									color={tab.textColor}
								>
									<Tag.Label className={styles.tagLabel}>
										{formatNumber(counters[tab.counterKey])}
									</Tag.Label>
								</Tag.Root>
							</Tabs.Trigger>
						);
					})}
				</Tabs.List>
			</Tabs.Root>
		</Box>
	);
};

export const CandidatesTableTabs = memo(CandidatesTableTabsComponent, (prevProps, nextProps) => {
	// Мемоизация: обновляем компонент только если изменились релевантные пропсы
	return (
		prevProps.activeTableTab === nextProps.activeTableTab &&
		prevProps.isActionsActive === nextProps.isActionsActive &&
		prevProps.counters.all === nextProps.counters.all &&
		prevProps.counters.awaiting === nextProps.counters.awaiting &&
		prevProps.counters.reject === nextProps.counters.reject &&
		prevProps.counters.invitation === nextProps.counters.invitation &&
		prevProps.counters.average_answers_rating === nextProps.counters.average_answers_rating &&
		prevProps.counters.crash === nextProps.counters.crash
	);
});
