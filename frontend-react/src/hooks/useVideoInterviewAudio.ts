// useAudio.ts

// ... (imports and other code remain the same)

export function useAudio(audioFiles: AudioFilesMap): UseAudio {
    const audioContextRef = useRef<AudioContext | null>(null);
    const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);
    const audioAnalyserRef = useRef<AnalyserNode | null>(null);
    const animationFrameAvatarIdRef = useRef<number | null>(null);
    const countdownIntervalRef = useRef<IntervalId | null>(null);

    const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
    const [countdownTimer, setCountdownTimer] = useState<number>(0);

    const isAudioPlayingRef = useRef(isAudioPlaying);
    useEffect(() => {
        isAudioPlayingRef.current = isAudioPlaying;
    }, [isAudioPlaying]);

    const onCountdownCallbackRef = useRef<(() => void) | undefined>(undefined);
    const callbackFiredRef = useRef<boolean>(false);

    const invokeOnCountdownCallback = useCallback(() => {
        if (onCountdownCallbackRef.current && !callbackFiredRef.current) {
            console.log("[invokeOnCountdownCallback] Firing callback.");
            onCountdownCallbackRef.current();
            callbackFiredRef.current = true;
        } else if (callbackFiredRef.current) {
            console.log("[invokeOnCountdownCallback] Callback already fired for this session or no callback set.");
        }
    }, []);

    const clearCountdown = useCallback((from: string) => {
        if (countdownIntervalRef.current) {
            console.log(`[clearCountdown from ${from}] Clearing interval ID: ${countdownIntervalRef.current}`);
            clearInterval(countdownIntervalRef.current);
            countdownIntervalRef.current = null;
        }
        setCountdownTimer(0);
    }, []);

    const stopAudio = useCallback((): void => {
        console.log("[stopAudio] Called.");
        if (audioSourceRef.current) {
            try {
                audioSourceRef.current.onended = null;
                audioSourceRef.current.stop(0);
                console.log("[stopAudio] audioSourceRef.current.stop(0) called.");
            } catch (e) {
                console.warn("[stopAudio] Audio source stop error:", e);
            }
            try {
                audioSourceRef.current.disconnect();
                console.log("[stopAudio] audioSourceRef.current.disconnect() called.");
            } catch (e) {
                console.warn("[stopAudio] Audio source disconnect error:", e);
            }
            audioSourceRef.current = null;
        }

        if (animationFrameAvatarIdRef.current) {
            cancelAnimationFrame(animationFrameAvatarIdRef.current);
            animationFrameAvatarIdRef.current = null;
        }

        if (audioContextRef.current) {
            const currentContext = audioContextRef.current; // Capture current context
            if (currentContext.state !== "closed") {
                console.log(`[stopAudio] Closing AudioContext (state: ${currentContext.state}).`);
                currentContext.close()
                    .then(() => console.log("[stopAudio] AudioContext closed successfully (async)."))
                    .catch(e => console.error("[stopAudio] Error closing audio context (async):", e));
                // **KEY CHANGE: Nullify the ref immediately after initiating close**
                // This ensures subsequent playAudio calls will create a new context.
                audioContextRef.current = null;
            } else {
                console.log("[stopAudio] AudioContext was already closed.");
                audioContextRef.current = null; // Ensure ref is null if context was found closed
            }
        }

        const bars = document.querySelectorAll<HTMLElement>(".bar-avatar");
        bars.forEach(bar => {
            bar.style.height = '3px';
            bar.style.opacity = '0.2';
        });

        setIsAudioPlaying(false);
        clearCountdown('stopAudio');

        onCountdownCallbackRef.current = undefined;
        callbackFiredRef.current = false;
        console.log("[stopAudio] Completed. isAudioPlaying: false, interval cleared, callback refs reset, audioContextRef likely nulled.");
    }, [clearCountdown]); // Dependencies remain the same

    // ... (animateAvatar remains the same)
    const animateAvatar = useCallback((): void => {
        if (!audioAnalyserRef.current) return;
        const bars = document.querySelectorAll<HTMLElement>(".bar-avatar");
        if (bars.length === 0) return;
        const dataArray = new Uint8Array(audioAnalyserRef.current.frequencyBinCount);

        const updateBars = (): void => {
            if (audioAnalyserRef.current && isAudioPlayingRef.current) {
                audioAnalyserRef.current.getByteFrequencyData(dataArray);
                const maxAmplitude = Math.max(...dataArray, 1);
                bars.forEach((bar, index) => {
                    if (index < dataArray.length) {
                        const value = dataArray[index];
                        const normalizedValue = (value / maxAmplitude) * 25;
                        bar.style.height = `${Math.max(3, normalizedValue)}px`;
                        bar.style.opacity = String(value / 255);
                    } else {
                        bar.style.height = '3px'; bar.style.opacity = '0';
                    }
                });
                if (isAudioPlayingRef.current) {
                    animationFrameAvatarIdRef.current = requestAnimationFrame(updateBars);
                } else {
                    if (animationFrameAvatarIdRef.current) cancelAnimationFrame(animationFrameAvatarIdRef.current);
                    animationFrameAvatarIdRef.current = null;
                    bars.forEach(bar => { bar.style.height = '3px'; bar.style.opacity = '0.2'; });
                }
            } else {
                if (animationFrameAvatarIdRef.current) cancelAnimationFrame(animationFrameAvatarIdRef.current);
                animationFrameAvatarIdRef.current = null;
                bars.forEach(bar => { bar.style.height = '3px'; bar.style.opacity = '0.2'; });
            }
        };
        if (animationFrameAvatarIdRef.current) cancelAnimationFrame(animationFrameAvatarIdRef.current);
        animationFrameAvatarIdRef.current = requestAnimationFrame(updateBars);
    }, []);


    const playAudio = useCallback(async (step: string | number, onNewCountdownCallback?: () => void): Promise<void> => {
        const invocationId = ++playAudioInvocationCounter;
        console.log(`[Invocation ${invocationId} playAudio] START for step: ${step}. Current isAudioPlaying (ref): ${isAudioPlayingRef.current}, countdownIntervalRef: ${countdownIntervalRef.current}, audioContextRef: ${audioContextRef.current?.state}`);

        console.log(`[Invocation ${invocationId} playAudio] Calling stopAudio() pre-emptively.`);
        stopAudio();

        await new Promise(resolve => setTimeout(resolve, 10)); // Adjusted to 10ms

        onCountdownCallbackRef.current = onNewCountdownCallback;
        callbackFiredRef.current = false;

        const audioFile = audioFiles[step];
        if (!audioFile) {
            console.warn(`[Invocation ${invocationId} playAudio] Audio file for step ${step} not found.`);
            return;
        }

        try {
            // With the fix in stopAudio, audioContextRef.current should be null here if stopAudio was effective.
            if (!audioContextRef.current) { // Simpler check now, as stopAudio nullifies it.
                const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
                if (!AudioContextClass) throw new Error("Web Audio API is not supported.");
                audioContextRef.current = new AudioContextClass();
                console.log(`[Invocation ${invocationId} playAudio] New AudioContext created. State: ${audioContextRef.current.state}`);
            } else {
                // This case should be less common if stopAudio nullifies the ref.
                // However, if it's an existing context that wasn't from a previous playAudio call (unlikely with this hook structure),
                // or if stopAudio somehow didn't run or complete its nullification (e.g. error before nullification).
                console.warn(`[Invocation ${invocationId} playAudio] Reusing existing AudioContext. State: ${audioContextRef.current.state}. This might be unexpected.`);
                if (audioContextRef.current.state === 'closed') {
                    console.error(`[Invocation ${invocationId} playAudio] Existing AudioContext is closed. Attempting to create a new one.`);
                    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
                    if (!AudioContextClass) throw new Error("Web Audio API is not supported.");
                    audioContextRef.current = new AudioContextClass();
                    console.log(`[Invocation ${invocationId} playAudio] New AudioContext created after finding closed one. State: ${audioContextRef.current.state}`);
                }
            }


            const response = await fetch(audioFile);
            if (!response.ok) throw new Error(`Failed to fetch audio: ${response.statusText}`);
            const arrayBuffer = await response.arrayBuffer();

            if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
                console.error(`[Invocation ${invocationId} playAudio] Audio context became null or closed after fetch. Aborting.`);
                // stopAudio() was already called at the beginning of this playAudio call.
                // No need to call it again unless state has become inconsistent.
                // Consider if a specific cleanup for this scenario is needed beyond initial stopAudio.
                return;
            }
            const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);

            const initialDuration = Math.ceil(audioBuffer.duration);
            console.log(`[Invocation ${invocationId} playAudio] Audio duration: ${initialDuration}s. Setting countdownTimer.`);
            setCountdownTimer(initialDuration);

            const bufferSource = audioContextRef.current.createBufferSource();
            bufferSource.buffer = audioBuffer;
            audioAnalyserRef.current = audioContextRef.current.createAnalyser();
            bufferSource.connect(audioAnalyserRef.current);
            audioAnalyserRef.current.connect(audioContextRef.current.destination);
            audioSourceRef.current = bufferSource;

            bufferSource.onended = () => {
                if (audioSourceRef.current === bufferSource) {
                    console.log(`[Invocation ${invocationId} playAudio onended] Current audio source ended naturally.`);
                    // Check context state before calling stopAudio again, it might already be closed by an explicit stop
                    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
                        stopAudio();
                    } else {
                        console.log(`[Invocation ${invocationId} playAudio onended] Context already closed or null, minimal cleanup.`);
                        // Minimal cleanup if context is already gone
                        setIsAudioPlaying(false);
                        clearCountdown('playAudio_onended_context_closed');
                        if (animationFrameAvatarIdRef.current) {
                            cancelAnimationFrame(animationFrameAvatarIdRef.current);
                            animationFrameAvatarIdRef.current = null;
                        }
                        const bars = document.querySelectorAll<HTMLElement>(".bar-avatar");
                        bars.forEach(bar => {
                            bar.style.height = '3px';
                            bar.style.opacity = '0.2';
                        });
                        onCountdownCallbackRef.current = undefined;
                        callbackFiredRef.current = false;
                    }
                } else {
                    console.log(`[Invocation ${invocationId} playAudio onended] An OLD audio source ended. Current source is different or null.`);
                    try { bufferSource.disconnect(); } catch (e) { /* ignore */ }
                }
            };

            bufferSource.start(0);
            setIsAudioPlaying(true);
            console.log(`[Invocation ${invocationId} playAudio] setIsAudioPlaying(true). Starting animation.`);
            if (audioAnalyserRef.current) {
                animateAvatar();
            }

            if (initialDuration > 0) {
                if (countdownIntervalRef.current) {
                    console.warn(`[Invocation ${invocationId} playAudio] Interval ref was not null (${countdownIntervalRef.current}) before setting new. Clearing again.`);
                    clearInterval(countdownIntervalRef.current);
                }
                console.log(`[Invocation ${invocationId} playAudio] Setting new interval for ${initialDuration}s.`);
                const newIntervalId = setInterval(() => {
                    if (countdownIntervalRef.current !== newIntervalId) {
                        console.log(`[Interval tick for ID ${newIntervalId}, Invocation ${invocationId}] Stale interval. Clearing self.`);
                        clearInterval(newIntervalId);
                        return;
                    }
                    setCountdownTimer(prevTime => {
                        const nextTime = prevTime - 1;
                        if (nextTime <= 0) {
                            console.log(`[Interval ID ${newIntervalId}, Invocation ${invocationId}] Reached <=0. Clearing this interval.`);
                            invokeOnCountdownCallback();
                            clearInterval(newIntervalId);
                            if (countdownIntervalRef.current === newIntervalId) {
                                countdownIntervalRef.current = null;
                            }
                            return 0;
                        }
                        return nextTime;
                    });
                }, 1000);
                countdownIntervalRef.current = newIntervalId;
                console.log(`[Invocation ${invocationId} playAudio] New interval ID ${newIntervalId} stored in ref.`);
            } else {
                invokeOnCountdownCallback(); // If duration is 0, invoke callback immediately.
                console.log(`[Invocation ${invocationId} playAudio] initialDuration is 0 or less. 'onended' will handle actual audio stop, callback invoked now.`);
            }

        } catch (error) {
            console.error(`[Invocation ${invocationId} playAudio] Error:`, error);
            stopAudio();
        }
    }, [audioFiles, stopAudio, animateAvatar, clearCountdown, invokeOnCountdownCallback]); // Dependencies for playAudio

    useEffect(() => {
        return () => {
            console.log("[useAudio useEffect cleanup] Hook instance unmounting. Calling stopAudio.");
            stopAudio();
        };
    }, [stopAudio]);

    return { playAudio, stopAudio, isAudioPlaying, countdownTimer };
}