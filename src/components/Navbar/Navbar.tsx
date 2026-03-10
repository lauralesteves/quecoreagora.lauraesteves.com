import { t } from '../../i18n/locale';
import { LanguageFlag } from './LanguageFlag';
import { MobileMenu } from './MobileMenu';
import { NavLinks } from './NavLinks';
import { SocialIcons } from './SocialIcons';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="flex items-center px-6 py-4 pr-[100px]">
        <span className="font-logo text-white text-2xl hidden md:block">
          {t.logoText}
        </span>

        <span className="font-logo text-white text-xl md:hidden">
          {t.logoText}
        </span>

        <div className="hidden md:flex items-center ml-auto">
          <NavLinks />

          <div className="border-l border-white ml-[15px] pl-[15px] h-5" />

          <SocialIcons />

          <div className="border-l border-white ml-[15px] pl-[15px] h-5" />

          <LanguageFlag />
        </div>

        <div className="ml-auto md:hidden">
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
