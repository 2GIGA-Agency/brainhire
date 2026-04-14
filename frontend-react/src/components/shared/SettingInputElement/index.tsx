import React, { memo, useCallback, useEffect, useState, useRef } from 'react';
import { LkField } from '@/components/shared/LkField';
import { InputFilters, LkInput } from '@/components/shared/LkInput';
import { Selection } from '@/components/shared/Selection';
import { CollectionItem, createListCollection, FieldRootProps } from '@chakra-ui/react';
import { AppDispatch } from '@/store/store';
import { TiptapEditor } from '@/components/ui-kit/TiptapEditor/TiptapEditor';
import { formatNumber } from '@/utils/formatNumber';
import { ProfessionalRolesSelect } from '../ProfessionalRoleSelect';
import SelectGroup from '../SelectGroup';
import { LanguagePair } from '@/store/slices/outboundSearch';
import { SkillsWithSuggestions } from '../SkillsWithSuggestions';
import { SkillItem } from '@/store/slices/vacancyCreation/skillsSlice';
import { RegionsInputWithSelect } from '../RegionsInputWithSelect';
import { OutboundSearchKeywordsInput } from '@/components/sections/lk/outboundSearch/OutboundSearchKeywordsInput';

interface SettingInputItemBase {
	label: string;
	type:
		| 'text'
		| 'select'
		| 'textarea'
		| 'number'
		| 'inputWithSelect'
		| 'multiselect'
		| 'selectGroup'
		| 'inputWithSuggestions'
		| 'multiSelectInputWithSuggestions';
	required?: boolean;
	placeholder?: string;
	action?: any;
	actions?: Record<string, any>;
	style?: React.CSSProperties;
}

// Варианты для stateKey/stateKeys
type StateKeyVariations =
	| { stateKey: string; stateKeys?: never }
	| { stateKeys: string[]; stateKey?: never };

type CollectionKeyVariations =
	| { collectionKey: string; collectionKeys?: never }
	| { collectionKeys: string[]; collectionKey?: never }
	| { collectionKey?: never; collectionKeys?: never }; // Добавляем вариант без collection ключей

// Финальный тип
export type SettingInputItem = SettingInputItemBase & StateKeyVariations & CollectionKeyVariations;

interface ElementProps extends FieldRootProps {
	item: SettingInputItem;
	dispatch: AppDispatch;
	state: Record<string, any>; // Общий тип для любого state slice
}

const DEBOUNCE_DELAY = 500; // ms

export const SettingInputElement: React.FC<ElementProps> = memo(
	({ item, dispatch, state, ...props }) => {
		const reduxValue = item.stateKey
			? state[item.stateKey]
			: item.stateKeys
				? item.stateKeys.map((key) => state[key])
				: '';

		const [localValue, setLocalValue] = useState(reduxValue ?? '');

		const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

		useEffect(() => {
			if (!item.stateKey) return;
			const currentReduxValue = state[item.stateKey] ?? '';
			if (currentReduxValue !== localValue) {
				setLocalValue(currentReduxValue);
			}
		}, [item.stateKey ? state[item.stateKey] : undefined]);

		// Логика Debounce для инпутов с текстом/числами
		useEffect(() => {
			// Применяем debounce только для определенных типов
			if (['text', 'number', 'textarea'].includes(item.type)) {
				if (debounceTimeoutRef.current) {
					clearTimeout(debounceTimeoutRef.current);
				}

				debounceTimeoutRef.current = setTimeout(() => {
					// Диспатчим, только если значение действительно изменилось
					if (localValue !== (state[item.stateKey] ?? '')) {
						let valueToDispatch: any = localValue;

						if (item.type === 'number') {
							const parsed = parseInt(String(localValue), 10);
							valueToDispatch = localValue === '' || isNaN(parsed) ? '' : parsed;
						}

						dispatch(item.action(valueToDispatch));
					}
				}, DEBOUNCE_DELAY);
			}

			// Очистка таймера при размонтировании
			return () => {
				if (debounceTimeoutRef.current) {
					clearTimeout(debounceTimeoutRef.current);
				}
			};
		}, [localValue, item.type, item.action, dispatch, item.stateKey, state]);

		// Обработчик для полей с debounce (text, number, textarea)
		const handleLocalChange = useCallback((newValue: string | number) => {
			setLocalValue(newValue);
		}, []);

		// Обработчик для полей, где изменение должно быть мгновенным (select, inputWithSelect)
		const handleDirectChange = useCallback(
			(newValue: any) => {
				dispatch(item.action(newValue));
			},
			[dispatch, item.action]
		);

		let content = null;

		switch (item.type) {
			case 'select': {
				// Получаем коллекцию в зависимости от того, какой ключ указан
				const collectionItems = item.collectionKey
					? state[item.collectionKey]
					: item.collectionKeys
						? item.collectionKeys.flatMap((key) => state[key] || [])
						: [];

				const collection =
					collectionItems.length > 0
						? createListCollection({ items: collectionItems as CollectionItem[] })
						: null;

				content = collection ? (
					<Selection
						collection={collection}
						placeholder={`Выберите ${item.placeholder}`}
						value={[reduxValue]}
						onChange={handleDirectChange}
					/>
				) : null;
				break;
			}

			case 'textarea': {
				content = (
					<TiptapEditor
						value={localValue as string}
						onChange={handleLocalChange}
						placeholder={`Введите ${item.placeholder}`}
					/>
				);
				break;
			}

			case 'text':
				content = (
					<LkInput
						allowedChars={InputFilters.onlyLetters}
						placeholder={`Введите ${item.placeholder}`}
						value={String(localValue)}
						onChange={(e) => handleLocalChange(e.target.value)}
					/>
				);
				break;

			case 'number': {
				// Удаляем все нечисловые символы для обработки, но форматируем для отображения
				const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
					const numericValue = e.target.value.replace(/\D/g, '');
					handleLocalChange(numericValue);
				};
				const displayValue = localValue ? formatNumber(Number(localValue)) : '';

				content = (
					<LkInput
						placeholder={`Введите ${item.placeholder}`}
						value={displayValue}
						onChange={handleNumberChange}
						min={1}
					/>
				);
				break;
			}

			case 'inputWithSelect': {
				if (item.stateKey == 'specialization') {
					content = (
						<ProfessionalRolesSelect
							role={item.stateKey ? state[item.stateKey] : undefined}
							onSelect={handleDirectChange}
						/>
					);
				}

				if (item.stateKey === 'areas') {
					content = (
						<RegionsInputWithSelect region={state[item.stateKey]} onSelect={handleDirectChange} />
					);
				}
				break;
			}

			case 'inputWithSuggestions': {
				if (item.stateKey == 'skills') {
					content = (
						<SkillsWithSuggestions
							isOutbound={true}
							selectedSkills={state[item.stateKey]}
							onSelect={(value) => {
								handleDirectChange([...state[item.stateKey], JSON.parse(value)]);
							}}
							onRemove={(value) => {
								handleDirectChange(state[item.stateKey].filter((i: SkillItem) => i.text !== value));
							}}
						/>
					);
				}
				break;
			}

			case 'multiselect': {
				const collectionItems = item.collectionKey
					? state[item.collectionKey]
					: item.collectionKeys
						? item.collectionKeys.flatMap((key) => state[key] || [])
						: [];

				const collection =
					collectionItems.length > 0
						? createListCollection({ items: collectionItems as CollectionItem[] })
						: null;

				content = (
					<Selection
						placeholder={`Выберите ${item.placeholder}`}
						isMultiSelect={true}
						value={reduxValue}
						collection={collection}
						onChange={handleDirectChange}
					/>
				);
				break;
			}

			case 'selectGroup': {
				const languagePairs = item.stateKeys ? state[item.stateKeys[0]] : [];
				const languageCollectionItems = item.collectionKeys ? state[item.collectionKeys[0]] : [];
				const levelCollectionItems = item.collectionKeys ? state[item.collectionKeys[1]] : [];

				// Формируем массив выбранных языков (для фильтрации)
				const selectedLanguages = languagePairs.map((pair: LanguagePair) => pair.language);

				const options = languagePairs.map((pair: LanguagePair) => {
					const langLabel =
						languageCollectionItems.find((l: CollectionItem) => l.value === pair.language)?.label ||
						pair.language;
					const levelLabel =
						levelCollectionItems.find((l: CollectionItem) => l.value === pair.level)?.label ||
						pair.level;

					return [
						{ value: pair.language, label: langLabel },
						{ value: pair.level, label: levelLabel },
					];
				});

				const collections = [
					createListCollection({ items: languageCollectionItems }),
					createListCollection({ items: levelCollectionItems }),
				];

				// Указываем, что нужно фильтровать только первый селект (языки)
				const filterIndices = [0];

				// Передаем выбранные значения для каждого селекта
				const selectedValues = {
					0: selectedLanguages, // Для языков
					1: languagePairs.map((p) => p.level), // Для уровней (если нужно)
				};

				content = (
					<SelectGroup
						options={options}
						collections={collections}
						selectedValues={selectedValues}
						filterIndices={filterIndices}
						onAdd={() => dispatch(item.actions!.add())}
						onRemove={(index) => dispatch(item.actions!.remove(index))}
						onSelect={(rowIndex, colIndex, value) => {
							const field = colIndex === 0 ? 'language' : 'level';
							dispatch(item.actions.update({ index: rowIndex, field, value }));
						}}
					/>
				);
				break;
			}

			case 'multiSelectInputWithSuggestions': {
				// if (item.stateKey === 'areas') {
				// 	content = <OutboundSearchAreasInput />;
				// }
				if (item.stateKey === 'keywords') {
					content = <OutboundSearchKeywordsInput />;
				}
				break;
			}

			default:
				content = null;
				break;
		}

		return content ? (
			<LkField label={item.label} required={item.required} {...props}>
				{content}
			</LkField>
		) : null;
	}
);

SettingInputElement.displayName = 'SettingInputElement';
