// RejectSettingsBlock.tsx
import { Block } from '@/components/shared/Block';
import { useState } from 'react';
import clsx from 'clsx';
import styles from './style.module.scss';
import { rejectOptions } from './lib/const';
import type { RejectOption } from './types';
import { Flex } from '@chakra-ui/react';
import { Typo } from '@/components/shared/Typo/Typo';
import { COLORS } from '@/constants/colors';
import { useAppSelector } from '@/store/store';
import { selectIsTipsShow } from '@/store/slices/appSlice';
import { Tip } from '@/components/shared/Tip';

export function RejectSettingsBlock() {
	const [selectedOption, setSelectedOption] = useState<RejectOption>('manual');

	const isTipsShow = useAppSelector(selectIsTipsShow);

	return (
		<Block
			heading={
				<Flex alignItems="center" gap={2}>
					<Typo size="16px" weight="medium">
						Настройка отказов
					</Typo>
					{isTipsShow && (
						<Tip
							placement="right"
							content={
								<>
									<Typo color={COLORS.GRAY_800} weight="medium">
										Выберите, как система будет отправлять отказы кандидатам. Настройка применяется
										глобально для всех вакансий.
									</Typo>
								</>
							}
						/>
					)}
				</Flex>
			}
		>
			<div className={styles.optionsContainer}>
				{rejectOptions.map(({ id, title, description }) => {
					const isSelected = selectedOption === id;

					return (
						<div key={id} className={styles.optionWrapper}>
							<input
								type="radio"
								id={`reject-option-${id}`}
								name="reject-option"
								checked={isSelected}
								onChange={() => setSelectedOption(id)}
								className={styles.hiddenInput}
							/>

							<label htmlFor={`reject-option-${id}`} className={styles.optionLabel}>
								<div className={styles.radioIndicator}>
									<div className={clsx(styles.radioOuter, isSelected && styles.radioOuterSelected)}>
										{isSelected && <div className={styles.radioInner} />}
									</div>
								</div>

								<div
									className={clsx(styles.optionContent, isSelected && styles.optionContentSelected)}
								>
									<h3 className={styles.optionTitle}>{title}</h3>
									<div className={styles.optionDescription}>
										{description.map((line, index) => (
											<p key={index} className={styles.descriptionLine}>
												{line}
											</p>
										))}
									</div>
								</div>
							</label>
						</div>
					);
				})}
			</div>
		</Block>
	);
}
