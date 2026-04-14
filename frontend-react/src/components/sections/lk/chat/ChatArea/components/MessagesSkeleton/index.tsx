import { COLORS } from "@/constants/colors";
import styles from "./style.module.scss"
import { Box, Skeleton } from "@chakra-ui/react";
import { MessageSkeleton } from "../MessageSkeleton";


export const MessagesSkeleton = () => (
  <Box className={styles.messagesInner}>
    <Box className={styles.dateDivider}>
      <Skeleton
        height="16px"
        width="120px"
        margin="0 auto"
        borderRadius="12px"
        css={{
          '--end-color': COLORS.GRAY_300,
        }}
      />
    </Box>
    <MessageSkeleton isOutbound={true} />
    <MessageSkeleton isOutbound={false} />
    <MessageSkeleton isOutbound={true} />
    <MessageSkeleton isOutbound={true} />
    <MessageSkeleton isOutbound={false} />

    <MessageSkeleton isOutbound={true} />
  </Box>
);