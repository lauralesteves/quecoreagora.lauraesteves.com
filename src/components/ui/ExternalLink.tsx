import externalLinkIcon from '../../assets/icons/external-link.svg';

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  showIcon?: boolean;
  className?: string;
}

export function ExternalLink({
  href,
  children,
  showIcon = true,
  className = '',
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      className={`text-fg hover:opacity-80 transition-opacity ${className}`}
      rel="noreferrer"
    >
      {children}
      {showIcon && (
        <img
          src={externalLinkIcon}
          alt=""
          aria-hidden="true"
          className="inline-block w-3.5 h-3.5 ml-1 -mt-0.5"
          style={{ filter: 'var(--icon-invert, invert(1))' }}
        />
      )}
    </a>
  );
}
