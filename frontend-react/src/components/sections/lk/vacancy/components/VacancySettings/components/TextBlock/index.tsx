import { Block } from '@/components/shared/Block';
import {
	VacancySettingsActionCreator,
	VacancySettingsSelector,
} from '@/store/slices/vacancyCreation/vacancySettings/vacancySettingsSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Textarea } from '@chakra-ui/react';
import { Heading } from '../Heading';
import { ChangeEvent } from 'react';

interface Props {
	text: string;
	tooltipText: string;
	placeholder: string;
	action: VacancySettingsActionCreator;
	selector: VacancySettingsSelector;
}

export function TextBlock({ text, tooltipText, action, placeholder, selector }: Props) {
	const dispatch = useAppDispatch();
	const value = useAppSelector(selector);

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		dispatch(action(e.target.value));
	};

	return (
		<Block headingText={<Heading text={text} tooltipText={tooltipText} />}>
			<Textarea
				autoresize
				resize="vertical"
				value={value}
				placeholder={placeholder}
				onChange={handleChange}
			/>
		</Block>
	);
}
