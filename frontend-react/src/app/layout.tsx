import YandexMetrika from '@/components/sections/main/YandexMetrika';
import '@/styles/main.scss';
import type { Metadata, Viewport } from 'next';
import { Montserrat } from 'next/font/google';
import { headers } from 'next/headers';
import Script from 'next/script';

const montserrat = Montserrat({
	subsets: ['latin'],
	weight: ['400', '500', '600'],
	variable: '--font-montserrat',
});

export async function generateMetadata(): Promise<Metadata> {
	const headersList = await headers();
	const host = headersList.get('host');

	const isSubdomain = host && host !== 'brainhire.ru' && host.endsWith('.brainhire.ru');
	const isDev = !host?.includes('brainhire.ru');

	const shouldNoIndex = isSubdomain || isDev;

	return {
		title: 'HR AI | HR recruiter',
		icons: {
			icon: '/favicon.png',
		},
		other: {
			'yandex-verification': '65a5cbe8c1cb855b',
			'msvalidate.01': 'C9DDA84A1E340546F53286C948A651EE',
		},
		// Используем объединенное условие для установки мета-тега robots
		robots: shouldNoIndex ? 'noindex, nofollow' : 'index, follow',
	};
}

export const viewPort: Viewport = {
	width: 'device-width',
	initialScale: 1,
	viewportFit: 'cover',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// НЕ УБИРАТЬ, ИЗ-ЗА ОТСУТСТВИЯ ЭТОЙ СТРКОИ ПАДАЕТ БИЛД
	const headersList = await headers();

	
	return (
		<html lang="en">
			<head>
				<Script id="gtm-script" strategy="beforeInteractive">
					{`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-TXMBV9VM');
      `}
				</Script>

				<Script id="metrika-counter" strategy="afterInteractive">
					{`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
 
    ym(99950315, "init", {
          defer: true,
          clickmap:true,
          trackLinks:true,
          accurateTrackBounce:true,
          webvisor:true
    });`}
				</Script>
			</head>
			<body className={montserrat.variable}>
				<noscript>
					<iframe
						src="https://www.googletagmanager.com/ns.html?id=GTM-TXMBV9VM"
						height="0"
						width="0"
						style={{ display: 'none', visibility: 'hidden' }}
					></iframe>
				</noscript>
				<>{children}</>
				<YandexMetrika />
			</body>
		</html>
	);
}
