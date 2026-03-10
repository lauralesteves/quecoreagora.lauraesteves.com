import { t } from '../../i18n/locale';

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-transparent text-white text-center py-3 text-sm font-body">
      <p>
        &copy; 2015 - {currentYear} | {t.footerText}{' '}
        <a
          href={t.lauraUrl}
          target="_blank"
          className="font-bold hover:opacity-80 transition-opacity"
          rel="noreferrer"
        >
          {t.footerName}
        </a>
      </p>
    </footer>
  );
}
