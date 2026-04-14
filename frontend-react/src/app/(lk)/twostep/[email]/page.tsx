import type { Metadata } from 'next';
import { ClientTwoStep } from './ClientTwoStep';

export const metadata: Metadata = {
	title: 'Подтверждение входа',
	robots: {
		index: false,
		follow: false,
	},
};

export default function TwoStep() {
	return <ClientTwoStep />;
}
