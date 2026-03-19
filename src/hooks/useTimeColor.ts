import { useEffect, useState } from 'react';

interface TimeColor {
  hex: string;
  display: string;
}

function getTimeColor(fullDay: boolean): TimeColor {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();

  let hex: string;
  if (fullDay) {
    const r = Math.round((h / 23) * 255);
    const g = Math.round((m / 59) * 255);
    const b = Math.round((s / 59) * 255);
    hex = `#${r.toString(16).padStart(2, '0').toUpperCase()}${g.toString(16).padStart(2, '0').toUpperCase()}${b.toString(16).padStart(2, '0').toUpperCase()}`;
  } else {
    hex = `#${String(h).padStart(2, '0')}${String(m).padStart(2, '0')}${String(s).padStart(2, '0')}`;
  }

  const display = `${String(h).padStart(2, '0')} : ${String(m).padStart(2, '0')} : ${String(s).padStart(2, '0')}`;

  return { hex, display };
}

export function useTimeColor(fullDay = false): TimeColor {
  const [timeColor, setTimeColor] = useState<TimeColor>(() =>
    getTimeColor(fullDay),
  );

  useEffect(() => {
    setTimeColor(getTimeColor(fullDay));
    const interval = setInterval(() => {
      setTimeColor(getTimeColor(fullDay));
    }, 1000);

    return () => clearInterval(interval);
  }, [fullDay]);

  return timeColor;
}
