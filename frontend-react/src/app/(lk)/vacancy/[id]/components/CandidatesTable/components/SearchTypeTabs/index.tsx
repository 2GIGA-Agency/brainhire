import React, { memo } from 'react';
import { Flex, Tabs } from '@chakra-ui/react';
import { Typo } from '@/components/shared/Typo/Typo';
import { Tip } from '@/components/shared/Tip';
import { COLORS } from '@/constants/colors';
import { useAppSelector } from '@/store/store';
import { selectIsTipsShow } from '@/store/slices/appSlice';

interface SearchTypeTabsProps {
	searchTab: 'incoming' | 'outbound';
	onSearchTabChange: (tab: 'incoming' | 'outbound') => void;
}

const SearchTypeTabsComponent = ({ searchTab, onSearchTabChange }: SearchTypeTabsProps) => {
	const isTipsShow = useAppSelector(selectIsTipsShow);

	const handleTabChange = (value: string) => {
		onSearchTabChange(value as 'incoming' | 'outbound');
	};

	return (
		<Tabs.Root
			value={searchTab}
			mb={6}
			mt={4}
			onValueChange={(e) => handleTabChange(e.value)}
			variant="plain"
			zIndex={1}
		>
			<Tabs.List>
				<Tabs.Trigger
					value="incoming"
					borderRadius="0"
					borderBottom="2px solid rgba(226, 232, 240, 1)"
					_selected={{ color: '#4299E1', border: 'none', borderBottom: '2px solid #4299E1' }}
				>
					Кандидаты с откликом на вакансию
				</Tabs.Trigger>
				<Tabs.Trigger
					value="outbound"
					borderRadius="0"
					borderBottom="2px solid rgba(226, 232, 240, 1)"
					_selected={{ color: '#4299E1', border: 'none', borderBottom: '2px solid #4299E1' }}
				>
					<Flex gap={2}>
						<Typo weight="medium" color="inherit">
							Холодный поиск по hh.ru
						</Typo>
						{isTipsShow && (
							<Tip
								questionIconSize={16}
								content={
									<>
										<Typo color={COLORS.GRAY_800} weight="medium">
											Холодный поиск - важная опция для активного поиска кандидатов. Заполните
											параметры и запустите холодный поиск...
										</Typo>
									</>
								}
							/>
						)}
					</Flex>
				</Tabs.Trigger>
			</Tabs.List>
		</Tabs.Root>
	);
};

export const SearchTypeTabs = memo(SearchTypeTabsComponent);
