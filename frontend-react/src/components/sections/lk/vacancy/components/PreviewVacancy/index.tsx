// src/components/vacancy/PreviewVacancy.tsx
import { Block } from '@/components/shared/Block';
import { VacancyInfo } from '@/components/shared/VacancyInfo'; // Убедитесь, что путь правильный
import { VStack } from '@chakra-ui/react';
import { useAppSelector } from '@/store/store';
import { selectVacancyInfo } from '@/store/slices/vacancyCreation/vacancyInfoSlice';
import {
	selectCompanies,
	selectSelectedCompany,
} from '@/store/slices/vacancyCreation/companySlice';
import { selectSkills } from '@/store/slices/vacancyCreation/skillsSlice';
import { selectSelectableSkillGroups } from '@/store/slices/vacancyCreation/selectableSkillsSlice';
import { selectCompanyFilter } from '@/store/slices/vacancyCreation/companyFilterSlice';
import { InitialCandidatesAmount } from './InitialCandidatesAmount';
import { paymentFormat } from '@/utils/formatSalary';

interface Props {
	isEdit: boolean;
}

export const PreviewVacancy = ({ isEdit }: Props) => {
	const vacancyInfoState = useAppSelector(selectVacancyInfo);
	const companyId = useAppSelector(selectSelectedCompany);
	const company = useAppSelector(selectCompanies).find((i) => i.id == companyId);
	const skills = useAppSelector(selectSkills);
	const selectableGroups = useAppSelector(selectSelectableSkillGroups);
	const companyFilter = useAppSelector(selectCompanyFilter);

	const previewVacancyData = {
		companyName: company?.company_name || 'Не указано',
		vacancyTitle: vacancyInfoState.vacancy_name || 'Не указано',
		positionLevel:
			vacancyInfoState.jobLevelsCollection.find((item) => item.value === vacancyInfoState.jobLevel)
				?.value ?? 'Не указано',
		employmentType:
			vacancyInfoState.employmentTypesCollection.find(
				(item) => item.value === vacancyInfoState.employmentType
			)?.label ?? 'Не указано',
		salary: paymentFormat([Number(vacancyInfoState.salaryFrom), Number(vacancyInfoState.salaryTo)]),
		experience:
			vacancyInfoState.experienceCollection.find(
				(item) => item.value === vacancyInfoState.experience
			)?.label ?? 'Не указано',
		// regions: vacancyInfoState.regions.map(i => JSON.parse(i).text) || "Не указано",
		regions: [vacancyInfoState.region?.text ?? 'Не указано'],
		skills: skills,
		selectableSkills: selectableGroups
			.filter((group) => group.skills.length > 0)
			.map((group) => ({
				minCount: group.minCount,
				skills: group.skills,
			})),
		companyFilter: {
			whitelist: companyFilter.whitelist.companies,
			blacklist: companyFilter.blacklist.companies,
		},
	};

	return (
		<VStack gap="32px">
			<Block headingText="Предпросмотр вакансии" subHeadingText="Убедитесь, что данные верны">
				<VacancyInfo variant="preview" data={previewVacancyData} />
			</Block>
			{!isEdit && <InitialCandidatesAmount />}
		</VStack>
	);
};
