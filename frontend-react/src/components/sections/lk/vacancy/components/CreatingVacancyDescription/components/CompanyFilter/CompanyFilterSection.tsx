import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Typo } from '@/components/shared/Typo/Typo';
import { COLORS } from '@/constants/colors';
import { CompaniesWithSuggestions } from '@/components/shared/CompaniesWithSuggestions';
import { HeadingRadioGroup } from '@/components/shared/RadioChoice/HeadingRadioGroup';

export interface CompanyFilterSectionProps {
	title: string;
	description: string;
	placeholder: string;
	companies: string[];
	onSelectCompany: (name: string) => void;
	onRemoveCompany: (name: string) => void;
	sendReject: boolean;
	sendRejectLabel: string;
	onChangeSendReject: (value: boolean) => void;
}

export const CompanyFilterSection = ({
	title,
	description,
	placeholder,
	companies,
	onSelectCompany,
	onRemoveCompany,
	sendReject,
	sendRejectLabel,
	onChangeSendReject,
}: CompanyFilterSectionProps) => {
	return (
		<Flex alignItems="flex-start" justifyContent="space-between" gap={6} flexWrap="wrap">
			<Box flex="1" minW="260px">
				<Typo size="14px" weight="semibold" color={COLORS.GRAY_800}>
					{title}
				</Typo>
				<Box mt={1}>
					<Typo size="14px" weight="regular" color={COLORS.GRAY_500}>
						{description}
					</Typo>
				</Box>
				<Box mt={3}>
					<CompaniesWithSuggestions
						selectedCompanies={companies}
						onSelect={onSelectCompany}
						onRemove={onRemoveCompany}
						placeholder={placeholder}
					/>
				</Box>
			</Box>
			<Box minW="220px" textAlign="right">
				<Typo size="14px" weight="regular" color={COLORS.GRAY_800}>
					{sendRejectLabel}
				</Typo>
				<Box mt={2} display="flex" justifyContent="flex-end">
					<HeadingRadioGroup value={sendReject} onChange={onChangeSendReject} />
				</Box>
			</Box>
		</Flex>
	);
};
