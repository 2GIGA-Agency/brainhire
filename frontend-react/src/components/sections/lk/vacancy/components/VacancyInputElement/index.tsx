import React, { memo, useCallback, useEffect, useState, useRef } from 'react';
import { LkField } from '@/components/shared/LkField';
import { LkInput } from '@/components/shared/LkInput';
import { Selection } from '@/components/shared/Selection';
import { CollectionItem, createListCollection, ListCollection } from '@chakra-ui/react'; // Removed createListCollection import as it's not used here
import { AppDispatch } from '@/store/store';
import { RegionInfo, VacancyInfoState } from '@/store/slices/vacancyCreation/vacancyInfoSlice'; // Adjusted import path if necessary
import { TiptapEditor } from '@/components/ui-kit/TiptapEditor/TiptapEditor';
import { formatNumber } from '@/utils/formatNumber';
// import { VacancyRegionsInput } from '../CreatingVacancyDescription/components/CreatingVacancyInfo/components/VacancyRegionsInput';
import { ProfessionalRolesSelect } from '@/components/shared/ProfessionalRoleSelect';
import { RegionsInputWithSelect } from '@/components/shared/RegionsInputWithSelect';

export interface VacancyInputItem {
	label: string;
	type: 'text' | 'select' | 'inputWithMultiSelect' | 'textarea' | 'number' | 'inputWithSelect';
	required: boolean;
	placeholder: string;
	stateKey: keyof VacancyInfoState;
	action: any; // ActionCreatorWithPayload<any, string>; // More specific type if possible
	collectionKey?: keyof VacancyInfoState;
}

interface ElementProps {
	item: VacancyInputItem;
	dispatch: AppDispatch;
	state: VacancyInfoState;
}

const DEBOUNCE_DELAY = 500; // ms

export const VacancyInputElement: React.FC<ElementProps> = memo(({ item, dispatch, state }) => {
	const reduxValue = state[item.stateKey];
	const [localValue, setLocalValue] = useState(reduxValue ?? '');

	const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const isMounted = useRef(true);

	useEffect(() => {
		isMounted.current = true;
		return () => {
			isMounted.current = false;
			// Clear any pending timeout on unmount
			if (debounceTimeoutRef.current) {
				clearTimeout(debounceTimeoutRef.current);
			}
		};
	}, []);

	// --- Effect to sync local state if Redux state changes externally ---
	useEffect(() => {
		const currentReduxValue = state[item.stateKey] ?? '';
		if (currentReduxValue !== localValue) {
			setLocalValue(currentReduxValue);
		}
	}, [state[item.stateKey]]); // Dependency only on the specific Redux state value

	useEffect(() => {
		// Only run debounce logic for relevant input types
		if (['text', 'number', 'textarea', 'inputWithSelect'].includes(item.type)) {
			if (debounceTimeoutRef.current) {
				clearTimeout(debounceTimeoutRef.current);
			}

			// Start a new timeout
			debounceTimeoutRef.current = setTimeout(() => {
				if (isMounted.current && localValue !== (state[item.stateKey] ?? '')) {
					let valueToDispatch:
						| string
						| number
						| string[]
						| RegionInfo[]
						| {
								id: string;
								text: string;
								accept_incomplete_resumes: boolean;
						  }
						| CollectionItem[] = localValue;

					if (item.type === 'number') {
						const parsed = parseFloat(localValue as string);
						valueToDispatch = localValue === '' || isNaN(parsed) ? '' : parsed;
					}

					dispatch(item.action(valueToDispatch));
				}
			}, DEBOUNCE_DELAY);
		}
	}, [localValue, item.type, item.action, dispatch, state[item.stateKey]]);

	const handleLocalChange = useCallback(
		(newValue: string | number) => {
			if (item.type === 'number') {
				if (newValue === '' || /^[0-9]*\.?[0-9]*$/.test(String(newValue))) {
					setLocalValue(String(newValue));
				}
			} else {
				setLocalValue(newValue);
			}
		},
		[item.type]
	); // Added item.type dependency

	const handleDirectChange = useCallback(
		(newValue: any) => {
			dispatch(item.action(newValue));
		},
		[dispatch, item]
	);

	let content = null;

	switch (item.type) {
		case 'select': {
			const collection = (item.collectionKey &&
				createListCollection({
					items: state[item.collectionKey] as CollectionItem,
				})) as ListCollection<any>;

			content = (
				<Selection
					collection={collection}
					placeholder={`Выберите ${item.placeholder}`}
					// Use reduxValue directly for selects as they don't need debounce
					value={[reduxValue]}
					onChange={handleDirectChange} // Use direct dispatch
				/>
			);
			break;
		}

		case 'textarea': {
			content = (
				<TiptapEditor
					value={localValue as string} // Use local state for value
					onChange={handleLocalChange} // Use local state handler
					placeholder={`Введите ${item.placeholder}`}
				/>
			);
			break;
		}

		case 'text':
			content = (
				<LkInput
					placeholder={`Введите ${item.placeholder}`}
					value={String(localValue)} // Use local state for value
					onChange={(e) => handleLocalChange(e.target.value)} // Use local state handler
				/>
			);

			break;

		case 'number':
			const displayValue = String(localValue).length ? formatNumber(localValue as number) : '';

			content = (
				<LkInput
					placeholder={`Введите ${item.placeholder}`}
					value={displayValue} // Use local state for value
					onChange={(e) => {
						const numericValue = e.target.value.replace(/\D/g, '');
						handleLocalChange(numericValue ? parseInt(numericValue, 10) : 0);
					}}
					min={1}
				/>
			);
			break;

		case 'inputWithSelect': {
			if (item.stateKey == 'specialization') {
				content = (
					<ProfessionalRolesSelect role={state[item.stateKey]} onSelect={handleDirectChange} />
				);
			}

			if (item.stateKey == 'region') {
				content = (
					<RegionsInputWithSelect region={state[item.stateKey]} onSelect={handleDirectChange} />
				);
			}

			break;
		}

		case 'inputWithMultiSelect': {
			// Изменил на одиночный выбор
			// if (item.stateKey.includes('regions')) {
			// 	content = <VacancyRegionsInput />;
			// }

			break;
		}
		default:
			content = null;
	}

	return content ? (
		<LkField label={item.label} required={item.required}>
			{content}
		</LkField>
	) : null;
});

VacancyInputElement.displayName = 'VacancyInputElement';
