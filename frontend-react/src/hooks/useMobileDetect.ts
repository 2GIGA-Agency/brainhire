// hooks/useMobileDetect.ts

import { useResize } from '@/hooks/useResize';

export const useMobileDetect = (breakpoint: number) => {
	const [width] = useResize();
	return width <= breakpoint;
};
