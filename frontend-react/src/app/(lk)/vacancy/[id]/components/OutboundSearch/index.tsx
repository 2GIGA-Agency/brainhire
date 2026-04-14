import { Block } from '@/components/shared/Block';
import { Box, Flex } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
	selectOutboundSearchSettings,
	setCandidatesCount,
	setAgeFrom,
	setAgeTo,
	setGender,
	setRelocation,
	setDriverLicenseType,
	setEducationLevels,
	setEmployment,
	// setSpecialization,
	// setCitizenship,
	// setWorkTicket,
	addLanguagePair,
	removeLanguagePair,
	updateLanguagePair,
	setJobSearchStatus,
	setSchedule,
	setExperience,
	setAreas,
	setKeywords,
	resetOutboundSearch,
  	loadOutboundSearchData,
} from '@/store/slices/outboundSearch';
import { SettingInputElement, SettingInputItem } from '@/components/shared/SettingInputElement';
import styles from './style.module.scss';
import { COLORS } from '@/constants/colors';
import { sendOutboundSearch } from '@/store/thunks/outboundSearch';
import { outboundSearchInitialState } from '@/store/slices/outboundSearch';
import { toaster } from '@/components/ui/toaster';
import { useParams } from 'next/navigation';
import { useState, useEffect, useRef, useMemo } from 'react';
import axios from 'axios';
import { LkButton } from '@/components/shared/LkButton';
import { Typo } from '@/components/shared/Typo/Typo';
import { debounce } from '@/utils/debounce';

const searchSettingsInputs: SettingInputItem[] = [
	{
		label: 'Поиск по резюме',
		type: 'multiSelectInputWithSuggestions',
		placeholder: 'ключевые слова для поиска по резюме',
		stateKey: 'keywords',
		action: setKeywords,
		style: {
			gridColumn: '1 / 3', // Занимает все колонки
		},
	},
	{
		label: 'Регионы',
		type: 'inputWithSelect',
		placeholder: 'регионы для поиска',
		stateKey: 'areas',
		action: setAreas,
		style: {
			gridColumn: '3 / 4', // Занимает все колонки
		},
	},

	{
		label: 'Количество кандидатов',
		type: 'number',
		required: true,
		placeholder: 'кол-во',
		stateKey: 'candidatesCount',
		action: setCandidatesCount,
	},
	{
		label: 'Возраст от',
		type: 'number',
		placeholder: 'возраст от',
		stateKey: 'ageFrom',
		action: setAgeFrom,
	},
	{
		label: 'Возраст до',
		type: 'number',
		placeholder: 'возраст до',
		stateKey: 'ageTo',
		action: setAgeTo,
	},
	{
		label: 'Пол',
		type: 'select',

		placeholder: 'пол',
		stateKey: 'gender',
		action: setGender,
		collectionKey: 'genderCollection',
	},
	{
		label: 'Готовность к переезду',
		type: 'select',

		placeholder: 'готовность к переезду',
		stateKey: 'relocation',
		action: setRelocation,
		collectionKey: 'relocationCollection',
	},
	{
		label: 'Водительские права',
		type: 'multiselect',

		placeholder: 'категорию',
		stateKey: 'driverLicenseType',
		action: setDriverLicenseType,
		collectionKey: 'driverLicenseTypeCollection',
	},
	{
		label: 'Образование',
		type: 'multiselect',

		placeholder: 'уровень образования',
		stateKey: 'educationLevels',
		action: setEducationLevels,
		collectionKey: 'educationLevelCollection',
	},
	{
		label: 'Тип занятости',
		type: 'multiselect',

		placeholder: 'тип занятости',
		stateKey: 'employment',
		action: setEmployment,
		collectionKey: 'employmentCollection',
	},
	{
		label: 'Языки',
		type: 'selectGroup',

		stateKeys: ['languagePairs'],
		collectionKeys: ['languagesCollection', 'languageLevelCollection'],
		actions: {
			add: addLanguagePair,
			remove: removeLanguagePair,
			update: updateLanguagePair,
		},
	},
	// {
	// 	label: 'Специализация',
	// 	type: 'inputWithSelect',

	// 	placeholder: 'специализацию',
	// 	stateKey: 'specialization',
	// 	action: setSpecialization,
	// },
	// {
	// 	label: 'Гражданство',
	// 	type: 'multiselect',

	// 	placeholder: 'гражданство',
	// 	stateKey: 'citizenship',
	// 	collectionKey: 'countriesCollection',
	// 	action: setCitizenship,
	// },
	// {
	// 	label: 'Разрешение на работу',
	// 	type: 'multiselect',

	// 	placeholder: 'разрешение на работу в странах',
	// 	stateKey: 'workTicket',
	// 	collectionKey: 'countriesCollection',
	// 	action: setWorkTicket,
	// },
	{
		label: 'Статус поиска',
		type: 'multiselect',

		placeholder: 'статус',
		stateKey: 'jobSearchStatus',
		action: setJobSearchStatus,
		collectionKey: 'jobSearchStatusCollection',
	},
	{
		label: 'График работы',
		type: 'multiselect',

		placeholder: 'график работы',
		stateKey: 'schedule',
		action: setSchedule,
		collectionKey: 'scheduleCollection',
	},
	{
		label: 'Требуемый опыт работы',
		type: 'multiselect',

		placeholder: 'опыт работы',
		stateKey: 'experience',
		action: setExperience,
		collectionKey: 'experienceCollection',
	},

	// {
	//   label: 'Сортировка',
	//   type: 'select',
	//
	//   placeholder: 'сортировать по',
	//   stateKey: 'orderBy',
	//   action: setOrderBy,
	//   collectionKey: 'orderByCollection',
	// },
	// Навыки скрыты по договрённости т.к. нет понимания нужно их перезатирать или дополнять к основным BRAINHR-328
	// {
	//   label: 'Навыки',
	//   type: 'inputWithSuggestions',
	//
	//   placeholder: 'навыки',
	//   stateKey: 'skills',
	//   action: setSkills,
	//   style: {
	//     gridColumn: '1 / -1', // Занимает все колонки
	//     width: '100%', // На всякий случай
	//   },
	// },
];

interface Props {
	isAvailable: boolean;
}

export const OutboundSearch = ({ isAvailable }: Props) => {
	const dispatch = useAppDispatch();
	const searchState = useAppSelector(selectOutboundSearchSettings);
	const { id: vacancyId } = useParams();
	const [isInitialized, setIsInitialized] = useState(false);

	const [isButtonAvailable, setIsButtonAvailable] = useState(isAvailable);
	const checkStatusIntervalRef = useRef<NodeJS.Timeout | null>(null);
	const debouncedSaveRef = useRef<ReturnType<typeof debounce> | null>(null);

	const isInitialAvailable = isAvailable;

	const isFormEmpty = useMemo(() => {
		// Сравниваем текущее состояние с начальным
		return JSON.stringify(searchState) === JSON.stringify(outboundSearchInitialState);
	}, [searchState]);

	// Загрузка данных из localStorage при монтировании (или при смене vacancyId)
	useEffect(() => {
		if (!vacancyId || typeof vacancyId !== 'string') return;

		const storageKey = `outboundSearch_${vacancyId}`;
		const saved = localStorage.getItem(storageKey);

		if (saved) {
		try {
			const parsed = JSON.parse(saved);
			if (parsed && typeof parsed === 'object') {
				dispatch(loadOutboundSearchData(parsed));
			} else {
				dispatch(resetOutboundSearch());
			}
		} catch (e) {
			console.error('Ошибка при разборе сохранённых данных', e);
			dispatch(resetOutboundSearch());
		}
		} else {
			// Нет сохранённых данных — сбрасываем форму
			dispatch(resetOutboundSearch());
		}

		setIsInitialized(true);
	}, [vacancyId, dispatch]);

	// Сохранение в localStorage при изменении состояния (после инициализации)
	useEffect(() => {
		if (!isInitialized) return;
		if (!vacancyId || typeof vacancyId !== 'string') return;

		const storageKey = `outboundSearch_${vacancyId}`;
		
		const saveToStorage = () => {
			localStorage.setItem(storageKey, JSON.stringify(searchState));
		};

		// Отменяем предыдущий debounce, если он был
		if (debouncedSaveRef.current) {
			debouncedSaveRef.current.cancel();
		}

		// Создаём новый debounce с правильным порядком аргументов
		debouncedSaveRef.current = debounce(500, saveToStorage);
		debouncedSaveRef.current();

		return () => {
			if (debouncedSaveRef.current) {
				debouncedSaveRef.current.cancel();
				debouncedSaveRef.current = null;
			}
		};
	}, [searchState, vacancyId, isInitialized]);

	// Очистка интервала при размонтировании компонента
	useEffect(() => {
		return () => {
			if (checkStatusIntervalRef.current) {
				clearInterval(checkStatusIntervalRef.current);
			}
		};
	}, []);

	const checkSearchStatus = async (taskId: string) => {
		try {
			const response = await axios.get(
				`/api/hh/outbound_search/check_search_status/?task_id=${taskId}`
			);
			const { status } = response.data;

			if (status === 'SUCCESS') {
				if (checkStatusIntervalRef.current) {
					clearInterval(checkStatusIntervalRef.current);
					checkStatusIntervalRef.current = null;
				}
				setIsButtonAvailable(true);
			}
		} catch (error) {
			console.error('Error checking search status:', error);
			if (checkStatusIntervalRef.current) {
				clearInterval(checkStatusIntervalRef.current);
				checkStatusIntervalRef.current = null;
			}
		}
	};

	const handleClick = () => {
		if (typeof vacancyId !== 'string') return;

		const promise = dispatch(sendOutboundSearch(vacancyId)).unwrap();

		toaster.promise(promise, {
			success: {
				title: 'Холодный поиск успешно запущен...',
				duration: 7000,
			},
			error: (err) => ({
				title: `Ошибка исходящего поиска: ${err}`,
				duration: 7000,
			}),
			loading: { title: 'Загрузка...' },
		});

		promise
			.then((data) => {
				setIsButtonAvailable(false);
				const { task_id } = data;

				if (checkStatusIntervalRef.current) {
					clearInterval(checkStatusIntervalRef.current);
				}

				checkStatusIntervalRef.current = setInterval(() => {
					checkSearchStatus(task_id);
				}, 2000);
			})
			.catch((err) => {
				console.error('Ошибка:', err); // 🔹 Ошибки теперь попадают сюда
			});
	};

	const handleReset = () => {
		// Отменяем отложенное сохранение
		if (debouncedSaveRef.current) {
			debouncedSaveRef.current.cancel();
		}
		// Сбрасываем Redux state
		dispatch(resetOutboundSearch());
		// Удаляем сохранённые данные из localStorage для текущей вакансии
		if (vacancyId && typeof vacancyId === 'string') {
			const storageKey = `outboundSearch_${vacancyId}`;
			localStorage.removeItem(storageKey);
		}
		toaster.create({
			title: 'Настройки сброшены',
			type: 'info',
			duration: 2000,
		});
	};

	return (
		<Block
			heading={
				<Flex justify="space-between" align="center" w="100%">
					<Box>
						<Typo size="16px" weight="medium" color={COLORS.GRAY_800}>
							Настройки поиска
						</Typo>
						<Typo color={COLORS.GRAY_500} size="14px" mt={1}>
							Укажите параметры для подбора кандидатов
						</Typo>
					</Box>
					{!isFormEmpty && (
						<LkButton
							heightSize="medium"
							onClick={handleReset}
						>
							Сбросить
						</LkButton>
					)}
				</Flex>
			}
			pos={'relative'}
			mb={'16px'}
		>
			<Box>
				<Box className={styles.settingsGrid}>
					{searchSettingsInputs.map((item) => (
						<SettingInputElement
							key={item.stateKey || item.label}
							item={item}
							dispatch={dispatch}
							state={searchState}
							style={item.style}
						/>
					))}
				</Box>
				<LkButton
					heightSize="medium"
					w="100%"
					onClick={handleClick}
					mt={6}
					disabled={!isButtonAvailable}
					textAlign={'center'}
				>
					<Typo w="100%" color={COLORS.WHITE} weight="semibold" textAlign="center">
						{isButtonAvailable
							? 'Запустить холодный поиск по hh.ru'
							: !isInitialAvailable
								? 'Отсутствует подписка на холодный поиск'
								: 'Поиск идёт, подождите немного...'}
					</Typo>
				</LkButton>
			</Box>
		</Block>
	);
};
