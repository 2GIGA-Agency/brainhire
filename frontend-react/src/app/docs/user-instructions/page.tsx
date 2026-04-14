// app/docs/user-instructions/page.tsx
export default function UserInstructions() {
	return (
		<iframe
			src="/files/user-instructions.pdf" // или путь из USER_INSTRUCTIONS_LINK
			style={{ width: '100vw', height: '100vh' }}
			title="Инструкция по установке и эксплуатации ПО"
		/>
	);
}
