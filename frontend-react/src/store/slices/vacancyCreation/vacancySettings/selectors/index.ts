// --- Селекторы ---

import { RootState } from "@/store/store";
import { createSelector } from "@reduxjs/toolkit";
import { TemplateCategoryKey } from "../types";

export const selectVacancySettings = (state: RootState) => state.vacancyCreation.vacancySettings;

export const selectPresentation = createSelector(
	[selectVacancySettings],
	(state) => state.presentation
);
export const selectVideo = createSelector([selectVacancySettings], (state) => state.video);
export const selectPdf = createSelector([selectVacancySettings], (state) => state.pdf);
export const selectPreviousVideo = createSelector(
	[selectVacancySettings],
	(state) => state.previousVideo
);
export const selectPreviousPdf = createSelector(
	[selectVacancySettings],
	(state) => state.previousPdf
);
export const selectVideoUrl = createSelector([selectVacancySettings], (state) => state.video_url);

export const selectFeedback = createSelector([selectVacancySettings], (state) => state.feedback);
export const selectReminder = createSelector([selectVacancySettings], (state) => state.reminder);
export const selectChangePatterns = createSelector(
	[selectVacancySettings],
	(state) => state.changePattern
);

const selectTemplateLists = createSelector([selectVacancySettings], (state) => state.templateLists);
const selectSelectedTemplateIds = createSelector(
	[selectVacancySettings],
	(state) => state.selectedTemplateIds
);

export const makeSelectTemplatesByType = (type: TemplateCategoryKey) =>
	createSelector([selectTemplateLists], (lists) => lists[type] || []);

export const makeSelectCurrentTemplateByType = (type: TemplateCategoryKey) =>
	createSelector([selectTemplateLists, selectSelectedTemplateIds], (lists, selectedIds) => {
		const list = lists[type];
		const selectedId = selectedIds[type];
		if (!list || !selectedId) return null;
		return list.find((t) => t.id === selectedId) || null;
	});
