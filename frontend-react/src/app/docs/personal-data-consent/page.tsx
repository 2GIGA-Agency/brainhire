// app/docs/personal-data-consent/page.tsx
export default function PersonalDataConsent() {
	return (
		<iframe
			src="/files/personal-data-consent.pdf"
			style={{ width: '100vw', height: '100vh' }}
			title="Согласие на обработку данных"
		/>
	);
}
