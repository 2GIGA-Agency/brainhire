import type { Metadata } from 'next';
import { ClientSignUp } from './ClientSignUp';

export const metadata: Metadata = {
	title: 'Вход в систему',
	robots: {
		index: false,
		follow: false,
	},
};

export default function SignUp() {
	return <ClientSignUp />;
}
