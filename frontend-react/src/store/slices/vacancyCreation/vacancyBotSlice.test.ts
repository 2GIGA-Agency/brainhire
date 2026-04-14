import { describe, expect, it } from 'vitest';

import vacancyBotReducer, {
	addVacancyBotQuestion,
	deleteVacancyBotQuestion,
	resetVacancyBot,
	setVacancyBotActive,
	setVacancyBotAdditionalInfo,
	setVacancyBotCandidateMessage,
	setVacancyBotGenerateAutomaticQuestions,
	setVacancyBotRedFlags,
	vacancyBotInitialState,
} from './vacancyBotSlice';

describe('vacancyBotSlice reducer', () => {
	it('toggles active flag', () => {
		const result = vacancyBotReducer(vacancyBotInitialState, setVacancyBotActive(true));
		expect(result.isActive).toBe(true);
	});

	it('stores textual metadata', () => {
		const modified = vacancyBotReducer(vacancyBotInitialState, setVacancyBotRedFlags('flag'));
		const withInfo = vacancyBotReducer(modified, setVacancyBotAdditionalInfo('info'));
		const withMessage = vacancyBotReducer(withInfo, setVacancyBotCandidateMessage('hello'));

		expect(withMessage.redFlags).toBe('flag');
		expect(withMessage.additionalInfo).toBe('info');
		expect(withMessage.candidateMessage).toBe('hello');
	});

	it('keeps at least one question when deleting items', () => {
		const withExtra = vacancyBotReducer(vacancyBotInitialState, addVacancyBotQuestion());
		expect(withExtra.questions).toHaveLength(2);

		const stripped = vacancyBotReducer(withExtra, deleteVacancyBotQuestion(withExtra.questions[1].id));
		expect(stripped.questions).toHaveLength(1);

		const onlyOne = vacancyBotReducer(stripped, deleteVacancyBotQuestion(stripped.questions[0].id));
		expect(onlyOne.questions).toHaveLength(1);
		expect(onlyOne.questions[0].text).toBe('');
	});

	it('tracks automatic generation toggle', () => {
		const activeState = vacancyBotReducer(vacancyBotInitialState, setVacancyBotActive(true));
		const disabledState = vacancyBotReducer(activeState, setVacancyBotGenerateAutomaticQuestions(false));

		expect(disabledState.generateAutomaticQuestions).toBe(false);
		expect(disabledState.isActive).toBe(true);
	});

	it('resets to initial state', () => {
		const modified = vacancyBotReducer(vacancyBotInitialState, setVacancyBotActive(true));
		const reset = vacancyBotReducer(modified, resetVacancyBot());

		expect(reset).toEqual(vacancyBotInitialState);
	});
});
