import { Company } from '@/app/(lk)/vacancy/page';
import axios from '@/utils/axios';

export const fetchCompanies = async () => {
	const response = await axios.get<Company[]>('/api/companies');
	const companies = response.data;

	return companies;
};
