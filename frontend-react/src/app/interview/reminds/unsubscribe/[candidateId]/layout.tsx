'use client';

import { ReactNode } from 'react';

import { Provider } from '@/components/ui/provider';
import { Provider as RTKProvider } from 'react-redux';

import { store } from '@/store/store';

export default function InterviewLayout({ children }: { children: ReactNode }) {
	return (
		<RTKProvider store={store}>
			<Provider>
				<main>
					<div>{children}</div>
				</main>
			</Provider>
		</RTKProvider>
	);
}
