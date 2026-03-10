import { ExternalLink } from '../ui/ExternalLink';

interface NavLinksProps {
  vertical?: boolean;
}

export function NavLinks({ vertical = false }: NavLinksProps) {
  return (
    <div
      className={`flex ${vertical ? 'flex-col gap-4' : 'items-center gap-6'}`}
    >
      <ExternalLink href="https://lauraesteves.com" className="text-sm font-semibold tracking-wide">
        Laura Esteves
      </ExternalLink>
      <ExternalLink href="https://escrevida.com" className="text-sm font-semibold tracking-wide">
        Escrevida
      </ExternalLink>
    </div>
  );
}
