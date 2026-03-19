import { useCallback, useEffect, useState } from 'react';
import { useTimeColor } from '../../hooks/useTimeColor';
import { t } from '../../i18n/locale';
import { getRelativeLuminance } from '../../utils/color';
import { ColorWheel } from '../ColorWheel/ColorWheel';

export function ColorDisplay() {
  const [fullDay, setFullDay] = useState(false);
  const { hex: timeHex, display } = useTimeColor(fullDay);
  const [manualHex, setManualHex] = useState<string | null>(null);
  const [showWheel, setShowWheel] = useState(false);

  const activeHex = manualHex ?? timeHex;

  useEffect(() => {
    const isLight = getRelativeLuminance(activeHex) > 0.179;
    const root = document.documentElement;
    root.style.setProperty('--fg', isLight ? '#000000' : '#ffffff');
    root.style.setProperty(
      '--icon-invert',
      isLight ? 'invert(0)' : 'invert(1)',
    );
  }, [activeHex]);

  const handleHexClick = () => {
    if (showWheel) {
      setShowWheel(false);
      setManualHex(null);
    } else {
      setShowWheel(true);
    }
  };

  const handleClose = useCallback(() => {
    setShowWheel(false);
    setManualHex(null);
  }, []);

  return (
    <main
      className="flex flex-1 flex-col items-center justify-center transition-colors duration-800 will-change-[background-color]"
      style={{ backgroundColor: activeHex }}
    >
      <div
        className={`flex items-center gap-4 transition-all duration-500 ${
          showWheel ? 'opacity-0 h-0 mb-0 overflow-hidden' : 'opacity-100 mb-8'
        }`}
      >
        <span className="block w-20 h-[3px] bg-fg sm:w-40 md:w-64 transition-colors duration-800" />
        <h1 className="font-display text-fg text-lg sm:text-2xl md:text-[32px] tracking-wide whitespace-nowrap transition-colors duration-800">
          {t.displayTitle}
        </h1>
        <span className="block w-20 h-[3px] bg-fg sm:w-40 md:w-64 transition-colors duration-800" />
      </div>

      <p
        className={`font-display text-fg leading-none transition-all duration-500 ${
          showWheel
            ? 'text-[28px] sm:text-[36px] md:text-[52px] opacity-40'
            : 'text-[60px] sm:text-[80px] md:text-[150px]'
        }`}
      >
        {display}
      </p>

      <button
        type="button"
        onClick={handleHexClick}
        className={`font-display text-fg text-[21px] sm:text-4xl md:text-[52px] mt-2 border-t-2 border-b-2 px-4 py-1 cursor-pointer transition-colors duration-300 ${
          manualHex
            ? 'border-fg/60'
            : 'border-fg/30 hover:border-fg/50'
        }`}
      >
        {activeHex}
      </button>

      {fullDay && !showWheel && (
        <p className="font-display text-fg/50 text-base sm:text-xl md:text-[2.5em] mt-4 tracking-wider transition-colors duration-800">
          R = H/23 &middot; 255 &nbsp;&nbsp; G = M/59 &middot; 255 &nbsp;&nbsp;
          B = S/59 &middot; 255
        </p>
      )}

      {!showWheel && (
        <button
          type="button"
          onClick={() => setFullDay((prev) => !prev)}
          className="flex items-center gap-2 font-display text-fg/40 hover:text-fg/70 text-[1.5em] leading-normal mt-4 tracking-wider transition-colors duration-300 cursor-pointer"
        >
          {fullDay ? (
            <>
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12,6 12,12 16,14" />
              </svg>
              {t.backToNormalClock}
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                <path d="M20 3v4" />
                <path d="M22 5h-4" />
              </svg>
              {t.seeFullSpectrum}
            </>
          )}
        </button>
      )}

      {showWheel && (
        <ColorWheel
          onColorChange={setManualHex}
          timeHex={timeHex}
          onClose={handleClose}
        />
      )}
    </main>
  );
}
