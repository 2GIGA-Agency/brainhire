export type ActiveHHVacanciesResponse = ActiveHHVacancy[];

interface ActiveHHVacancy {
  id: string;
  name: string;
  area: string;
}

export interface VacancyCheckStatusResponse {
  vacancy_status: boolean;
}