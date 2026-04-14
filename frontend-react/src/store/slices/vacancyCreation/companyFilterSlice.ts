import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

export interface CompanyFilterSectionState {
	companies: string[];
	sendReject: boolean;
}

export interface CompanyFilterState {
	whitelist: CompanyFilterSectionState;
	blacklist: CompanyFilterSectionState;
}

const initialState: CompanyFilterState = {
	whitelist: {
		companies: [],
		sendReject: false,
	},
	blacklist: {
		companies: [],
		sendReject: false,
	},
};

const normalizeCompany = (value: string) => value.trim();

const isSameCompany = (a: string, b: string) => normalizeCompany(a) === normalizeCompany(b);

const addCompany = (target: CompanyFilterSectionState, other: CompanyFilterSectionState, name: string) => {
	const normalized = normalizeCompany(name);
	if (!normalized) return;

	// Если уже есть в целевом списке — ничего не делаем
	if (target.companies.some((c) => isSameCompany(c, normalized))) {
		return;
	}

	// Удаляем из противоположного списка, если там есть
	other.companies = other.companies.filter((c) => !isSameCompany(c, normalized));

	target.companies.push(normalized);
};

const removeCompany = (section: CompanyFilterSectionState, name: string) => {
	section.companies = section.companies.filter((c) => !isSameCompany(c, name));
};

type CompanyFilterFromApi =
	| {
			whitelist?: string[] | { companies?: string[]; send_reject?: boolean };
			blacklist?: string[] | { companies?: string[]; send_reject?: boolean };
	  }
	| null;

export const companyFilterSlice = createSlice({
	name: 'companyFilter',
	initialState,
	reducers: {
		addWhitelistCompany: (state, action: PayloadAction<string>) => {
			addCompany(state.whitelist, state.blacklist, action.payload);
		},
		removeWhitelistCompany: (state, action: PayloadAction<string>) => {
			removeCompany(state.whitelist, action.payload);
		},
		setWhitelistSendReject: (state, action: PayloadAction<boolean>) => {
			state.whitelist.sendReject = action.payload;
		},
		addBlacklistCompany: (state, action: PayloadAction<string>) => {
			addCompany(state.blacklist, state.whitelist, action.payload);
		},
		removeBlacklistCompany: (state, action: PayloadAction<string>) => {
			removeCompany(state.blacklist, action.payload);
		},
		setBlacklistSendReject: (state, action: PayloadAction<boolean>) => {
			state.blacklist.sendReject = action.payload;
		},
		setCompanyFilterFromApi: (state, action: PayloadAction<CompanyFilterFromApi>) => {
			const payload = action.payload;
			if (!payload) return;

			const mapSection = (target: CompanyFilterSectionState, source: unknown) => {
				const empty: CompanyFilterSectionState = { companies: [], sendReject: false };

				if (!source) {
					target.companies = empty.companies;
					target.sendReject = empty.sendReject;
					return;
				}

				// Поддержка нового формата { companies: [...], send_reject: bool }
				if (source && typeof source === 'object' && !Array.isArray(source)) {
					const obj = source as { companies?: unknown; send_reject?: unknown };
					const companiesRaw = Array.isArray(obj.companies)
						? obj.companies.filter((c: unknown) => typeof c === 'string')
						: [];
					target.companies = companiesRaw.map((c) => normalizeCompany(c as string));
					target.sendReject = Boolean(obj.send_reject);
					return;
				}

				// Поддержка старого формата: просто массив строк
				if (Array.isArray(source)) {
					target.companies = (source)
						.filter((c) => typeof c === 'string')
						.map((c) => normalizeCompany(c as string));
					target.sendReject = false;
					return;
				}

				target.companies = empty.companies;
				target.sendReject = empty.sendReject;
			};

			mapSection(state.whitelist, payload.whitelist);
			mapSection(state.blacklist, payload.blacklist);
		},
		resetCompanyFilter: () => initialState,
	},
});

export const {
	addWhitelistCompany,
	removeWhitelistCompany,
	setWhitelistSendReject,
	addBlacklistCompany,
	removeBlacklistCompany,
	setBlacklistSendReject,
	setCompanyFilterFromApi,
	resetCompanyFilter,
} = companyFilterSlice.actions;

export const selectCompanyFilter = (state: RootState) => state.vacancyCreation.companyFilter;

export default companyFilterSlice.reducer;
