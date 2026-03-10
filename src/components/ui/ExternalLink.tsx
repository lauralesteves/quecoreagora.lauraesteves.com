interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  showIcon?: boolean;
  className?: string;
}

function ExternalLinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="inline-block w-3.5 h-3.5 ml-1 -mt-0.5"
    >
      <path
        fillRule="evenodd"
        d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Zm7.25-.182a.75.75 0 0 1 .218-.53l2-2a.75.75 0 0 1 1.281.53v4a.75.75 0 0 1-1.5 0V5.56l-1.22 1.22a.75.75 0 0 1-1.06-1.06l1.22-1.22H11.5a.75.75 0 0 1-.75-.75Z"
        clipRule="evenodd"
      />
    </svg>
  );
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
      className={`text-white hover:opacity-80 transition-opacity ${className}`}
    >
      {children}
      {showIcon && <ExternalLinkIcon />}
    </a>
  );
}
