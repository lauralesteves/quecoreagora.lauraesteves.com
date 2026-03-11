import { t } from '../../i18n/locale';

export function LanguageFlag() {
  return (
    <div className="flex items-center gap-2">
      {t.alternateSites.map((site) => (
        <a
          key={site.label}
          href={site.url}
          className="hover:opacity-80 transition-opacity"
        >
          <img
            src={site.flag}
            alt={site.label}
            className="w-7 h-[18px]"
          />
        </a>
      ))}
    </div>
  );
}
