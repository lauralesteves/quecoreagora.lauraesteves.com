import { useTimeColor } from '../../hooks/useTimeColor';
import { t } from '../../i18n/locale';

export function ColorDisplay() {
  const { hex, display } = useTimeColor();

  return (
    <main
      className="flex flex-1 flex-col items-center justify-center transition-colors duration-800 will-change-[background-color]"
      style={{ backgroundColor: hex }}
    >
      <div className="flex items-center gap-4 mb-8">
        <span className="block w-20 h-[3px] bg-white sm:w-40 md:w-64" />
        <h1 className="font-display text-white text-lg sm:text-2xl md:text-[32px] tracking-wide whitespace-nowrap">
          {t.displayTitle}
        </h1>
        <span className="block w-20 h-[3px] bg-white sm:w-40 md:w-64" />
      </div>

      <p className="font-display text-white text-[60px] leading-none sm:text-[80px] md:text-[150px]">
        {display}
      </p>

      <p className="font-display text-white text-[21px] sm:text-4xl md:text-[52px] mt-2 border-t-2 border-b-2 border-white/30 px-4 py-1">
        {hex}
      </p>

    </main>
  );
}
