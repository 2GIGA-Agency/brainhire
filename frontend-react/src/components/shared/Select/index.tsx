'use client';

import { Select as ChakraSelect, createListCollection, Field, Portal } from '@chakra-ui/react';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface Option {
	label: string;
	value: string;
}

interface FormSelectProps {
	name: string;
	label: string;
	control: any;
	rules?: Record<string, any>;
	options: Option[];
	placeholder?: string;
	mb?: number | string;
	tabIndex?: number;
}

export const FormSelect: React.FC<FormSelectProps> = ({
	name,
	label,
	control,
	rules = {},
	options,
	placeholder = 'Выберите из списка',
	mb = 3,
	tabIndex,
}) => {
	const {
		formState: { errors },
	} = useFormContext();

	const collection = createListCollection({ items: options });

	// @ts-ignore
	const errorMessage: string | undefined = name
		.split('.')
		.reduce((acc, key) => acc?.[key], errors)?.message;

	return (
		<Field.Root invalid={!!errorMessage} mb={mb}>
			<Field.Label>
				{label}
				<Field.RequiredIndicator />
			</Field.Label>

			<Controller
				control={control}
				name={name}
				rules={rules}
				render={({ field }) => (
					<ChakraSelect.Root
						name={field.name}
						multiple={false}
						value={field.value}
						onValueChange={({ value }) => field.onChange(value)}
						onInteractOutside={() => field.onBlur()}
						collection={collection}
					>
						<ChakraSelect.HiddenSelect />
						<ChakraSelect.Control bg="white">
							<ChakraSelect.Trigger tabIndex={tabIndex}>
								<ChakraSelect.ValueText placeholder={placeholder} />
							</ChakraSelect.Trigger>
							<ChakraSelect.IndicatorGroup>
								<ChakraSelect.Indicator />
							</ChakraSelect.IndicatorGroup>
						</ChakraSelect.Control>

						<Portal>
							<ChakraSelect.Positioner>
								<ChakraSelect.Content>
									{collection.items.map((item) => (
										<ChakraSelect.Item item={item} key={item.value}>
											{item.label}
											<ChakraSelect.ItemIndicator />
										</ChakraSelect.Item>
									))}
								</ChakraSelect.Content>
							</ChakraSelect.Positioner>
						</Portal>
					</ChakraSelect.Root>
				)}
			/>

			<Field.ErrorText>{errorMessage}</Field.ErrorText>
		</Field.Root>
	);
};
