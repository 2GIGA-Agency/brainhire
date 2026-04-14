import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { BaseSpinner } from '../BaseSpinner/BaseSpinner';

interface LoaderOverlayProps {
  isLoading: boolean;
  bgColor?: string;
  zIndex?: number;
}

export const OverlayLoader: React.FC<LoaderOverlayProps> = ({
  isLoading,
  bgColor = 'rgba(255, 255, 255, 0.6)',
  zIndex = 10,
}) => {
  if (!isLoading) return null;

  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      width="100%"
      height="100%"
      bg={bgColor}
      zIndex={zIndex}
    >
      <Flex w="100%" h="100%" align="center" justify="center">
        <BaseSpinner />
      </Flex>
    </Box>
  );
};
