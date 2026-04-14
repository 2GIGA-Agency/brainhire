import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { SkillsWithSuggestions } from '@/components/shared/SkillsWithSuggestions';
import {
    addGroup,
    addSkillToGroup,
    removeGroup,
    removeSkillFromGroup,
    selectSelectableSkillGroups,
    setGroupMinCount,
} from '@/store/slices/vacancyCreation/selectableSkillsSlice';
import { GroupHeader } from '@/components/shared/SelectableSkillsGroupHeader';
import {
    Box,
    Flex,
    IconButton,
    Separator,
} from '@chakra-ui/react';
import { COLORS } from '@/constants/colors';
import { Typo } from '@/components/shared/Typo/Typo';
import { LkButton } from '@/components/shared/LkButton';
import styles from './styles.module.scss';
import { CiCircleRemove } from 'react-icons/ci';
import { Tip } from '@/components/shared/Tip';


export const SelectableSkills = () => {
    const dispatch = useAppDispatch();
    const groups = useAppSelector(selectSelectableSkillGroups);
    const [minDrafts, setMinDrafts] = useState<Record<string, string>>({});

    const handleMinInputChange = (groupId: string, value: string) => {
        if (/^\d*$/.test(value)) {
            setMinDrafts((prev) => ({ ...prev, [groupId]: value }));
        }
    };

	const handleMinCommit = (groupId: string) => {
		const group = groups.find((g) => g.id === groupId);

		if (!group) {
			return;
		}

		const maxAllowed = Math.max(1, group.skills.length);

		const rawValue = minDrafts[groupId];
		const parsedValue = parseInt(rawValue, 10);

		let finalValue;
		if (Number.isFinite(parsedValue)) {
			finalValue = Math.max(1, Math.min(parsedValue, maxAllowed));
		} else {
			finalValue = Math.max(1, Math.min(group.minCount, maxAllowed));
		}

		dispatch(
			setGroupMinCount({
				groupId,
				minCount: finalValue,
			})
		);

		setMinDrafts((prev) => {
			const updated = { ...prev };
			delete updated[groupId];
			return updated;
		});
	};

    const handleRemoveGroup = (groupId: string) => {
        dispatch(removeGroup(groupId));
    };

    const handleSelectSkill = (groupId: string, payload: string) => {
        try {
            const { text } = JSON.parse(payload);
            dispatch(addSkillToGroup({ groupId, skillText: text }));
        } catch {
            dispatch(addSkillToGroup({ groupId, skillText: payload }));
        }
    };

    const handleRemoveSkill = (groupId: string, skillToRemove: string) => {
        dispatch(
            removeSkillFromGroup({
                groupId,
                skillText: skillToRemove,
            })
        );
    };

    const handleAddGroup = () => {
        dispatch(addGroup());
    };
    
    return (
        <Flex direction="column" gap={4}>
            {groups.map((group) => {
				const skillsCount = group.skills.length;
				const maxAllowed = Math.max(1, skillsCount);
				const effectiveMin = Math.max(1, Math.min(group.minCount, maxAllowed));

                return (
                    <Box key={group.id} className={styles.groupBox}>
                        <Flex alignItems="flex-start" justifyContent="space-between" gap={2}>
                            <GroupHeader
                                minCount={effectiveMin}
                                maxAllowed={maxAllowed}
                                skillsCount={skillsCount}
                                inputValue={
                                    Object.prototype.hasOwnProperty.call(minDrafts, group.id)
                                        ? minDrafts[group.id]
                                        : String(
                                            effectiveMin || 1
                                        )
                                }
                                onInputChange={(val) => handleMinInputChange(group.id, val)}
                                onCommit={() => handleMinCommit(group.id)}
                            />
                            <IconButton
                                aria-label="Удалить группу"
                                onClick={() => handleRemoveGroup(group.id)}
                                variant="ghost"
                                color={COLORS.GRAY_500}
                                _hover={{ color: COLORS.GRAY_700 }}
                            >
                                <CiCircleRemove size={22} />
                            </IconButton>
                        </Flex>

                        <Separator mt={3} mb={3} />

                        <SkillsWithSuggestions
                            isOutbound={false}
                            selectedSkills={group.skills}
                            placeholder="Добавьте навык и нажмите Enter"
                            onSelect={(payload) => handleSelectSkill(group.id, payload)}
                            onRemove={(skillToRemove) => handleRemoveSkill(group.id, skillToRemove)}
                        />
                    </Box>
                );
            })}


            <Flex alignItems="center" gap={2} mt={4}>
                <LkButton className={styles.addGroupButton} onClick={handleAddGroup}>
                    <Typo size="14px" weight="semibold" color={COLORS.WHITE}>
                        + Добавить вариативный навык(и)
                    </Typo>
                </LkButton>
                <Tip
                    placement="right"
                    questionIconSize={18}
                    content={
                        <Box>
                            <Typo size="14px" weight="regular">
                                Здесь вы можете ввести наборы навыков и выбрать,
                                сколькими (1+) из списка ДОЛЖЕН обладать кандидат.
                                (Например, если вам нужен человек, знающий 2 иностранных языка,
                                вы можете указать английский, испанский, китайский и поставить «2»).                            
                            </Typo>
                        </Box>
                    }
                />
            </Flex>
        </Flex>
    );
};
