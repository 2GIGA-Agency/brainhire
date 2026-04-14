import type { Metadata } from 'next';
import { ClientLogin } from './ClientLogin';

export const metadata: Metadata = {
	title: 'Авторизация',
	robots: {
		index: false,
		follow: false,
	},
};

export default function TwoStep() {
	return <ClientLogin />;
}
