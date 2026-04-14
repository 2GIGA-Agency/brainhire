import { CompanyChoice } from '@/components/sections/lk/vacancy/components/CreatingVacancyDescription/components/CompanyChoice';
import { Skills } from '@/components/sections/lk/vacancy/components/CreatingVacancyDescription/components/Skills';
import { VacancyGeneration } from '@/components/sections/lk/vacancy/components/CreatingVacancyDescription/components/VacancyGeneration';
import { VacancyHHIntegration } from '@/components/sections/lk/vacancy/components/CreatingVacancyDescription/components/IntegrationHHVacancy';
import { CreatingVacancyInfo } from '@/components/sections/lk/vacancy/components/CreatingVacancyDescription/components/CreatingVacancyInfo';
import { CompanyFilter } from '@/components/sections/lk/vacancy/components/CreatingVacancyDescription/components/CompanyFilter';
import { VStack } from '@chakra-ui/react';

export const CreatingVacancyDescription = () => {
	return (
		<>
			<VStack gap="32px">
				<CompanyChoice />
				<VacancyHHIntegration />
				<VacancyGeneration />
				{/* Пока не реализовано на беке */}
				{/* <CompanyVideo /> */}
				{/* <LanguageChoice /> */}
				<CreatingVacancyInfo />
				<Skills />
				<CompanyFilter />
			</VStack>
		</>
	);
};
