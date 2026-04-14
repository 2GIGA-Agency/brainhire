// app/docs/product-description/page.tsx
export default function ProductDescription() {
	return (
		<iframe
			src="/files/product-description.pdf" // или путь из PRODUCT_DESCRIPTION_LINK
			style={{ width: '100vw', height: '100vh' }}
			title="Описание функциональных характеристик ПО"
		/>
	);
}
