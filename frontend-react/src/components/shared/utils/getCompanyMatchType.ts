import { CompanyFilterApi } from '@/store/types';
import { normalizeCompanyName } from './normalizeCompanyName';

export function getCompanyMatchType (
    companyName: string | null | undefined,
    companyFilter?: CompanyFilterApi
) {
    if (!companyName || !companyFilter) {
        return 'none';
    }

    const normalized = normalizeCompanyName(companyName);

    const toArray = (section: any): string[] => {
        if (!section) return [];
        if (Array.isArray(section)) return section as string[];
        if (Array.isArray(section?.matches)) return section.matches as string[];
        return [];
    };

    const whitelist = toArray(companyFilter.whitelist);
    const blacklist = toArray(companyFilter.blacklist);

    if (whitelist.some((c) => normalizeCompanyName(c) === normalized)) {
        return 'whitelist';
    }

    if (blacklist.some((c) => normalizeCompanyName(c) === normalized)) {
        return 'blacklist';
    }

    return 'none';
};