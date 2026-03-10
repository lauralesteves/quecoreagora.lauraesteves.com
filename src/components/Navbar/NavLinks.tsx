import { t } from '../../i18n/locale';
import { ExternalLink } from '../ui/ExternalLink';

interface NavLinksProps {
  vertical?: boolean;
}

export function NavLinks({ vertical = false }: NavLinksProps) {
  return (
    <div
      className={`flex ${vertical ? 'flex-col gap-4' : 'items-center gap-6'}`}
    >
      <ExternalLink
        href={t.lauraUrl}
        className="text-base font-bold tracking-wide uppercase"
      >
        Laura Esteves
      </ExternalLink>
      <ExternalLink
        href="https://escrevida.com"
        className="text-base font-bold tracking-wide uppercase"
      >
        Escrevida
      </ExternalLink>
    </div>
  );
}
