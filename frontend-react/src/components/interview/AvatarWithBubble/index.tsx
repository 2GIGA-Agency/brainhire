import { Box, BoxProps, Flex } from "@chakra-ui/react";
import styles from "./styles.module.scss";
import { VideoAvatar } from "@/components/shared/VideoAvatar";
import { ChatBubble } from "@/components/shared/CharBubble";
import React from "react";

interface Props extends BoxProps{
    text: string | React.ReactNode;
}

export function AvatarWithBubble({text, ...props}: Props) {
    return (
        <Box className={styles.wrapper} {...props}>
                <Flex alignItems="flex-end" h="100%">
                    <VideoAvatar />
                </Flex>
                <ChatBubble>
                    {text}
                </ChatBubble>
            </Box>
    )
}