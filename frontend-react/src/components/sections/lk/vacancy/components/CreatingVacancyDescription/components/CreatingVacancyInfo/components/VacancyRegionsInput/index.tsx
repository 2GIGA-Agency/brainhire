// import { selectVacancyInfo, setRegions } from '@/store/slices/vacancyCreation/vacancyInfoSlice';
// import { useAppDispatch, useAppSelector } from '@/store/store';
// import { RegionsInput } from '../../../../../../../../../shared/RegionsInput';

// export function VacancyRegionsInput() {
// 	const dispatch = useAppDispatch();
// 	const regions = useAppSelector(selectVacancyInfo).regions;

// 	const handleRemoveRegion = (regionToRemove: string) => {
// 		dispatch(setRegions(regions.filter((region) => region !== regionToRemove)));
// 	};

// 	const handleSelectRegion = (newRegion: string) => {
// 		dispatch(setRegions([...regions, newRegion]));
// 	};

// 	return (
// 		<RegionsInput
// 			regions={regions}
// 			onSelectRegion={handleSelectRegion}
// 			onRemoveRegion={handleRemoveRegion}
// 		/>
// 	);
// }
