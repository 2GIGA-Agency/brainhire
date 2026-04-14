'use client';

import { useParams } from 'next/navigation';
import { ContentSpinner } from '@/components/shared/ContentSpinner';
import { FinanceForm } from './components/FinanceForm';

export default function ViewFinancePage() {
	const params = useParams();
	const id = Array.isArray(params.id) ? params.id[0] : params.id;

	if (!id) {
		return <ContentSpinner />; // или null
	}

	return <FinanceForm mode="view" id={id} />;
}
