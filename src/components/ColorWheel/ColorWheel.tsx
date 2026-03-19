import { useCallback, useEffect, useRef, useState } from 'react';
import { t } from '../../i18n/locale';
import { hexToHsl, hslToHex, hslToRgb } from '../../utils/color';

interface ColorWheelProps {
  onColorChange: (hex: string) => void;
  timeHex: string;
  onClose: () => void;
}

const WHEEL_SIZE = 240;

export function ColorWheel({
  onColorChange,
  timeHex,
  onClose,
}: ColorWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [lightness, setLightness] = useState(50);
  const [pickedHue, setPickedHue] = useState(0);
  const [pickedSat, setPickedSat] = useState(100);
  const [isVisible, setIsVisible] = useState(false);
  const [hasPicked, setHasPicked] = useState(false);
  const inactivityRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const triggerClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(onClose, 500);
  }, [onClose]);

  const resetInactivity = useCallback(() => {
    if (inactivityRef.current) clearTimeout(inactivityRef.current);
    inactivityRef.current = setTimeout(triggerClose, 30000);
  }, [triggerClose]);

  useEffect(() => {
    resetInactivity();
    return () => {
      if (inactivityRef.current) clearTimeout(inactivityRef.current);
    };
  }, [resetInactivity]);

  useEffect(() => {
    const handleUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleUp);
    return () => window.removeEventListener('mouseup', handleUp);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const size = Math.round(WHEEL_SIZE * dpr);
    canvas.width = size;
    canvas.height = size;

    const cx = size / 2;
    const cy = size / 2;
    const radius = size / 2 - 2;
    const radiusSq = radius * radius;
    const imageData = ctx.createImageData(size, size);
    const data = imageData.data;

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const dx = x - cx;
        const dy = y - cy;
        const distSq = dx * dx + dy * dy;

        if (distSq <= radiusSq) {
          const dist = Math.sqrt(distSq);
          const angle = ((Math.atan2(dy, dx) * 180) / Math.PI + 360) % 360;
          const sat = (dist / radius) * 100;
          const [r, g, b] = hslToRgb(angle, sat, lightness);
          const idx = (y * size + x) * 4;
          data[idx] = r;
          data[idx + 1] = g;
          data[idx + 2] = b;
          data[idx + 3] = 255;
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }, [lightness]);

  const pickColor = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const cxD = rect.width / 2;
      const cyD = rect.height / 2;
      const radiusD = rect.width / 2;

      const dx = x - cxD;
      const dy = y - cyD;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > radiusD) return;

      const angle = ((Math.atan2(dy, dx) * 180) / Math.PI + 360) % 360;
      const sat = Math.min((dist / radiusD) * 100, 100);

      setHasPicked(true);
      setPickedHue(angle);
      setPickedSat(sat);
      resetInactivity();
      onColorChange(hslToHex(angle, sat, lightness));
    },
    [lightness, onColorChange, resetInactivity],
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      pickColor(e.clientX, e.clientY);
    },
    [pickColor],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging) pickColor(e.clientX, e.clientY);
    },
    [isDragging, pickColor],
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      setIsDragging(true);
      pickColor(e.touches[0].clientX, e.touches[0].clientY);
    },
    [pickColor],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      if (isDragging) pickColor(e.touches[0].clientX, e.touches[0].clientY);
    },
    [isDragging, pickColor],
  );

  const handleLightnessChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newL = Number(e.target.value);
      setLightness(newL);
      resetInactivity();
      if (hasPicked) {
        onColorChange(hslToHex(pickedHue, pickedSat, newL));
      }
    },
    [hasPicked, onColorChange, pickedHue, pickedSat, resetInactivity],
  );

  const markerR = WHEEL_SIZE / 2 - 2;

  const timeHsl = hexToHsl(timeHex);
  const timeAngle = (timeHsl.h * Math.PI) / 180;
  const timeDist = (timeHsl.s / 100) * markerR;
  const timeX = WHEEL_SIZE / 2 + timeDist * Math.cos(timeAngle);
  const timeY = WHEEL_SIZE / 2 + timeDist * Math.sin(timeAngle);

  const pickAngle = (pickedHue * Math.PI) / 180;
  const pickDist = (pickedSat / 100) * markerR;
  const pickX = WHEEL_SIZE / 2 + pickDist * Math.cos(pickAngle);
  const pickY = WHEEL_SIZE / 2 + pickDist * Math.sin(pickAngle);

  return (
    <div
      className={`flex flex-col items-center gap-4 mt-6 transition-all duration-500 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
      }`}
    >
      <div
        className="relative rounded-full shadow-2xl"
        style={{ width: WHEEL_SIZE, height: WHEEL_SIZE }}
      >
        <canvas
          ref={canvasRef}
          aria-label={t.colorWheel}
          role="img"
          style={{ width: WHEEL_SIZE, height: WHEEL_SIZE }}
          className="cursor-pointer rounded-full"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={() => setIsDragging(false)}
        />
        <div
          className="absolute w-4 h-4 rounded-full border-2 border-white shadow-lg pointer-events-none time-marker-pulse"
          style={{
            left: timeX,
            top: timeY,
            backgroundColor: timeHex,
          }}
        />
        {hasPicked && (
          <div
            className="absolute w-5 h-5 rounded-full border-2 border-white shadow-lg pointer-events-none"
            style={{
              left: pickX,
              top: pickY,
              transform: 'translate(-50%, -50%)',
              backgroundColor: hslToHex(pickedHue, pickedSat, lightness),
            }}
          />
        )}
      </div>

      <input
        type="range"
        min={10}
        max={90}
        value={lightness}
        onChange={handleLightnessChange}
        aria-label={t.brightness}
        className="lightness-slider w-[200px]"
        style={{
          background: `linear-gradient(to right, #000, hsl(${pickedHue}, 100%, 50%), #fff)`,
        }}
      />

      <button
        type="button"
        onClick={triggerClose}
        className="flex items-center gap-2 text-white/70 hover:text-white text-sm font-display tracking-wider transition-colors cursor-pointer"
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          role="img"
          aria-label={t.backToClock}
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12,6 12,12 16,14" />
        </svg>
        {t.backToClock}
      </button>
    </div>
  );
}
