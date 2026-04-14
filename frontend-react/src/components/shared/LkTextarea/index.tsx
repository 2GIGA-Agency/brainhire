'use client';

import { Textarea, TextareaProps, InputGroup, chakra, Field } from '@chakra-ui/react';
import React, { ChangeEvent, useCallback } from 'react';

import TextareaAutosize from 'react-textarea-autosize';

const AutoResizeTextarea = chakra(TextareaAutosize as any);

export interface LkTextareaProps extends TextareaProps {
	placeholder?: string;
	value?: string | number;
	icon?: React.ReactElement;
	allowedChars?: RegExp;
	maxLength?: number;
	autoResize?: boolean;
	invalid?: boolean;
	errorText?: string;
	label?: string;
	required?: boolean;
	onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
	onBlur?: () => void;
}

const baseTextareaStyles: TextareaProps = {
	_focus: {
		outline: 'none',
		borderWidth: '1px',
		borderStyle: 'solid',
		borderColor: '#4299E1',
	},
	fontSize: '14px',
	paddingLeft: '15px',
	_disabled: { opacity: 0.7, cursor: 'not-allowed' },
	pt: '5px',
	minH: '80px',
	resize: 'vertical',
};

export const LkTextarea = React.memo(
	({
		placeholder = '',
		value = '',
		maxLength,
		allowedChars,
		autoResize = false,
		invalid = false,
		errorText,
		label,
		required = false,
		onChange,
		onBlur,
		...props
	}: LkTextareaProps) => {
		const filterInput = useCallback(
			(inputValue: string): string => {
				let filteredValue = inputValue;

				if (allowedChars) {
					filteredValue = filteredValue
						.split('')
						.filter((char) => allowedChars.test(char))
						.join('');
				}

				if (maxLength !== undefined && filteredValue.length > maxLength) {
					filteredValue = filteredValue.substring(0, maxLength);
				}

				return filteredValue;
			},
			[allowedChars, maxLength]
		);

		const handleChange = useCallback(
			(e: ChangeEvent<HTMLTextAreaElement>) => {
				if (allowedChars || maxLength) {
					const filteredValue = filterInput(e.target.value);

					// Проверяем, изменилось ли значение, чтобы избежать лишних вызовов onChange
					if (e.target.value !== filteredValue) {
						const syntheticEvent = {
							...e,
							target: { ...e.target, value: filteredValue },
							currentTarget: { ...e.currentTarget, value: filteredValue },
						};
						onChange?.(syntheticEvent as ChangeEvent<HTMLTextAreaElement>);
						return;
					}
				}

				onChange?.(e);
			},
			[allowedChars, maxLength, filterInput, onChange]
		);

		const textareaStyles = {
			...baseTextareaStyles,
			...(autoResize && { resize: 'none' }),
		};

		// Если есть label или errorText, оборачиваем в Field.Root
		if (label || errorText) {
			return (
				<Field.Root invalid={invalid}>
					{label && (
						<Field.Label>
							{label}
							{required && <Field.RequiredIndicator />}
						</Field.Label>
					)}

					<InputGroup>
						{autoResize ? (
							<AutoResizeTextarea
								fontSize={'16px'}
								w="100%"
								{...textareaStyles}
								resize="none"
								placeholder={placeholder}
								value={value}
								onChange={handleChange}
								onBlur={onBlur}
								{...props}
							/>
						) : (
							<Textarea
								fontSize={'16px'}
								{...textareaStyles}
								resize="vertical"
								placeholder={placeholder}
								value={value}
								onChange={handleChange}
								onBlur={onBlur}
								{...props}
							/>
						)}
					</InputGroup>

					{errorText && <Field.ErrorText>{errorText}</Field.ErrorText>}
				</Field.Root>
			);
		}

		// Без label и errorText - возвращаем просто textarea
		return (
			<InputGroup>
				{autoResize ? (
					<AutoResizeTextarea
						w="100%"
						{...textareaStyles}
						resize="none"
						placeholder={placeholder}
						value={value}
						onChange={handleChange}
						onBlur={onBlur}
						{...props}
					/>
				) : (
					<Textarea
						{...textareaStyles}
						resize="vertical"
						placeholder={placeholder}
						value={value}
						onChange={handleChange}
						onBlur={onBlur}
						{...props}
					/>
				)}
			</InputGroup>
		);
	}
);

LkTextarea.displayName = 'LkTextarea';
