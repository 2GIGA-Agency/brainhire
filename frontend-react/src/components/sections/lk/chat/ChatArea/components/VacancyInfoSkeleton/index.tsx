import { Skeleton, Stack } from "@chakra-ui/react";

export const VacancyInfoSkeleton = () => (
	<Stack gap={2} width="100%">
		<Skeleton height="16px" width="40%" borderRadius="4px" />
		<Skeleton height="18px" width="80%" borderRadius="4px" />
	</Stack>
);
