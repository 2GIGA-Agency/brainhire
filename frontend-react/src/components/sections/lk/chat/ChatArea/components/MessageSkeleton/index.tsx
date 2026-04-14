import { COLORS } from "@/constants/colors";
import { Box, SkeletonText } from "@chakra-ui/react";
import styles from "./style.module.scss"

export const MessageSkeleton = ({ isOutbound = false }: { isOutbound?: boolean }) => (
  <Box className={isOutbound ? styles.messageOutbound : styles.messageInbound}>
    <Box
      className={styles.bubble}
      height={140}
      width={400}
      backgroundColor={isOutbound ? COLORS.BLUE_50 : COLORS.GRAY_50}
    >
      <SkeletonText noOfLines={5} gap={2} />
    </Box>
  </Box>
);