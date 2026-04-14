import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

export interface SelectableSkillsGroup {
  id: string;
  minCount: number; // Минимальное количество навыков из группы
  skills: string[]; // Тексты навыков
}

export interface SelectableSkillsState {
  groups: SelectableSkillsGroup[];
}

const createEmptyGroup = (): SelectableSkillsGroup => ({
  id: Date.now().toString() + Math.random().toString(36).slice(2),
  minCount: 1,
  skills: [],
});

const initialState: SelectableSkillsState = {
  groups: [],
};

export const selectableSkillsSlice = createSlice({
  name: 'selectableSkills',
  initialState,
  reducers: {
    addGroup: (state) => {
      state.groups.push(createEmptyGroup());
    },
    removeGroup: (state, action: PayloadAction<string>) => {
      state.groups = state.groups.filter((g) => g.id !== action.payload);
    },
    setGroupMinCount: (
      state,
      action: PayloadAction<{ groupId: string; minCount: number }>
    ) => {
      const group = state.groups.find((g) => g.id === action.payload.groupId);
      if (group) {
        const requested = action.payload.minCount;
        const maxAllowed = group.skills.length || 1;
        group.minCount = Math.min(requested, maxAllowed);
      }
    },
    addSkillToGroup: (
      state,
      action: PayloadAction<{ groupId: string; skillText: string }>
    ) => {
      const group = state.groups.find((g) => g.id === action.payload.groupId);
      if (group && !group.skills.includes(action.payload.skillText)) {
        group.skills.push(action.payload.skillText);
        if (group.minCount > group.skills.length) {
          group.minCount = group.skills.length;
        }
      }
    },
    removeSkillFromGroup: (
      state,
      action: PayloadAction<{ groupId: string; skillText: string }>
    ) => {
      const group = state.groups.find((g) => g.id === action.payload.groupId);
      if (group) {
        group.skills = group.skills.filter((s) => s !== action.payload.skillText);
        const maxAllowed = Math.max(1, group.skills.length || 1);
        if (group.minCount > maxAllowed) group.minCount = maxAllowed;
      }
    },
    setGroupsFromApi: (
      state,
      action: PayloadAction<Array<{ min_count?: number; skills: string[] }>>
    ) => {
      state.groups = action.payload.map((group) => ({
        id: Date.now().toString() + Math.random().toString(36).slice(2),
        minCount:
          group.min_count && group.min_count > 0 ? group.min_count : Math.min(1, (group.skills || []).length || 1),
        skills: group.skills || [],
      }));
    },
    resetSelectableSkills: () => initialState,
  },
});

export const {
  addGroup,
  removeGroup,
  setGroupMinCount,
  addSkillToGroup,
  removeSkillFromGroup,
  setGroupsFromApi,
  resetSelectableSkills,
} = selectableSkillsSlice.actions;

export const selectSelectableSkillGroups = (state: RootState) =>
  state.vacancyCreation.selectableSkills.groups;

export default selectableSkillsSlice.reducer;
