// hooks/useMobileDetect.ts

import { useMobileDetect } from "@/hooks/useMobileDetect";

export const useMobileCheck = () => {
	const isMobile = useMobileDetect(630);
	return isMobile;
};