import { GeneralScoring } from '@/app/(lk)/vacancy/[id]/[candidateId]/types/types';
import { Block } from '@/components/shared/Block';
import { ScoringItem } from '@/components/shared/ScoringItem';
import { ScoreItem } from '@/components/shared/ScoringItem/types/types';
import { Typo } from '@/components/shared/Typo/Typo';
import { COLORS } from '@/constants/colors';
import { Accordion, Box, Button, Flex, List, Tag } from '@chakra-ui/react';
import { useState } from 'react';
import { getChatBotScore } from '@/utils/chat_bot_score';

interface Props {
	results: (ScoreItem | undefined)[];
	general_scoring?: GeneralScoring;
	isPublic?: boolean; // Флаг, который указывает на то, что компонент находится на публичной странице
	candidateFirstName?: string;
	candidateLastName?: string;
}

export function ResultsDetalization({
	results,
	general_scoring,
	isPublic,
	candidateFirstName,
	candidateLastName,
}: Props) {
	const [isOpen, setOpenedFlag] = useState(false);
	const softSkills = (general_scoring?.skills_summary.soft_skills ?? []).length > 0;
	const hardSkills = (general_scoring?.skills_summary.hard_skills ?? []).length > 0;

	return (
		<Block>
			{isPublic && (
				<Typo size="16px" weight="medium" color={COLORS.GRAY_800} flexShrink={0} mb={4}>
					{candidateLastName} {candidateFirstName}
				</Typo>
			)}
			<Typo weight="medium" color={COLORS.GRAY_800}>
				Детализация результата:
			</Typo>
			<Flex display="inline-flex" mt="16px" row-gap="24px" direction="column" gap="8px">
				{results.map((i, idx) => {
					if (!i) return null;
					if (i.text === 'Чат-интервью') {
						const candidateChatBotStatus = getChatBotScore(i.score || 0);
						return (
							<Flex 
								key={idx} 
								justifyContent="space-between" 
								alignItems="center" 
								width="100%"
							>
								<Typo mr={2} weight="medium">{i.text}</Typo>
								<Tag.Root color="white" bg={candidateChatBotStatus.bg} size="lg">
									<Tag.Label>{candidateChatBotStatus.title}</Tag.Label>
								</Tag.Root>
							</Flex>
						);
					}

					// Стандартный вывод для всех остальных метрик
					return <ScoringItem key={idx} {...i} />;
				})}
			</Flex>
			{/* Сюда нужен промпт */}
			{general_scoring && (
				<>
					<Typo color={COLORS.GRAY_800} weight="medium" mt="24px">
						Пояснение:
					</Typo>
					<Typo mt="16px">{general_scoring.final_comment}</Typo>
					<Accordion.Root
						variant="plain"
						collapsible
						onValueChange={() => setOpenedFlag((prev) => !prev)}
					>
						<Accordion.Item value="Open">
							<Accordion.ItemTrigger cursor={'pointer'} width={'auto'}>
								<Button variant="plain" padding={0}>
									{isOpen ? 'Скрыть' : 'Показать больше'}
								</Button>
								<Accordion.ItemIndicator />
							</Accordion.ItemTrigger>
							<Accordion.ItemContent>
								<Typo color={COLORS.GRAY_800} weight="medium" mt="24px">
									Сильные стороны:
								</Typo>
								<Flex justifyContent="end">
									<List.Root width="95%">
										{general_scoring.strong_points.map((item) => (
											<List.Item fontSize={14} key={item}>
												{item}
											</List.Item>
										))}
									</List.Root>
								</Flex>
								<Typo color={COLORS.GRAY_800} weight="medium" mt="24px">
									Области для роста:
								</Typo>
								<Flex justifyContent="end">
									<List.Root width="95%">
										{general_scoring.areas_for_development.map((item) => (
											<List.Item fontSize={14} key={item}>
												{item}
											</List.Item>
										))}
									</List.Root>
								</Flex>
								<Typo color={COLORS.GRAY_800} weight="medium" mt="24px">
									Навыки, выявленные во время интервью
								</Typo>
								<Flex gap={12}>
									{hardSkills && (
										<Box>
											<Typo color={COLORS.GRAY_800} weight="medium" mt="24px">
												Профессиональные навыки:
											</Typo>
											<Flex justifyContent="end">
												<List.Root width="90%">
													{general_scoring.skills_summary.hard_skills.map((item) => (
														<List.Item fontSize={14} key={item}>
															{item}
														</List.Item>
													))}
												</List.Root>
											</Flex>
										</Box>
									)}
									{softSkills && (
										<Box>
											<Typo color={COLORS.GRAY_800} weight="medium" mt="24px">
												Гибкие навыки:
											</Typo>
											<Flex justifyContent="end">
												<List.Root width="90%">
													{general_scoring.skills_summary.soft_skills.map((item) => (
														<List.Item fontSize={14} key={item}>
															{item}
														</List.Item>
													))}
												</List.Root>
											</Flex>
										</Box>
									)}
								</Flex>
							</Accordion.ItemContent>
							<Accordion.ItemBody></Accordion.ItemBody>
						</Accordion.Item>
					</Accordion.Root>
				</>
			)}
		</Block>
	);
}
