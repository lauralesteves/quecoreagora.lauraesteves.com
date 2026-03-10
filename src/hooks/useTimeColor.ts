import { useEffect, useState } from 'react';

interface TimeColor {
  hex: string;
  display: string;
}

function getTimeColor(): TimeColor {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');

  return {
    hex: `#${h}${m}${s}`,
    display: `${h} : ${m} : ${s}`,
  };
}

export function useTimeColor(): TimeColor {
  const [timeColor, setTimeColor] = useState<TimeColor>(getTimeColor);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeColor(getTimeColor());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return timeColor;
}
