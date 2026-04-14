import { Block } from '@/components/shared/Block';
import { RootState, useAppDispatch, useAppSelector } from '@/store/store';
import { Flex } from '@chakra-ui/react';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { Heading } from './Heading';
import { HeadingRadioGroup } from './HeadingRadioGroup';

import { IPatternItem, PatternItem } from '../PatternItem';

interface Props {
	text: string;
	tooltipText?: string;
	selector: (state: RootState) => boolean;
	actionCreator: ActionCreatorWithPayload<boolean, string>;
	patterns?: IPatternItem[];
}

export function RadioChoice({ text, tooltipText, selector, actionCreator, patterns }: Props) {
	const value = useAppSelector(selector);
	const dispatch = useAppDispatch();
	const handleChange = (choice: boolean) => {
		dispatch(actionCreator(choice));
	};

	return (
		<Block
			heading={
				<Flex justifyContent="space-between" w="100%" mt={2}>
					<Heading text={text} tooltipText={tooltipText} />
					<HeadingRadioGroup value={value} onChange={handleChange} />
				</Flex>
			}
			showSeparator={false}
		>
			{/* Условный рендеринг: показываем блок с шаблонами только если переключатель в положении "Да" */}
			{value &&
				patterns &&
				patterns.map((patternProps, idx) => {
					return (
						<Flex display={'flex'} key={idx} flexDirection={'column'} gap={4} mt={12}>
							<PatternItem {...patternProps} />
							{idx !== patterns.length - 1 && <br />}
						</Flex>
					);
				})}
		</Block>
	);
}
