const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-transparent text-white text-center py-3 text-sm font-body">
      <p>
        &copy; 2015 - {currentYear} | Feito com ❤️ e ☕️ por{' '}
        <a
          href="https://lauraesteves.com"
          target="_blank"
          className="font-bold hover:opacity-80 transition-opacity"
          rel="noreferrer"
        >
          Laura Esteves
        </a>
      </p>
    </footer>
  );
}
