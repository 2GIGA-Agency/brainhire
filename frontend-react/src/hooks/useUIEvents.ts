import {
	incrementCopyCount,
	incrementDevToolsCount,
	incrementLostWindowCount,
} from '@/store/slices/interviewFlow';
import { useAppDispatch } from '@/store/store';

let devToolsOpen = false;

export function useUIEvents() {
	const dispatch = useAppDispatch();

	function detectDevTools() {
		const threshold = 160;
		// Для некоторых браузеров можно 200, 160 - эмпирическая величина
		const widthDiff = window.outerWidth - window.innerWidth > threshold;
		const heightDiff = window.outerHeight - window.innerHeight > threshold;
		if (widthDiff || heightDiff) {
			if (!devToolsOpen) {
				console.log('DevTools открыты!');
				devToolsOpen = true;
				dispatch(incrementDevToolsCount());
			}
		} else {
			if (devToolsOpen) {
				console.log('DevTools закрыты!');
				devToolsOpen = false;
			}
		}
	}

	function initUIEvents() {
		const keydownHandler = (e: KeyboardEvent) => {
			// Блокировка F12, Ctrl+Shift+I/J, Ctrl+U
			if (
				e.keyCode === 123 || // F12
				(e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) || // Ctrl+Shift+I / Ctrl+Shift+J
				(e.ctrlKey && e.keyCode === 85) // Ctrl+U
			) {
				e.preventDefault();
				return false;
			}
		};

		const contextmenuHandler = (e: Event) => {
			e.preventDefault(); // правый клик отключен
		};

		const copyHandler = (e: Event) => {
			e.preventDefault(); // отменяем копирование
			console.log('Попытка копирования текста заблокирована.');
			dispatch(incrementCopyCount());
		};

		const visibilityChangeHandler = () => {
			if (document.hidden) {
				console.log('Страница скрыта (вкладка неактивна).');
				// lostWindowFocusCount.value++;
			} else {
				console.log('Вкладка снова активна.');
			}
		};

		const blurHandler = () => {
			console.log('Окно потеряло фокус.');
			dispatch(incrementLostWindowCount());
		};

		// Вешаем слушатели
		document.addEventListener('keydown', keydownHandler);
		document.addEventListener('contextmenu', contextmenuHandler);
		document.addEventListener('copy', copyHandler);
		document.addEventListener('visibilitychange', visibilityChangeHandler);
		window.addEventListener('blur', blurHandler);

		// Интервал для DevTools
		const devToolsInterval = setInterval(detectDevTools, 500);

		// Возвращаем функцию очистки
		return () => {
			document.removeEventListener('keydown', keydownHandler);
			document.removeEventListener('contextmenu', contextmenuHandler);
			document.removeEventListener('copy', copyHandler);
			document.removeEventListener('visibilitychange', visibilityChangeHandler);
			window.removeEventListener('blur', blurHandler);
			clearInterval(devToolsInterval);
		};
	}

	return { initUIEvents };
}
