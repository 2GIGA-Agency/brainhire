import registrationReducer from './slices/registration';
import companyChoiceReducer from './slices/vacancyCreation/companySlice';
import companyVideoReducer from './slices/vacancyCreation/companyVideoSlice';
import interviewReducer from './slices/vacancyCreation/interviewSlice';
import languageChoiceReducer from './slices/vacancyCreation/languageChoiceSlice';
import skillsReducer from './slices/vacancyCreation/skillsSlice';
import testingReducer from './slices/vacancyCreation/testingSlice';
import selectableSkillsReducer from './slices/vacancyCreation/selectableSkillsSlice';
import companyFilterReducer from './slices/vacancyCreation/companyFilterSlice';
import vacancyBotReducer from './slices/vacancyCreation/vacancyBotSlice';
import vacancyCreationReducer from './slices/vacancyCreation/vacancyCreationSlice';
import vacancyInfoReducer from './slices/vacancyCreation/vacancyInfoSlice';
import vacancySettingsReducer from './slices/vacancyCreation/vacancySettings/vacancySettingsSlice';
import appReducer from './slices/appSlice';
import chatReducer from './slices/chatSlice';

import financesFlowReducer from './slices/financesFlow/financesFlowSlice';
import interviewFlowReducer from './slices/interviewFlow';

import outboundSearchSearchReducer from './slices/outboundSearch';

import previewReducer from '@/store/slices/vacancyCreation/previewSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { brainApi } from './rtkQuery/api';

// Страница создания вакансии
const vacancyCreationReducers = combineReducers({
	companyChoice: companyChoiceReducer,
	companyFilter: companyFilterReducer,
	companyVideo: companyVideoReducer,
	languageChoice: languageChoiceReducer,
	vacancyInfo: vacancyInfoReducer,
	interview: interviewReducer,
	skills: skillsReducer,
	selectableSkills: selectableSkillsReducer,
	preview: previewReducer,
	testing: testingReducer,
	vacancyCreation: vacancyCreationReducer,
	vacancySettings: vacancySettingsReducer,
	vacancyBot: vacancyBotReducer,
});

export const store = configureStore({
	reducer: {
		[brainApi.reducerPath]: brainApi.reducer,
		app: appReducer,
		vacancyCreation: vacancyCreationReducers,
		interviewFlow: interviewFlowReducer,
		financesFlow: financesFlowReducer,
		registration: registrationReducer,
		outboundSearch: outboundSearchSearchReducer,
		chat: chatReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(brainApi.middleware),
});

// Выведение типов `RootState` и `AppDispatch` из хранилища
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Используйте во всем приложении вместо обычных `useDispatch` и `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
