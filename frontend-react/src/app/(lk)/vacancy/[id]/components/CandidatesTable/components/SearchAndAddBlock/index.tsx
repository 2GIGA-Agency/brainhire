import React, { memo } from 'react';
import { Flex, Tooltip as ChakraTooltip, useTooltip } from '@chakra-ui/react';
import Image from 'next/image';
import { HiOutlineQuestionMarkCircle } from 'react-icons/hi';
import { SearchInput } from '@/components/shared/SearchInput';
import { LkButton } from '@/components/shared/LkButton';
import { Typo } from '@/components/shared/Typo/Typo';
import { COLORS } from '@/constants/colors';
import styles from './style.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { selectIsTipsShow, toggleIsModalShow } from '@/store/slices/appSlice';

interface SearchAndAddBlockProps {
	onSearchChange: (value: string) => void;
	onAddCandidate: () => void;
}

const SearchAndAddBlockComponent = ({
	onSearchChange,
	onAddCandidate,
}: SearchAndAddBlockProps) => {
	const dispatch = useAppDispatch();
  const isTipsShow = useAppSelector(selectIsTipsShow);

	const handleMouseAddCandidateEnter = () => {
		dispatch(toggleIsModalShow());
		addCandidateTooltip.setOpen(true);
	};

	const handleMouseAddCandidateLeave = () => {
		dispatch(toggleIsModalShow());
		addCandidateTooltip.setOpen(false);
	};
	const addCandidateTooltip = useTooltip({ positioning: { placement: 'top' } });

	return (
		<Flex justify="space-between" className={styles.search} gap={4}>
			<SearchInput
				placeholder="Поиск по ФИО, городу, телефону"
				value=""
				onDebouncedChange={onSearchChange}
				debounceWait={500}
				maxWidth="572px"
			/>
			<Flex gap={2} alignItems="center">
				{isTipsShow && (
					<HiOutlineQuestionMarkCircle
						cursor="help"
						size={16}
						onMouseEnter={handleMouseAddCandidateEnter}
						onMouseLeave={handleMouseAddCandidateLeave}
					/>
				)}
				<ChakraTooltip.RootProvider value={addCandidateTooltip}>
					<ChakraTooltip.Trigger asChild>
						<LkButton onClick={onAddCandidate}>
							<Image src="/icons/add.svg" alt="Add Icon" width={14} height={14} />
							<Typo weight="semibold" color={COLORS.WHITE}>
								Добавить кандидата
							</Typo>
						</LkButton>
					</ChakraTooltip.Trigger>
					{isTipsShow && (
						<ChakraTooltip.Positioner>
							<ChakraTooltip.Content bg={COLORS.WHITE} p={3}>
								<ChakraTooltip.Arrow
									stroke={`${COLORS.WHITE} !important`}
									borderColor={`${COLORS.WHITE} !important`}
								>
									<ChakraTooltip.ArrowTip
										bg={`${COLORS.WHITE} !important`}
										borderColor={`${COLORS.WHITE} !important`}
									/>
								</ChakraTooltip.Arrow>
								<Typo weight="medium" color={COLORS.GRAY_800}>
									Вы можете вручную загружать резюме кандидатов в формате PDF...
								</Typo>
							</ChakraTooltip.Content>
						</ChakraTooltip.Positioner>
					)}
				</ChakraTooltip.RootProvider>
			</Flex>
		</Flex>
	);
};

export const SearchAndAddBlock = memo(SearchAndAddBlockComponent);
