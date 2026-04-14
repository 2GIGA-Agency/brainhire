'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import styles from './Clients.module.scss';

// 1. Создаем единый объект для всех данных клиентов
const clientsData = {
	luxgranit: {
		href: 'https://luxgranit.ru/',
		logo: '/images/logo1-new.avif',
		width: 100,
	},
	medexpert: {
		href: 'https://medexpertpodolsk.ru/',
		logo: '/images/klinika.avif',
		width: 170,
	},
	speckrovlya: {
		href: 'https://spec-krovlya.ru/',
		logo: '/images/speckrovlya.avif',
		width: 60,
	},
	rostelecom: {
		href: 'https://kazan.rt.ru/',
		logo: '/images/rostelecom.avif',
		width: 100,
	},
	pshb: {
		href: 'https://pshb.ru/',
		logo: '/images/pshb.avif',
		width: 100,
	},
	waithaispa: {
		href: 'https://waithaispa.ru/',
		logo: '/images/vaitai.avif',
		width: 55,
	},
	sogenis: {
		href: 'https://sogenis.ru/company?ysclid=mdcta2keb0576673594',
		logo: '/images/sogenis.avif',
		width: 100,
	},
	hrrocket: {
		href: 'https://www.hr-rocket.ru/',
		logo: 'https://static.tildacdn.com/tild6166-6436-4536-a636-333265623862/Layer_1.svg',
		width: 100,
	},
	simbirsoft: {
		href: 'https://www.simbirsoft.com/?ysclid=mdcsx9z5am320849157',
		logo: '/images/simbirsoft.png',
		width: 100,
	},
	eflops: {
		href: 'https://e-flops.ru/',
		logo: 'https://e-flops.ru/local/templates/eflops/assets/img/logo.svg',
		width: 100,
	},
	ledgo: {
		href: 'https://ledgo.ru/',
		logo: '/images/ledgo.avif',
		width: 100,
	},
	socmediamarketing: {
		href: 'https://socmediamarketing.ru/',
		logo: '/images/socmedia.jpg',
		width: 100,
	},
	ineti: {
		href: 'https://erpdev.i-neti.ru/',
		logo: 'https://erpdev.i-neti.ru/wp-content/uploads/2023/04/logo_grey.svg',
		width: 100,
	},
	lidervann: {
		href: 'https://lidervann.ru/',
		logo: '/images/lidervan.png',
		width: 100,
	},
	smhgroup: {
		href: 'https://www.smh-group.ru/',
		logo: 'https://www.smh-group.ru/logo.svg',
		width: 100,
	},
	bssys: {
		href: 'https://bssys.com/',
		logo: 'https://bssys.com/img/logo-2023.svg',
		width: 80,
	},
	pritomyehotel: {
		href: 'https://pritomyehotel.ru/',
		logo: 'https://static.tildacdn.com/tild3161-3533-4734-b964-636566376537/logo.png',
		width: 100,
	},
	itpeoplegroup: {
		href: 'https://itpeoplegroup.ru/',
		logo: 'https://static.tildacdn.com/tild3532-6237-4865-a532-393432336435/Group_1.png',
		width: 100,
	},
	legke: {
		href: 'https://legke.ru/',
		logo: '/images/nalegke.svg',
		width: 100,
	},
	udcauto: {
		href: 'https://udc-auto.com/',
		logo: 'https://udc-auto.com/wp-content/uploads/2019/06/logo-wh.png',
		width: 70,
	},
	logic3: {
		href: 'https://3logic.ru/',
		logo: 'https://3logic.ru/local/templates/corporate.marketing/build/assets/images/logo.svg',
		width: 70,
	},
	mobyestate: {
		href: 'https://moby.estate/',
		logo: 'https://moby.estate/Moby_LOGO_main_RGB.png',
		width: 100,
	},
	proektimebel: {
		href: 'https://proektika-mebel.ru/',
		logo: 'https://proektika-mebel.ru/local/templates/liof/img/Liof.svg',
		width: 100,
	},
	radelta: {
		href: 'https://ra-delta.ru',
		logo: '/images/delta.png',
		width: 50,
	},
	sergiostefano: {
		href: 'https://sergiostefano.ru/',
		logo: 'https://sergiostefano.ru/images/logo_tablet.png',
		width: 120,
	},
	etiz: {
		href: 'https://etiz.ru/',
		logo: 'https://etiz.ru/local/templates/ameton1/img/logo.svg',
		width: 100,
	},
	livecargo: {
		href: 'https://livecargo.ru/',
		logo: 'https://livecargo.ru/static/media/logo.f4c0bde925f527abcb3afc446ee7b9eb.svg',
		width: 100,
	},
	lzvo: {
		href: 'https://lzvo.pro/',
		logo: '/images/lzvo.svg',
		width: 100,
	},
	sberbank: {
		href: 'https://www.sberbank.com/ru',
		logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAzIiBoZWlnaHQ9IjE3IiB2aWV3Qm94PSIwIDAgMTAzIDE3IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPiA8cGF0aCBkPSJNNDYuMDU0NCA0LjkwNzI3TDQ4LjIwMTUgMy4zMDgxSDQxLjAxMzNWMTIuODg3NUg0OC4yMDE1VjExLjI4ODNINDMuMDY3MVY4Ljg0MjQ5SDQ3LjQ1NDdWNy4yNDMzMkg0My4wNjcxVjQuOTA3MjdINDYuMDU0NFoiIGZpbGw9IiMyMUEwMzgiLz4gPHBhdGggZD0iTTM1LjU4MzIgNy4wMzk1SDMzLjA5MzhWNC45MDcyN0gzNy4wNzY5TDM5LjIyNCAzLjMwODFIMzEuMDRWMTIuODg3NUgzNS4zMTg3QzM3LjcxNDggMTIuODg3NSAzOS4wOTk1IDExLjc5IDM5LjA5OTUgOS44NzcyNUMzOS4wOTk1IDguMDQyOSAzNy44NTQ4IDcuMDM9NSAzNS41ODMyIDcuMDM5NVpNMzUuMjQwOSAxMS4yODgzSDMzLjA5MzhWOC42Mzg2OEgzNS4yNDA5QzM2LjU0NzkgOC42Mzg2OCAzNy4xNTQ3IDkuMDc3NjYgMzcuMTU0NyA5Ljk3MTMyQzM3LjE1NDcgMTAuODY1IDM2LjUwMTIgMTEuMjg4MyAzNS4yNDA5IDExLjI4ODNaIiBmaWxsPSIjMjFBMDM4Ii8+IDxwYXRoIGQ9Ik01NC4wMjA1IDMuMzA4MUg1MC4xMTUzVjEyLjg4NzVINTIuMTY5VjEwLjE3NTFINTQuMDM2MUM1Ni41MjU1IDEwLjE3NTEgNTguMDgxNCA4Ljg1ODE3IDU4LjA4MTQgNi43NDE2MkM1OC4wODE0IDQuNjI1MDYgNTYuNTI1NSAzLjMwODEgNTQuMDIwNSAzLjMwODFaTTUzLjk3MzkgOC41NzU5Nkg1Mi4xNTM1VjQuOTA3MjdINTMuOTczOUM1NS4yOTY0IDQuOTA3MjcgNTYuMDEyMSA1LjU2NTc1IDU2LjAxMjEgNi43NDE2MkM1Ni4wMTIxIDcuOTE3NDggNTUuMjk2NCA4LjU3NTk2IDUzLjk3MzkgOC41NzU5NloiIGZpbGw9IiMyMUEwMzgiLz4gPHBhdGggZD0iTTI3LjUyMzcgMTAuODE3OUMyNi45NzkyIDExLjExNTggMjYuMzcyNCAxMS4yNzI2IDI1Ljc1IDExLjI3MjZDMjMuODk4NSAxMS4yNzI2IDIyLjU2MDQgOS45Mzk5NiAyMi41NjA0IDguMTA1NjJDMjIuNTYwNCA2LjI3MTI3IDIzLjg5ODUgNC45Mzg2MyAyNS43NSA0LjkzODYzQzI2LjQxOSA0LjkyMjk1IDI3LjA3MjUgNS4xNDI0NCAyNy42MTcxIDUuNTM0NEwyOS4wOTUyIDQuNDM2OTJMMjkuMDAxOCA0LjM0Mjg1QzI4LjE0NjEgMy41NzQ2MiAyNi45OTQ3IDMuMTgyNjcgMjUuNjg3OCAzLjE4MjY3QzI0LjI3MTkgMy4xODI2NyAyMi45ODA1IDMuNjY4NjkgMjIuMDQ3IDQuNTQ2NjdDMjEuMTEzNCA1LjQ1NjAxIDIwLjU4NDQgNi43MjU5NCAyMC42MTU2IDguMDQyOUMyMC42IDkuMzc1NTUgMjEuMTEzNCAxMC42NjEyIDIyLjA0NyAxMS42MDE4QzIzLjAyNzIgMTIuNTI2OSAyNC4zMzQxIDEzLjA0NDIgMjUuNjcyMiAxMy4wMTI5QzI3LjE1MDMgMTMuMDEyOSAyOC40NDE3IDEyLjQ5NTUgMjkuMzEzIDExLjU1NDhMMjcuOTkwNSAxMC41NjcxTDI3LjUyMzcgMTAuODE3OVoiIGZpbGw9IiMyMUEwMzgiLz4gPHBhdGggZD0iTTgyLjc3MzQgMy4zMjM3OFYxMi45MDMxSDg0LjgyNzJWOC45ODM1OUg4OS4xOTkyVjEyLjkwMzFIOTEuMjUzVjMuMzIzNzhIODkuMTk5MlY3LjI1OUg4NC44MjcyVjMuMzIzNzhIODIuNzczNFpNNzkuMjQxNSAxMi45MDMxSDgxLjQwNDJMNzcuMzkgMy4zMjM3OEg3NS4zMDUxTDcxLjIxMzEgMTIuOTAzMUg3My4yODI1TDc0LjEwNzEgMTAuOTc0N0g3OC40NjM2TDc5LjI0MTUgMTIuOTAzMVpNNzQuNzI5NSA5LjM3NTU1TDc2LjMxNjUgNS41MzQ0TDc3LjgxMDEgOS4zNzU1NUg3NC43Mjk1Wk05NS44NTg1IDkuMDMwNjNIOTcuMTM0M0wxMDAuMjc3IDEyLjg4NzVIMTAyLjkyMkw5OC43MjEzIDcuOTMzMTZMMTAyLjM5MyAzLjMwODFIMTAwLjA0NEw5Ni45OTQzIDcuNDE1NzhIOTUuODU4NVYzLjMwODFIOTMuODA0N1YxMi44ODc1SDk1Ljg1ODVWOS4wMzA2M1pNNjQuNDI5NSA3LjA1NTE4VjQuOTIyOTVINjkuNzk3M1YzLjMyMzc4SDYyLjM3NTdWMTIuOTAzMUg2Ni42NTQ0QzY5LjA1MDUgMTIuOTAzMSA3MC40MzUyIDExLjgwNTcgNzAuNDM1MiA5Ljg5MjkzQzcwLjQzNTIgOC4wNTg1OCA2OS4xOTA1IDcuMDU1MTggNjYuOTE4OSA3LjA1NTE4SDY0LjQyOTVaTTY0LjQyOTUgMTEuMzA0VjguNjU0MzVINjYuNTc2NkM2Ny44ODM1IDguNjU0MzUgNjguNDkwMyA5LjA5MzM0IDY4LjQ5MDMgOS45ODdDNjguNDkwMyAxMC44ODA3IDY3Ljg1MjQgMTEuMzE5NiA2Ni41NzY2IDExLjMxOTZINjQuNDI5NVYxMS4zMDRaIiBmaWxsPSIjMjFBMDM4Ii8+IDxwYXRoIGQ9Ik0xNC4xODk3IDMuMjQ1MzhDMTQuNTYzMSAzLjczMTQxIDE0Ljg3NDMgNC4yNjQ0NyAxNS4xMzg4IDQuODI4ODhMNy45NTA2IDEwLjE3NTFMNC45MzIxNyA4LjI2MjRWNS45NzMzOUw3LjkzNTA0IDcuODcwNDRMMTQuMTg5NyAzLjI0NTM4WiIgZmlsbD0iIzIxQTAzOCIvPiA8cGF0aCBkPSJNMS44NjcwNyA4LjEwNTYyQzEuODY3MDcgNy45OTU4NyAxLjg2NzA3IDcuOTAxOCAxLjg4MjYzIDcuNzkyMDVMMC4wNjIyMzU1IDcuNjk3OThDMC4wNjIyMzU1IDcuODIzNDEgMC4wNDY2NzY2IDcuOTY0NTEgMC4wNDY2NzY2IDguMDg5OTRDMC4wNDY2NzY2IDEwLjI4NDkgMC45MzM1MzUgMTIuMjc2IDIuMzY0OTUgMTMuNzE4NEwzLjY1NjM0IDEyLjQxNzFDMi41NTE2NiAxMS4zMTk2IDEuODY3MDcgOS43OTg4NiAxLjg2NzA3IDguMTA1NjJaIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfNDU0Xzg4ODcpIi8+IDxwYXRoIGQ9Ik03LjkzNTA1IDEuOTkxMTNDOC4wNDM5NiAxLjk5MTEzIDguMTM3MzIgMS45OTExMyA4LjI0NjIzIDIuMDA2ODFMOC4zMzk1OCAwLjE3MjQ2MkM4LjIxNTExIDAuMTcyNDYyIDguMDc1MDggMC4xNTY3ODQgNy45NTA2MSAwLjE1Njc4NEM1Ljc3MjM2IDAuMTU2Nzg0IDMuNzk2MzggMS4wNTA0NCAyLjM2NDk2IDIuNDkyODNMMy42NTYzNSAzLjc5NDEyQzQuNzQ1NDcgMi42ODA5NyA2LjI3MDI1IDEuOTkxMTMgNy45MzUwNSAxLjk5MTEzWiIgZmlsbD0idXJsKCNwYWludDFfbGluZWFyXzQ1NF84ODg3KSIvPiA8cGF0aCBkPSJNNy45MzUwNSAxNC4yMjAxQzcuODI2MTQgMTQuMjIwMSA3LjczMjc4IDE0LjIyMDEgNy42MjM4NyAxNC4yMDQ0TDcuNTMwNTIgMTYuMDM4OEM3LjY1NDk5IDE2LjAzODggNy43OTUwMiAxNi4wNTQ0IDcuOTE5NDkgMTYuMDU0NEMxMC4wOTc3IDE2LjA1NDQgMTIuMDczNyAxNS4xNjA4IDEzLjUwNTEgMTMuNzE4NEwxMi4yMTM3IDEyLjQxNzFDMTEuMTI0NiAxMy41NDU5IDkuNjE1NDEgMTQuMjIwMSA3LjkzNTA1IDE0LjIyMDFaIiBmaWxsPSJ1cmwoI3BhaW50Ml9saW5lYXJfNDU0Xzg4ODcpIi8+IDxwYXRoIGQ9Ik0xMS4zNTggMy4wNTcyNUwxMi44OTgzIDEuOTEyNzRDMTEuNTQ0NyAwLjgxNTI2NyA5LjgxNzY3IDAuMTQxMTA2IDcuOTM1MDQgMC4xNDExMDZWMS45NzU0NUM5LjIxMDg3IDEuOTkxMTMgMTAuMzkzNCAyLjM4MzA4IDExLjM1OCAzLjA1NzI1WiIgZmlsbD0idXJsKCNwYWludDNfbGluZWFyXzQ1NF84ODg3KSIvPiA8cGF0aCBkPSJNMTUuODM5IDguMTA1NjFDMTUuODM5IDcuNjE5NTkgMTUuNzkyMyA3LjE0OTI1IDE1LjcxNDUgNi42Nzg5TDE0LjAxODYgNy45NDg4M0MxNC4wMTg2IDcuOTk1ODcgMTQuMDE4NiA4LjA1ODU4IDE0LjAxODYgOC4xMDU2MUMxNC4wMTg2IDkuOTA4NiAxMy4yNDA2IDExLjUyMzUgMTIuMDExNSAxMi42MzY2TDEzLjI0MDYgMTQuMDAwNkMxNC44Mjc2IDEyLjU1ODIgMTUuODM5IDEwLjQ0MTcgMTUuODM5IDguMTA1NjFaIiBmaWxsPSIjMjFBMDM4Ii8+IDxwYXRoIGQ9Ik03LjkzNTA1IDE0LjIyMDFDNi4xNDU3OCAxNC4yMjAxIDQuNTQzMjEgMTMuNDM2MiAzLjQzODUzIDEyLjE5NzZMMi4wODQ5IDEzLjQzNjJDMy41MzE4OCAxNS4wNTEgNS42MTY3NyAxNi4wNTQ0IDcuOTM1MDUgMTYuMDU0NFYxNC4yMjAxWiIgZmlsbD0idXJsKCNwYWludDRfbGluZWFyXzQ1NF84ODg3KSIvPiA8cGF0aCBkPSJNMy44NzQxNyAzLjU3NDYzTDIuNjQ1MDIgMi4yMTA2MkMxLjA0MjQ1IDMuNjY4NjkgMC4wNDY2NzY2IDUuNzY5NTcgMC4wNDY2NzY2IDguMTA1NjJIMS44NjcwN0MxLjg2NzA3IDYuMzE4MyAyLjY0NTAyIDQuNjg3NzggMy44NzQxNyAzLjU3NDYzWiIgZmlsbD0idXJsKCNwYWludDVfbGluZWFyXzQ1NF84ODg3KSIvPiA8ZGVmcz4gPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzQ1NF84ODg3IiB4MT0iMi4xNzA3IiB5MT0iMTMuNDk1MiIgeDI9IjAuMzExOTg5IiB5Mj0iOC4wODEyOSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPiA8c3RvcCBvZmZzZXQ9IjAuMTQ0NCIgc3RvcC1jb2xvcj0iI0YyRTkxMyIvPiA8c3RvcCBvZmZzZXQ9IjAuMzAzNyIgc3RvcC1jb2xvcj0iI0U3RTUxOCIvPiA8c3RvcCBvZmZzZXQ9IjAuNTgyMyIgc3RvcC1jb2xvcj0iI0NBREIyNiIvPiA8c3RvcCBvZmZzZXQ9IjAuODkxIiBzdG9wLWNvbG9yPSIjQTNDRDM5Ii8+IDwvbGluZWFyR3JhZGllbnQ+IDxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQxX2xpbmVhcl80NTRfODg4NyIgeDE9IjIuODgzODYiIHkxPSIyLjI4NTg0IiB4Mj0iNy42MDI2MiIgeTI9IjAuNDczODIzIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+IDxzdG9wIG9mZnNldD0iMC4wNTkyIiBzdG9wLWNvbG9yPSIjMEZBOEUwIi8+IDxzdG9wIG9mZnNldD0iMC41Mzg1IiBzdG9wLWNvbG9yPSIjMDA5OUY5Ii8+IDxzdG9wIG9mZnNldD0iMC45MjM0IiBzdG9wLWNvbG9yPSIjMDI5MUVCIi8+IDwvbGluZWFyR3JhZGllbnQ+IDxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQyX2xpbmVhcl80NTRfODg4NyIgeDE9IjcuNDIzNjMiIHkxPSIxNC40OTQ0IiB4Mj0iMTMuMDQ5MSIgeTI9IjEzLjIxMzMiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4gPHN0b3Agb2Zmc2V0PSIwLjEyMjYiIHN0b3AtY29sb3I9IiNBM0NEMzkiLz4gPHN0b3Agb2Zmc2V0PSIwLjI4NDYiIHN0b3AtY29sb3I9IiM4NkMzMzkiLz4gPHN0b3Agb2Zmc2V0PSIwLjg2OTMiIHN0b3AtY29sb3I9IiMyMUEwMzgiLz4gPC9saW5lYXJHcmFkaWVudD4gPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDNfbGluZWFyXzQ1NF84ODg3IiB4MT0iNy41NjEwMiIgeTE9IjEuMzA5NDUiIHgyPSIxMi4yMzgyIiB5Mj0iMi43NjM2NCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPiA8c3RvcCBvZmZzZXQ9IjAuMDU2NiIgc3RvcC1jb2xvcj0iIzAyOTFFQiIvPiA8c3RvcCBvZmZzZXQ9IjAuNzkiIHN0b3AtY29sb3I9IiMwQzhBQ0IiLz4gPC9saW5lYXJHcmFkaWVudD4gPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDRfbGluZWFyXzQ1NF84ODg3IiB4MT0iMi41NDc3NiIgeTE9IjEzLjcyNjgiIHgyPSI3LjU3MTU3IiB5Mj0iMTUuNjE4MyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPiA8c3RvcCBvZmZzZXQ9IjAuMTMyNCIgc3RvcC1jb2xvcj0iI0YyRTkxMyIvPiA8c3RvcCBvZmZzZXQ9IjAuMjk3NyIgc3RvcC1jb2xvcj0iI0VCRTcxNiIvPiA8c3RvcCBvZmZzZXQ9IjAuNTMwNiIgc3RvcC1jb2xvcj0iI0Q5RTAxRiIvPiA8c3RvcCBvZmZzZXQ9IjAuODAyMyIgc3RvcC1jb2xvcj0iI0JCRDYyRCIvPiA8c3RvcCBvZmZzZXQ9IjAuOTgyOSIgc3RvcC1jb2xvcj0iI0EzQ0QzOSIvPiA8L2xpbmVhckdyYWRpZW50PiA8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50NV9saW5lYXJfNDU0Xzg4ODciIHgxPSIxLjQ0MTUiIHkxPSI4LjMyNzE4IiB4Mj0iMy40NTA5NCIgeTI9IjMuMDU5ODMiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4gPHN0b3Agb2Zmc2V0PSIwLjA2OTgiIHN0b3AtY29sb3I9IiNBM0NEMzkiLz4gPHN0b3Agb2Zmc2V0PSIwLjI1OTkiIHN0b3AtY29sb3I9IiM4MUM1NUYiLz4gPHN0b3Agb2Zmc2V0PSIwLjkyMTYiIHN0b3AtY29sb3I9IiMwRkE4RTAiLz4gPC9saW5lYXJHcmFkaWVudD4gPC9kZWZzPiA8L3N2Zz4=',
		width: 100,
	},
	neyrox: {
		href: 'https://neyrox.com/',
		logo: '/images/neyrox.svg',
		width: 100,
	},
	vdcom: {
		href: 'https://www.vdcom.ru/',
		logo: 'https://static.tildacdn.com/tild6161-6334-4135-a130-663935373836/Vector.svg',
		width: 100,
	},
	penoplex: {
		href: 'https://www.penoplex.ru/',
		logo: '/images/penoplex.svg',
		width: 100,
	},
	podarkiopt: {
		href: 'https://podarkiopt.ru/',
		logo: '/images/podarkiopt.png',
		width: 140,
	},
	prodamus: {
		href: 'https://prodamus.ru/',
		logo: '/images/prodamus.svg',
		width: 100,
	},
	fireaudit: {
		href: 'https://fire-audit.su/',
		logo: 'https://fire-audit.su/t/v7/images/logo.png',
		width: 130,
	},
	gazpromneft: {
		href: 'https://www.gazprom-neft.ru/',
		logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Gazprom_Neft_Logo.png',
		width: 100,
	},
	lakigroup: {
		href: 'https://lucky-group.rest/ru/',
		logo: 'https://lucky-group.rest/templates/yootheme/cache/bd/n-white_LOGO1-bd4bdd52.png',
		width: 80,
	},
	idaproject: {
		href: 'https://idaproject.com/',
		logo: '/images/idaproject.svg',
		width: 100,
	},
	garlyn: {
		href: 'https://garlyn.ru/',
		logo: 'https://garlyn.ru/images/logo-garlyn-dark.svg',
		width: 100,
	},
	cvetnoicentralmarket: {
		href: 'https://tsvetnoy.com/',
		logo: '/images/tsvetnoi.svg',
		width: 100,
	},
};

export const Clients = () => {
	const scrollRef = useRef<HTMLDivElement>(null);

	// 2. Преобразуем объект в массив и дублируем его для "бесконечной" прокрутки
	const combined = Object.entries(clientsData).map(([name, data]) => ({
		name, // Сохраняем имя (ключ) для использования в alt
		...data, // Разворачиваем остальные данные (href, logo, width)
	}));
	const logos = [...combined, ...combined];

	useEffect(() => {
		const el = scrollRef.current;
		if (!el) return;

		let frameId: number;
		let accumulator = 0;
		const speed = 0.25;

		const scroll = () => {
			if (!el) return;

			accumulator += speed;

			if (accumulator >= 1) {
				const scrollBy = Math.floor(accumulator);
				el.scrollLeft += scrollBy;
				accumulator -= scrollBy;
			}

			if (el.scrollLeft >= el.scrollWidth / 2) {
				el.scrollLeft = 0;
				accumulator = 0;
			}

			frameId = requestAnimationFrame(scroll);
		};

		frameId = requestAnimationFrame(scroll);

		return () => cancelAnimationFrame(frameId);
	}, []);

	return (
		<section className={styles.clients}>
			<div className={styles.wrapper}>
				<div className={styles.container} ref={scrollRef}>
					{/* 3. Используем новые данные в цикле */}
					{logos.map(({ name, logo, href, width }, index) => (
						<div
							// Используем комбинацию имени и индекса для уникального ключа
							key={`${name}-${index}`}
							className={styles.logo}
							style={{
								width: `${width}px`,
								flex: '0 0 auto',
							}}
						>
							<Link href={href} target="_blank">
								<Image
									src={logo}
									// Используем имя компании в качестве alt
									alt={''}
									width={width}
									height={100}
									style={{ objectFit: 'contain' }}
								/>
							</Link>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
