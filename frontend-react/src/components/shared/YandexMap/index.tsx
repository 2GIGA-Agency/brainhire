'use client';

import { YMaps, Map, Placemark } from '@iminside/react-yandex-maps';

const position = [55.439395, 37.750065];

interface Props {
	width: string;
	height: string;
}

export const YandexMap = ({ width, height }: Props) => (
	<YMaps>
		<div>
			<Map defaultState={{ center: position, zoom: 16 }} width={width} height={height}>
				<Placemark geometry={position} />
			</Map>
		</div>
	</YMaps>
);
