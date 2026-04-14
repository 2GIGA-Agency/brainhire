// app/pdf-page/page.tsx
export default function AdConsent() {
	return (
		<iframe
			src="/files/ad-consent.pdf"
			style={{ width: '100vw', height: '100vh' }}
			title="PDF Документ"
		/>
	);
}
