import { Box, Flex, Tag, Text, Link } from '@chakra-ui/react';
import hh_vacancy_field_reference from '@/hh_vacancy_field_reference.json';
import React from 'react';
import { EllipsisTextWithTooltip } from '@/components/shared/EllipsisTextWithTooltip';

interface VacancyData {
	/** Название компании */
	companyName: string;
	/** Дата и время создания (может отсутствовать) */
	createdAt?: string;
	/** Название вакансии */
	vacancyTitle: string;
	/** Уровень должности (например, "Специалист") */
	positionLevel: string;
	/** Тип занятости (например, "Полная занятость" или "Проектная работа") */
	employmentType: string;
	/** Формат работы (например, "Гибрид", "Офис", "Удалённо") */
	format?: string;
	/** График работы (например, "5/2") */
	schedule?: string;
	/** Уровень зарплаты, строка (например, "80 000 - 100 000") */
	salary: string;
	/** Опыт работы (например, "Более 6 лет" или "От 1 года до 3 лет") */
	experience: string;
	/** Регионы показа вакансии (например, ["Россия", "Беларусь"]) */
	// regions: string[];
	regions: string[] | null;
	/** Навыки (например, ["SEO", "Аналитика", "SMM"]) */
	skills: string[];
	/** Группы выборочных навыков */
	selectableSkills?: { minCount: number; skills: string[] }[];
	/** Фильтр по компаниям */
	companyFilter?: {
		whitelist: string[];
		blacklist: string[];
	};
	/** Презентация компании */
	pdf: string | null;
	video_url: string | null;
}

export interface VacancyCardProps {
	/** Данные о конкретной вакансии */
	data: VacancyData;
	/** Режим отображения: 'preview' (краткий) или 'view' (полный) */
	variant: 'preview' | 'view';
}

/**
 * Универсальная компонента для отображения данных о вакансии.
 * В зависимости от prop variant рисует краткое представление (preview)
 * или полное представление (view) с использованием flex-контейнеров.
 */
export const VacancyInfo: React.FC<VacancyCardProps> = ({ data, variant }) => {
	// Рендер для preview-режима (краткий вариант)
	const renderPreview = () => (
		<Box borderRadius="md" mt={6}>
			<Flex mb={4}>
				<Text color="gray.500" textStyle="sm" fontWeight={500} width="50%">
					Название компании
				</Text>
				<Text color="gray.800" textStyle="sm" fontWeight={500}>
					{data.companyName}
				</Text>
			</Flex>
			<Flex mb={4}>
				<Text color="gray.500" textStyle="sm" fontWeight={500} width="50%" flexShrink={0}>
					Название вакансии
				</Text>
				<Text color="gray.800" textStyle="sm" fontWeight={500}>
					{data.vacancyTitle}
				</Text>
			</Flex>
			<Flex mb={4}>
				<Text color="gray.500" textStyle="sm" fontWeight={500} width="50%">
					Уровень должности
				</Text>
				<Text color="gray.800" textStyle="sm" fontWeight={500}>
					{hh_vacancy_field_reference.level_candidate.find((i) => i.id == data.positionLevel)?.name}
				</Text>
			</Flex>
			<Flex mb={4}>
				<Text color="gray.500" textStyle="sm" fontWeight={500} width="50%">
					Тип занятости
				</Text>
				<Text color="gray.800" textStyle="sm" fontWeight={500}>
					{data.employmentType}
				</Text>
			</Flex>
			<Flex mb={4}>
				<Text color="gray.500" textStyle="sm" fontWeight={500} width="50%">
					Зарплата
				</Text>
				<Text color="gray.800" textStyle="sm" fontWeight={500}>
					{data.salary}
				</Text>
			</Flex>
			<Flex mb={4}>
				<Text color="gray.500" textStyle="sm" fontWeight={500} width="50%">
					Опыт работы
				</Text>
				<Text color="gray.800" textStyle="sm" fontWeight={500}>
					{data.experience}
				</Text>
			</Flex>
			<Flex mb={4}>
				<Text color="gray.500" textStyle="sm" fontWeight={500} width="50%">
					Регионы показа вакансии
				</Text>
				<Text color="gray.800" textStyle="sm" fontWeight={500}>
					{data.regions ? data.regions[0] : 'Не указано'}
				</Text>
			</Flex>

			{(data.skills?.length || 0) > 0 || (data.selectableSkills?.length || 0) > 0 ? (
				<Flex mb={4}>
					<Text color="gray.500" textStyle="sm" fontWeight={500} mb={2} width="50%" flexShrink={0}>
						Навыки:
					</Text>
					<Flex gap="2" wrap="wrap">
						{data.skills?.map((skill, i) => (
							<Tag.Root
								key={`skill-${i}`}
								colorPalette="blue"
								size="sm"
								maxW="260px"
								overflow="hidden"
							>
								<Tag.Label>
									<EllipsisTextWithTooltip text={skill} maxW="200px" />
								</Tag.Label>
							</Tag.Root>
						))}

						{data.selectableSkills?.map((group, index) => (
							<Tag.Root
								key={`group-${index}`}
								colorPalette="blue"
								size="sm"
								maxW="320px"
								overflow="hidden"
							>
								<Tag.Label>
									<EllipsisTextWithTooltip
										text={`${group.minCount} из ${group.skills.join(', ')}`}
										maxW="260px"
									/>
								</Tag.Label>
							</Tag.Root>
						))}
					</Flex>
				</Flex>
			) : null}

			{(data.companyFilter?.whitelist?.length || 0) > 0 ||
			(data.companyFilter?.blacklist?.length || 0) > 0 ? (
				<Flex mb={4}>
					<Text color="gray.500" textStyle="sm" fontWeight={500} mb={2} width="50%" flexShrink={0}>
						Фильтр по компаниям:
					</Text>
					<Box>
						{(data.companyFilter?.whitelist?.length || 0) > 0 && (
							<Box mb={2}>
								<Text color="gray.600" textStyle="sm" fontWeight={500} mb={1}>
									Обязательные компании (whitelist):
								</Text>
								<Flex gap="2" wrap="wrap">
									{data.companyFilter?.whitelist.map((name, index) => (
										<Tag.Root
											key={`wl-${index}`}
											colorPalette="blue"
											size="sm"
											maxW="260px"
											overflow="hidden"
										>
											<Tag.Label>
												<EllipsisTextWithTooltip text={name} maxW="200px" />
											</Tag.Label>
										</Tag.Root>
									))}
								</Flex>
							</Box>
						)}

						{(data.companyFilter?.blacklist?.length || 0) > 0 && (
							<Box>
								<Text color="gray.600" textStyle="sm" fontWeight={500} mb={1}>
									Исключающие компании (blacklist):
								</Text>
								<Flex gap="2" wrap="wrap">
									{data.companyFilter?.blacklist.map((name, index) => (
										<Tag.Root
											key={`bl-${index}`}
											colorPalette="red"
											size="sm"
											maxW="260px"
											overflow="hidden"
										>
											<Tag.Label>
												<EllipsisTextWithTooltip text={name} maxW="200px" />
											</Tag.Label>
										</Tag.Root>
									))}
								</Flex>
							</Box>
						)}
					</Box>
				</Flex>
			) : null}
		</Box>
	);

	// Рендер для полного отображения с использованием flex-контейнеров
	const renderView = () => (
		<Box borderRadius="md" mt={6}>
			<Flex mb={4}>
				<Text color="gray.500" textStyle="sm" fontWeight={500} width="50%">
					Название компании
				</Text>
				<Text color="gray.800" textStyle="sm" fontWeight={500}>
					{data.companyName}
				</Text>
			</Flex>
			<Flex mb={4}>
				<Text color="gray.500" textStyle="sm" fontWeight={500} width="50%">
					Дата и время создания
				</Text>
				<Text color="gray.800" textStyle="sm" fontWeight={500}>
					{data.createdAt}
				</Text>
			</Flex>
			<Flex mb={4}>
				<Text color="gray.500" textStyle="sm" fontWeight={500} width="50%" flexShrink={0}>
					Название вакансии
				</Text>
				<Text color="gray.800" textStyle="sm" fontWeight={500}>
					{data.vacancyTitle}
				</Text>
			</Flex>
			<Flex mb={4}>
				<Text color="gray.500" textStyle="sm" fontWeight={500} width="50%">
					Уровень должности
				</Text>
				<Text color="gray.800" textStyle="sm" fontWeight={500}>
					{hh_vacancy_field_reference.level_candidate.find((i) => i.id == data.positionLevel)?.name}
				</Text>
			</Flex>
			<Flex mb={4}>
				<Text color="gray.500" textStyle="sm" fontWeight={500} width="50%">
					Тип занятости
				</Text>
				<Text color="gray.800" textStyle="sm" fontWeight={500}>
					{data.employmentType}
				</Text>
			</Flex>
			<Flex mb={4}>
				<Text color="gray.500" textStyle="sm" fontWeight={500} width="50%">
					Зарплата
				</Text>
				<Text color="gray.800" textStyle="sm" fontWeight={500}>
					{data.salary}
				</Text>
			</Flex>
			<Flex mb={4}>
				<Text color="gray.500" textStyle="sm" fontWeight={500} width="50%">
					Опыт работы
				</Text>
				<Text color="gray.800" textStyle="sm" fontWeight={500}>
					{data.experience}
				</Text>
			</Flex>
			<Flex mb={4}>
				<Text color="gray.500" textStyle="sm" fontWeight={500} width="50%">
					Регионы показа вакансии
				</Text>
				<Text color="gray.800" textStyle="sm" fontWeight={500}>
					{data.regions ? data.regions[0] : 'Не указано'}
				</Text>
			</Flex>

			{(data.pdf || data.video_url) && (
				<Flex mb={4}>
					<Text color="gray.500" textStyle="sm" fontWeight={500} width="50%">
						Презентация вакансии
					</Text>
					{data.pdf && (
						<Link
							color="blue.600"
							fontSize={12}
							fontWeight={500}
							href={data.pdf}
							target="_blank"
							rel="noopener noreferrer"
							mr={2}
						>
							Pdf-презентация
						</Link>
					)}
					{data.video_url && (
						<Link
							color="blue.600"
							fontSize={12}
							fontWeight={500}
							href={data.video_url || '#'}
							target="_blank"
							rel="noopener noreferrer"
							onKeyDown={(e) => {
								if (e.key === ' ') {
									e.preventDefault();
									window.open(data.video_url || '', '_blank');
								}
							}}
						>
							Видео-презентация
						</Link>
					)}
				</Flex>
			)}

			{(data.skills?.length || 0) > 0 || (data.selectableSkills?.length || 0) > 0 ? (
				<Flex mb={4}>
					<Text color="gray.500" textStyle="sm" fontWeight={500} mb={2} width="50%" flexShrink={0}>
						Навыки:
					</Text>
					<Flex gap="2" wrap="wrap">
						{data.skills?.map((skill, i) => (
							<Tag.Root
								key={`skill-${i}`}
								colorPalette="blue"
								size="sm"
								maxW="260px"
								overflow="hidden"
							>
								<Tag.Label>
									<EllipsisTextWithTooltip text={skill} maxW="200px" />
								</Tag.Label>
							</Tag.Root>
						))}

						{data.selectableSkills?.map((group, index) => (
							<Tag.Root
								key={`group-${index}`}
								colorPalette="blue"
								size="sm"
								maxW="320px"
								overflow="hidden"
							>
								<Tag.Label>
									<EllipsisTextWithTooltip
										text={`${group.minCount} из ${group.skills.join(', ')}`}
										maxW="260px"
									/>
								</Tag.Label>
							</Tag.Root>
						))}
					</Flex>
				</Flex>
			) : null}

			{(data.companyFilter?.whitelist?.length || 0) > 0 ||
			(data.companyFilter?.blacklist?.length || 0) > 0 ? (
				<Flex mb={4}>
					<Text color="gray.500" textStyle="sm" fontWeight={500} mb={2} width="50%" flexShrink={0}>
						Фильтр по компаниям:
					</Text>
					<Box>
						{(data.companyFilter?.whitelist?.length || 0) > 0 && (
							<Box mb={2}>
								<Text color="gray.600" textStyle="sm" fontWeight={500} mb={1}>
									Обязательные компании (whitelist):
								</Text>
								<Flex gap="2" wrap="wrap">
									{data.companyFilter?.whitelist.map((name, index) => (
										<Tag.Root
											key={`wl-${index}`}
											colorPalette="blue"
											size="sm"
											maxW="260px"
											overflow="hidden"
										>
											<Tag.Label>
												<EllipsisTextWithTooltip text={name} maxW="200px" />
											</Tag.Label>
										</Tag.Root>
									))}
								</Flex>
							</Box>
						)}

						{(data.companyFilter?.blacklist?.length || 0) > 0 && (
							<Box>
								<Text color="gray.600" textStyle="sm" fontWeight={500} mb={1}>
									Исключающие компании (blacklist):
								</Text>
								<Flex gap="2" wrap="wrap">
									{data.companyFilter?.blacklist.map((name, index) => (
										<Tag.Root
											key={`bl-${index}`}
											colorPalette="red"
											size="sm"
											maxW="260px"
											overflow="hidden"
										>
											<Tag.Label>
												<EllipsisTextWithTooltip text={name} maxW="200px" />
											</Tag.Label>
										</Tag.Root>
									))}
								</Flex>
							</Box>
						)}
					</Box>
				</Flex>
			) : null}
		</Box>
	);

	// Выбираем нужный рендер по variant
	return variant === 'preview' ? renderPreview() : renderView();
};
