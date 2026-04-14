// import { setInternetSpeed } from '@/store/slices/interviewFlow/interviewFlowSlice';
// import { useAppDispatch } from '@/store/store';
import Speedtest from '@/utils/speedtest/speedtest'; // путь к вашему Speedtest-модулю
import { useEffect, useRef, useState } from 'react';

export function useNetworkSpeed() {

	const [download, setDownload] = useState(null);
	const [upload, setUpload] = useState(null);
	const [inProgress, setInProgress] = useState(false);
	const [error, setError] = useState(null);

	// временно храним «сырые» значения до конца теста
	const lastDownload = useRef(0);
	const lastUpload = useRef(0);

	useEffect(() => {
		setDownload(null);
		setUpload(null);
		setError(null);
		setInProgress(true);
		lastDownload.current = 0;
		lastUpload.current = 0;

		const s = new Speedtest();

		s.setSelectedServer({
			name: 'Test Server',
			server: `${window.location.protocol}//${window.location.host}/speedtest/`,
			dlURL: 'garbage.php',
			ulURL: 'empty.php',
			pingURL: 'empty.php',
			getIpURL: 'getIP.php',
		});

		s.onupdate = (data) => {
			if (data.dlStatus) {
				const val = parseFloat(data.dlStatus);
				if (!isNaN(val)) lastDownload.current = val;
			}
			if (data.ulStatus) {
				const val = parseFloat(data.ulStatus);
				if (!isNaN(val)) lastUpload.current = val;
			}
		};

		s.onend = (aborted) => {
			setInProgress(false);

			if (aborted) {
				setError('Тест скорости был прерван');
				return;
			}

			const measuredDownload = Math.round(lastDownload.current);
			const measuredUpload = Math.round(lastUpload.current);

			setDownload(measuredDownload);
			setUpload(measuredUpload);

			// диспатчим в стор сразу после измерения
			// dispatch(
			// 	setInternetSpeed({
			// 		download: String(measuredDownload),
			// 		upload: String(measuredUpload),
			// 	})
			// );
		};

		s.onerror = (e) => {
			alert(`Ошибка теста скорости: ${e}`);
			setInProgress(false);
		};

		s.start();

	}, []);

	return { download, upload, inProgress, error };
}

// src/hooks/useLibreSpeed.ts
// import { useEffect, useRef, useState } from 'react';
// import Speedtest from '@/utils/speedtest/speedtest'; // ваш скопированный файл

// interface SpeedResult {
//   download: number | null;
//   upload: number | null;
//   ping: number | null;
//   loading: boolean;
//   error: string | null;
// }

// export function useLibreSpeed(): SpeedResult {
//   const [download, setDownload] = useState<number | null>(null);
//   const [upload, setUpload]     = useState<number | null>(null);
//   const [ping, setPing]         = useState<number | null>(null);
//   const [loading, setLoading]   = useState(true);
//   const [error, setError]       = useState<string | null>(null);

//   // refs для накопления промежуточных данных
//   const dlRef = useRef(0);
//   const ulRef = useRef(0);
//   const pingRef = useRef(0);

//   useEffect(() => {
//     const s = new Speedtest();
// 		s.setSelectedServer({
// 			name: 'Test Server',
// 			server: `${window.location.protocol}//${window.location.host}/speedtest/`,
// 			dlURL: 'garbage.php',
// 			ulURL: 'empty.php',
// 			pingURL: 'empty.php',
// 			getIpURL: 'getIP.php',
// 		});

// 		s.start();

//     s.onupdate = data => {
//       if (data.dlStatus)  dlRef.current = parseFloat(data.dlStatus);
//       if (data.ulStatus)  ulRef.current = parseFloat(data.ulStatus);
//       if (data.pingStatus) pingRef.current = parseFloat(data.pingStatus);
//     };

//     s.onend = aborted => {
//       setLoading(false);
//       if (aborted) {
//         setError('Тест был прерван');
//       } else {
//         setDownload(Math.round(dlRef.current));
//         setUpload(Math.round(ulRef.current));
//         setPing(Math.round(pingRef.current));
//       }
//     };

//     s.onerror = e => {
//       setLoading(false);
//       setError(`Ошибка: ${e}`);
//     };

//     // cleanup
//     return () => {
//       if (s.abort) s.abort();
//     };
//   }, []);

//   return { download, upload, ping, loading, error };
// }

