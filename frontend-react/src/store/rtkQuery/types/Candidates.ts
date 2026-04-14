import { TableTab } from '@/app/(lk)/vacancy/[id]/components/CandidatesTable/components/CandidatesTabs/types';
import { Counters } from '@/app/(lk)/vacancy/[id]/types';
import { Candidate } from '@/store/types';

export interface GetCandidatesParams {
	vacancyRootId: string;
	tab?: TableTab | 'incoming' | 'outbound';
	page?: number;
	search?: string;
	ordering?: string;
	outbound?: boolean;
}

export interface CandidatesResponse {
	count: number;
	results: Candidate[];
	current_page: number;
	per_page: number;
	candidates_counters: Counters;
}
