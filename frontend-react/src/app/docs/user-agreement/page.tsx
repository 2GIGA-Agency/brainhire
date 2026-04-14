// app/docs/user-agreement/page.tsx
export default function UserAgreement() {
	return (
		<iframe
			src="/files/user-agreement.pdf"
			style={{ width: '100vw', height: '100vh' }}
			title="Пользовательское соглашение"
		/>
	);
}
