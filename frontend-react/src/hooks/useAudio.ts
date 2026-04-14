// import { useAppSelector } from '@/store/store';
import { useState, useRef, useEffect, useCallback } from 'react';

interface UseAudioProps {
  audioFiles: Record<string, string>;
}

interface UseAudioResult {
  playAudio: (step: string, onCountdownEndCallback?: () => void) => Promise<void>;
  stopAudio: () => void;
  isAudioPlaying: boolean;
  countdownTimer: number;
}

export function useAudio({ audioFiles }: UseAudioProps): UseAudioResult {
  // const ctx = useAppSelector((s) => s.audio.context)!
  // const unlocked = useAppSelector((s) => s.audio.unlocked)
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  const countdownIntervalRef = useRef<Timeout | null>(null);
  const onCountdownCallbackRef = useRef<() => void | null>(null)

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [countdownTimer, setCountdownTimer] = useState(0);

  const stopAudio = useCallback(() => {
    // Stop source node
    if (sourceNodeRef.current) {
      sourceNodeRef.current.stop();
      sourceNodeRef.current.disconnect();
      sourceNodeRef.current = null;
    }
    // Disconnect analyser
    if (analyserRef.current) {
      analyserRef.current.disconnect();
      analyserRef.current = null;
    }
    // Close AudioContext
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    // Cancel animation
    if (animationFrameIdRef.current !== null) {
      cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = null;
    }
    if (countdownIntervalRef.current) {
      if (onCountdownCallbackRef.current) onCountdownCallbackRef.current();
      setCountdownTimer(0);
      clearInterval(countdownIntervalRef.current);
      onCountdownCallbackRef.current = null;
      countdownIntervalRef.current = null;
    }

    setIsAudioPlaying(false);
  }, []);

  const animateBars = useCallback(() => {
    const analyser = analyserRef.current;
    if (!analyser) return;
    const bars = document.querySelectorAll<HTMLElement>('.bar-avatar');
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const update = () => {
      analyser.getByteFrequencyData(dataArray);
      const maxAmp = Math.max(...dataArray) || 1;
      bars.forEach((bar, idx) => {
        const val = dataArray[idx] || 0;
        const height = (val / maxAmp) * 25;
        bar.style.height = `${Math.max(3, height)}px`;
        bar.style.opacity = String(val / 255);
      });
      animationFrameIdRef.current = requestAnimationFrame(update);
    };

    animationFrameIdRef.current = requestAnimationFrame(update);
  }, []);

  const playAudio = useCallback(async (step: string, onCountdownEndCallback?: () => void) => {
    // if (!unlocked) {
    //   console.warn('AudioContext ещё не разблокирован')
    //   return
    // }
    // Stop any existing audio
    stopAudio();

    const url = audioFiles[step];
    if (!url) return;

    try {
      // Create or resume AudioContext
      let ctx = audioContextRef.current;
      if (!ctx || ctx.state === 'closed') {
        ctx = new AudioContext();
        audioContextRef.current = ctx;
      }

      const resp = await fetch(url);
      const arrayBuffer = await resp.arrayBuffer();
      const audioBuffer = await ctx.decodeAudioData(arrayBuffer);

      setCountdownTimer(Math.ceil(audioBuffer.duration));
      if (onCountdownEndCallback) onCountdownCallbackRef.current = onCountdownEndCallback;

      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.8;
      source.connect(analyser);
      analyser.connect(ctx.destination);

      analyserRef.current = analyser;
      sourceNodeRef.current = source;

      source.start();
      source.onended = stopAudio;

      setIsAudioPlaying(true);
      animateBars();
    } catch (err) {
      console.error('Error playing audio:', err);
    }
  }, [audioFiles, animateBars, stopAudio]);

  // Countdown timer effect
  useEffect(() => {
    let timerId: number;
    if (countdownTimer > 0) {
      timerId = window.setInterval(() => {
        setCountdownTimer(t => {
          if (t <= 1) {
            if (onCountdownCallbackRef.current) onCountdownCallbackRef.current()
            stopAudio();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isAudioPlaying, countdownTimer, stopAudio]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, [stopAudio]);

  return {
    playAudio,
    stopAudio,
    isAudioPlaying,
    countdownTimer,
  };
}
