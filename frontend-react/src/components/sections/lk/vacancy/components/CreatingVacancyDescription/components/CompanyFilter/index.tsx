import React, { useCallback } from 'react';
import { Block } from '@/components/shared/Block';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
	addWhitelistCompany,
	removeWhitelistCompany,
	addBlacklistCompany,
	removeBlacklistCompany,
	setWhitelistSendReject,
	setBlacklistSendReject,
	selectCompanyFilter,
} from '@/store/slices/vacancyCreation/companyFilterSlice';
import { Box, Flex, Separator } from '@chakra-ui/react';
import { CompanyFilterSection } from './CompanyFilterSection';

export const CompanyFilter = () => {
	const dispatch = useAppDispatch();
	const { whitelist, blacklist } = useAppSelector(selectCompanyFilter);

	const handleAddWhitelistCompany = useCallback(
		(name: string) => {
			dispatch(addWhitelistCompany(name));
		},
		[dispatch]
	);

	const handleAddBlacklistCompany = useCallback(
		(name: string) => {
			dispatch(addBlacklistCompany(name));
		},
		[dispatch]
	);

	const handleRemoveWhitelistCompany = useCallback(
		(name: string) => {
			dispatch(removeWhitelistCompany(name));
		},
		[dispatch]
	);

	const handleRemoveBlacklistCompany = useCallback(
		(name: string) => {
			dispatch(removeBlacklistCompany(name));
		},
		[dispatch]
	);

	return (
		<Block
			headingText="Фильтр по компаниям"
			subHeadingText="Добавьте компании в whitelist или blacklist для более точного отбора кандидатов."
		>
			<Flex direction="column" gap={6}>
				<CompanyFilterSection
					title="Обязательные компании (Whitelist)"
					description="Кандидат должен был работать хотя бы в одной из этих компаний. Например: «Вкусвилл»."
					placeholder="Добавить компанию в whitelist"
					companies={whitelist.companies}
					onSelectCompany={handleAddWhitelistCompany}
					onRemoveCompany={handleRemoveWhitelistCompany}
					sendReject={whitelist.sendReject}
					sendRejectLabel="Отправлять отказ при несовпадении?"
					onChangeSendReject={(value) => dispatch(setWhitelistSendReject(value))}
				/>

				<Box px="8px">
					<Separator />
				</Box>

				<CompanyFilterSection
					title="Исключающие компании (Blacklist)"
					description="Кандидаты, работавшие в этих компаниях, не будут допущены. Например: «Фимам»."
					placeholder="Добавить компанию в blacklist"
					companies={blacklist.companies}
					onSelectCompany={handleAddBlacklistCompany}
					onRemoveCompany={handleRemoveBlacklistCompany}
					sendReject={blacklist.sendReject}
					sendRejectLabel="Отправлять отказ при совпадении?"
					onChangeSendReject={(value) => dispatch(setBlacklistSendReject(value))}
				/>
			</Flex>
		</Block>
	);
};
