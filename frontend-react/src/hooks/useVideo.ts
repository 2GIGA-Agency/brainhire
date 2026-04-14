// useVideo.ts
import { useState, useRef, useCallback, useEffect } from 'react';
import { serverLog, logCameraPermission, getMediaWithLogging } from '@/utils/cameraLogger';
import { isSafari, getCachedMediaRecorderTestResults, testMediaRecorderCompatibility } from '@/utils/safariCameraDebug';

interface MimeOptions {
    mimeType?: string;
}

interface UseVideoHook {
    initializeVideo: (videoElement: HTMLVideoElement | null) => Promise<void>;
    startRecording: (
        recordOptions?: MediaRecorderOptions,
        mainTimerSeconds?: number,
        onStopCallback?: () => void
    ) => Promise<void>;
    stopRecording: () => void;
    videoChunks: Blob[];
    isRecording: boolean;
    timeLeft: number;
    analyserQuestion: AnalyserNode | null;
}

export function useVideo(): UseVideoHook {
    const videoStreamRef = useRef<MediaStream | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const [videoChunks, setVideoChunks] = useState<Blob[]>([]);
    const [isRecording, setIsRecording] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const timerRef = useRef<number | null>(null);
    const videoChunksRef = useRef<Blob[]>([]);

    // Determine best mimeType/options for MediaRecorder
    const getBestMimeType = useCallback(async (): Promise<MimeOptions> => {
        try {
            let mimeType = 'video/webm;codecs=vp8,opus';
            const cached = getCachedMediaRecorderTestResults();
            if (cached?.recommendedMimeType) {
                mimeType = cached.recommendedMimeType;
                serverLog('Using cached recommended MIME type', { mimeType, fromCache: true });
                return { mimeType };
            }
            if (isSafari()) {
                serverLog('Running Safari MediaRecorder compatibility test');
                try {
                    const testResults = await testMediaRecorderCompatibility();
                    if (testResults.recommendedMimeType) {
                        mimeType = testResults.recommendedMimeType;
                        serverLog('Using recommended MIME type from test', { mimeType });
                    } else {
                        // fallback logic
                        if (MediaRecorder.isTypeSupported('video/mp4;codecs=h264,aac')) {
                            mimeType = 'video/mp4;codecs=h264,aac';
                        } else if (MediaRecorder.isTypeSupported('video/mp4;codecs=h264')) {
                            mimeType = 'video/mp4;codecs=h264';
                        } else if (MediaRecorder.isTypeSupported('video/mp4')) {
                            mimeType = 'video/mp4';
                        } else {
                            mimeType = '';
                            serverLog('No supported MIME type found for Safari, using default');
                        }
                    }
                } catch (err) {
                    serverLog('Error during compatibility test', err);
                    mimeType = MediaRecorder.isTypeSupported('video/mp4') ? 'video/mp4' : '';
                }
            } else {
                if (!MediaRecorder.isTypeSupported(mimeType)) {
                    mimeType = MediaRecorder.isTypeSupported('video/webm') ? 'video/webm' : '';
                }
            }
            return mimeType ? { mimeType } : {};
        } catch (err) {
            serverLog('Error determining best MIME type', err);
            return {};
        }
    }, []);

    // Initialize camera+microphone stream
    const initializeMediaDevices = useCallback(async (): Promise<MediaStream> => {
        try {
            serverLog('Initializing media devices');
            const stream = await getMediaWithLogging({
                audio: true,
                video: { width: { ideal: 640 }, height: { ideal: 480 }, frameRate: { ideal: 30, max: 30 } }
            });
            videoStreamRef.current = stream;
            return stream;
        } catch (err) {
            serverLog('Error accessing media devices', err);
            throw err;
        }
    }, []);

    // Attach stream to <video>
    const initializeVideo = useCallback(async (videoElement: HTMLVideoElement | null) => {
        try {
            serverLog('Initializing video element');
            const stream = await initializeMediaDevices();
            if (videoElement) {
                videoElement.srcObject = stream;
                videoElement.classList.add('mirror-video');
                serverLog('Video element initialized');
            }
        } catch (err) {
            serverLog('Failed to initialize video element', err);
            alert('Не удалось получить доступ к камере и микрофону. Проверьте настройки.');
        }
    }, [initializeMediaDevices]);
    
    // Start recording with timer, analyser, chunks
    const startRecording = useCallback(async (
        recordOptions: MediaRecorderOptions = { mimeType: 'video/webm;codecs=vp8,opus' },
        mainTimerSeconds = 60,
        onStopCallback?: (chunks: Blob[]) => void
    ) => {
        setIsRecording(true);
        setVideoChunks([]);
        setTimeLeft(mainTimerSeconds);
        serverLog('Starting recording', { recordOptions, mainTimerSeconds });

        try {
            const bestOptions = await getBestMimeType();
            const finalOptions = { ...recordOptions, ...bestOptions };
            serverLog('Using recording options', finalOptions);

            const stream = await getMediaWithLogging({ audio: true, video: { width: { ideal: 640 }, height: { ideal: 480 }, frameRate: { ideal: 30, max: 30 } } });
            videoStreamRef.current = stream;

            let recorder: MediaRecorder;
            try {
                recorder = new MediaRecorder(stream, finalOptions);
                serverLog('MediaRecorder created', { state: recorder.state, mimeType: recorder.mimeType });
            } catch (recErr) {
                serverLog('Falling back to default MediaRecorder', recErr);
                recorder = new MediaRecorder(stream);
            }
            mediaRecorderRef.current = recorder;

            recorder.ondataavailable = e => {
                if (e.data.size > 0) {
                    setVideoChunks(prev => [...prev, e.data]);
                    videoChunksRef.current.push(e.data);
                    serverLog('Chunk received', { size: e.data.size });
                }
            };
            
            recorder.onstop = () => {
                serverLog('Recording stopped');
                setIsRecording(false);
                analyserRef.current = null;
                stream.getTracks().forEach(t => t.stop());
                if (onStopCallback) onStopCallback(videoChunksRef.current);
                videoChunksRef.current = [];
            };

            recorder.start();
            serverLog('Recorder started');

            // setup analyser
            const audioCtx = new AudioContext();
            const analyser = audioCtx.createAnalyser();
            analyser.fftSize = 512;
            analyser.smoothingTimeConstant = 0.8;
            audioCtx.createMediaStreamSource(stream).connect(analyser);
            analyserRef.current = analyser;

            // countdown timer
            timerRef.current = window.setInterval(() => {
                setTimeLeft(t => {
                    if (t <= 1) {
                        stopRecording();
                        window.clearInterval(timerRef.current!);
                        return 0;
                    }
                    return t - 1;
                });
            }, 1000);

        } catch (err) {
            serverLog('Error during startRecording', err);
            logCameraPermission('recording_error', {}, err);
            alert('Не удалось получить доступ к микрофону и камере.');
            stopRecording();
        }
    }, [getBestMimeType]);

    // Stop recording
    const stopRecording = useCallback(() => {
        serverLog('Stopping recording');
        if (mediaRecorderRef.current?.state === 'recording') {
            mediaRecorderRef.current.stop();
        }
        if (timerRef.current) {
            window.clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopRecording();
            if (videoStreamRef.current) {
                serverLog('Cleaning up media tracks');
                videoStreamRef.current.getTracks().forEach(t => t.stop());
            }
        };
    }, [stopRecording]);

    return {
        initializeVideo,
        startRecording,
        stopRecording,
        videoChunks,
        isRecording,
        timeLeft,
        analyserQuestion: analyserRef.current
    };
}