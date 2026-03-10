import { NavLinks } from './NavLinks';
import { SocialIcons } from './SocialIcons';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="flex items-center px-6 py-4">
        <span className="font-logo text-white text-2xl mr-8 hidden md:block">
          Que cor é agora?
        </span>

        <div className="hidden md:flex items-center">
          <NavLinks />
        </div>

        <div className="hidden md:block border-l border-white ml-[15px] pl-[15px] h-5" />

        <div className="hidden md:flex items-center">
          <SocialIcons />
        </div>
      </div>
    </nav>
  );
}
