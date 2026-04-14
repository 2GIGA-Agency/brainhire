// src/components/sections/lk/vacancy/create/InterviewQuestion.tsx
'use client';

import { Box, Flex } from '@chakra-ui/react';
import { FiTrash2 } from 'react-icons/fi';
import { Typo } from '../Typo/Typo';
import { LkTextarea } from '../LkTextarea';

interface Props {
	// isCommon?: boolean; TODO: Пока не реализовано на беке
	label: string;
	content: string;
	onChange?: (content: string) => void;
	onDelete?: () => void;
	invalid?: boolean;
}

export const InterviewQuestion = ({
	// isCommon = false, Пока не реализовано на беке
	label,
	content,
	onChange,
	onDelete,
	invalid = false,
}: Props) => {
	return (
		<Box>
			<Flex gap="12px" mb="8px" alignItems="center">
				<Typo size="16px" weight="semibold">
					{label}
				</Typo>
				{/* {isCommon && ( TODO: Пока не реализовано не беке
						<Tooltip
							content="Этот вопрос не будет оценен ИИ"
							showArrow={true}
							positioning={{ placement: 'top' }}
						>
							<HiOutlineQuestionMarkCircle />
						</Tooltip>
					)} */}
				<FiTrash2 onClick={onDelete} color="#ccc" cursor="pointer" />
			</Flex>
			<LkTextarea
				placeholder="Введите ваш вопрос"
				value={content}
				onChange={(e) => onChange?.(e.target.value)}
				errorText={invalid ? 'Текст вопроса не может быть пустым' : undefined}
				invalid={invalid}
			/>
		</Box>
	);
};
