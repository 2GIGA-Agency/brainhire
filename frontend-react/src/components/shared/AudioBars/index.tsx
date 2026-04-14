import React, { useRef, useEffect } from 'react';

interface AudioBarsProps {
  analyser: AnalyserNode | null;
  width?: number;
  height?: number;
}

export const AudioBars: React.FC<AudioBarsProps> = ({ analyser, width = 200, height = 35 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!analyser) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    let animationId: number;

    const draw = () => {
      animationId = requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, width, height);

      const spacing = 1; // расстояние между полосами
      const barCount = Math.floor(width / (2 + spacing)); // 2 — новая ширина бара
      const barWidth = 2;
      let x = 0;

      for (let i = 0; i < barCount; i++) {
        const value = dataArray[i] / 255;
        const barHeight = value * height * 0.7;

        ctx.fillStyle = '#000';
        ctx.fillRect(x, height - barHeight, barWidth, barHeight);

        x += barWidth + spacing;
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      ctx.clearRect(0, 0, width, height);
    };
  }, [analyser, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ maxHeight: `${height}px`, width: `${width}px` }}
    />
  );
};
