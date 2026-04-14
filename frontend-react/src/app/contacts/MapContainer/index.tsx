'use client';

import { YandexMap } from '@/components/shared/YandexMap';
import { useResize } from '@/hooks/useResize';

export const MapContainer = () => {
	const [width] = useResize();

	const mapWidth = width < 768 ? '100vw' : '40vw';

	return <YandexMap width={mapWidth} height={'350px'} />;
};
