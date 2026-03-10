import { t } from '../../i18n/locale';

export function LanguageFlag() {
  return (
    <a
      href={t.alternateSiteUrl}
      className="hover:opacity-80 transition-opacity"
    >
      <img
        src={t.alternateFlag}
        alt={t.lang === 'pt-BR' ? 'English' : 'Português'}
        className="w-7 h-[18px]"
      />
    </a>
  );
}
