import { useCallback, useState } from 'react';
import { useTimeColor } from '../../hooks/useTimeColor';
import { t } from '../../i18n/locale';
import { ColorWheel } from '../ColorWheel/ColorWheel';

export function ColorDisplay() {
  const { hex: timeHex, display } = useTimeColor();
  const [manualHex, setManualHex] = useState<string | null>(null);
  const [showWheel, setShowWheel] = useState(false);

  const activeHex = manualHex ?? timeHex;

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
        <span className="block w-20 h-[3px] bg-white sm:w-40 md:w-64" />
        <h1 className="font-display text-white text-lg sm:text-2xl md:text-[32px] tracking-wide whitespace-nowrap">
          {t.displayTitle}
        </h1>
        <span className="block w-20 h-[3px] bg-white sm:w-40 md:w-64" />
      </div>

      <p
        className={`font-display text-white leading-none transition-all duration-500 ${
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
        className={`font-display text-white text-[21px] sm:text-4xl md:text-[52px] mt-2 border-t-2 border-b-2 px-4 py-1 cursor-pointer transition-colors duration-300 ${
          manualHex
            ? 'border-white/60'
            : 'border-white/30 hover:border-white/50'
        }`}
      >
        {activeHex}
      </button>

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
