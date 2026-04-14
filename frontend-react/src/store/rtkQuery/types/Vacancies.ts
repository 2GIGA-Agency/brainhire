// Ответы на странице /vacancy

interface ICompanyInVacanciesResponse {
  company_name: string;
  id: string;
}

export interface IVacancyInVacanciesResponse {
  id: string;
  create_date: string; //iso
  company: ICompanyInVacanciesResponse,
  vacancy_name: string;
  user_full_name: string;
  number_days: number;
  number_candidates: number | null;
  number_best_candidates: number | null;
  is_archived: boolean;
}

export type IVacanciesResponse = IVacancyInVacanciesResponse[];

export interface IVacanciesParams {
  is_archived: boolean;
  search?: string;
  ordering?: string;
}