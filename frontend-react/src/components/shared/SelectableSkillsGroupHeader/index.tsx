import {
    Box,
    Flex,
    NumberInputRoot,
    NumberInputInput,
    NumberInputControl,
    NumberInputIncrementTrigger,
    NumberInputDecrementTrigger,
} from '@chakra-ui/react';
import { Typo } from '@/components/shared/Typo/Typo';
import { Tip } from '@/components/shared/Tip';


export const GroupHeader = ({
    maxAllowed,
    skillsCount,
    inputValue,
    onInputChange,
    onCommit,
}: {
    minCount: number;
    onMinChange: (value: number) => void;
    maxAllowed: number;
    skillsCount: number;
    inputValue: string;
    onInputChange: (value: string) => void;
    onCommit: () => void;
}) => {
    const canUseMin = skillsCount > 0;

    return (
        <Flex alignItems="center" gap={6} flexWrap="wrap">
            <Typo size="14px" weight="regular">
                Не менее
            </Typo>
            <Flex alignItems="center" gap={2} whiteSpace="nowrap">
                <NumberInputRoot
                    value={inputValue}
                    min={1}
                    max={maxAllowed}
                    step={1}
                    onValueChange={(detail) => {
                        const v = detail.value ?? '';
                        if (/^\d*$/.test(v)) onInputChange(v);
                    }}
                    disabled={!canUseMin}
                >
                    <NumberInputInput
                        width="64px"
                        paddingInlineStart={2}
                        paddingInlineEnd={2}
                        onBlur={onCommit}
                    />
                    <NumberInputControl>
                        <NumberInputIncrementTrigger onClick={onCommit} />
                        <NumberInputDecrementTrigger onClick={onCommit} />
                    </NumberInputControl>
                </NumberInputRoot>
                <Typo size="14px" weight="regular">
                    из списка
                </Typo>
                <Tip
                    placement="top"
                    questionIconSize={16}
                    content={
                        <Box>
                            <Typo size="14px" weight="regular">
                                Доступный диапазон: от 1 до количества навыков в группе.
                            </Typo>
                        </Box>
                    }
                />
            </Flex>
        </Flex>
    );
};
