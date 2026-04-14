// hooks/useChatScroll.ts
import { useLayoutEffect, useRef } from 'react';

export const useChatScroll = (dep: any, isLoading: boolean) => {
	const scrollRef = useRef<HTMLDivElement | null>(null);

	useLayoutEffect(() => {
		if (scrollRef.current && !isLoading) {
			scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
		}
	}, [dep, isLoading]);

	return scrollRef;
};
