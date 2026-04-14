import { Box } from "@chakra-ui/react";

interface Props {
    children: React.ReactNode;
}

export function InterviewMessageBox ({children}: Props) {
    return <Box bgColor="#EDF2F7" borderRadius="16px" padding="8px 12px">
        {children}
    </Box>
}