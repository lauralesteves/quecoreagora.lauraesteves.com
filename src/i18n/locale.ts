type Locale = 'pt' | 'en' | 'es';

interface AlternateSite {
  url: string;
  flag: string;
  label: string;
}

interface Translations {
  lang: string;
  siteTitle: string;
  logoText: string;
  displayTitle: string;
  displaySubtitle: string;
  footerText: string;
  footerName: string;
  lauraUrl: string;
  escrevidaUrl: string;
  siteUrl: string;
  alternateSites: AlternateSite[];
  ogDescription: string;
  openMenu: string;
  closeMenu: string;
}

const pt: Translations = {
  lang: 'pt-BR',
  siteTitle: 'Que cor é agora?',
  logoText: 'Que cor é agora?',
  displayTitle: 'Que cor é agora?',
  displaySubtitle: 'Mais um site de extrema utilidade pública',
  footerText: 'Feito com ❤️ e ☕️ por',
  footerName: 'Laura Esteves',
  lauraUrl: 'https://lauraesteves.com',
  escrevidaUrl: 'https://escrevida.com',
  siteUrl: 'https://quecoreagora.lauraesteves.com',
  alternateSites: [
    { url: 'https://whatcolorisitnow.lauraesteves.com', flag: '/images/flags/en.svg', label: 'English' },
    { url: 'https://quecoloresahora.lauraesteves.com', flag: '/images/flags/es.svg', label: 'Español' },
  ],
  ogDescription:
    'Que cor é agora? A cada segundo, o horário atual (HH:MM:SS) vira um código hexadecimal (#HHMMSS) e pinta a tela inteira. De preto à meia-noite a azul-petróleo no fim da tarde; um relógio cromático em tempo real. Mais um site de extrema utilidade pública.',
  openMenu: 'Abrir menu',
  closeMenu: 'Fechar menu',
};

const en: Translations = {
  lang: 'en',
  siteTitle: 'What color is it now?',
  logoText: 'What color is it now?',
  displayTitle: 'What color is it now?',
  displaySubtitle: 'Yet another site of extreme public utility',
  footerText: 'Made with ❤️ and ☕️ by',
  footerName: 'Laura Esteves',
  lauraUrl: 'https://lauraesteves.com/en',
  escrevidaUrl: 'https://escrevida.com/en/',
  siteUrl: 'https://whatcolorisitnow.lauraesteves.com',
  alternateSites: [
    { url: 'https://quecoreagora.lauraesteves.com', flag: '/images/flags/pt.svg', label: 'Português' },
    { url: 'https://quecoloresahora.lauraesteves.com', flag: '/images/flags/es.svg', label: 'Español' },
  ],
  ogDescription:
    'What color is it now? Every second, the current time (HH:MM:SS) becomes a hex color code (#HHMMSS) and fills the entire screen. From black at midnight to teal blue at dusk — a real-time chromatic clock. Yet another site of extreme public utility.',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
};

const es: Translations = {
  lang: 'es',
  siteTitle: '¿Qué color es ahora?',
  logoText: '¿Qué color es ahora?',
  displayTitle: '¿Qué color es ahora?',
  displaySubtitle: 'Otro sitio más de extrema utilidad pública',
  footerText: 'Hecho con ❤️ y ☕️ por',
  footerName: 'Laura Esteves',
  lauraUrl: 'https://lauraesteves.com/es',
  escrevidaUrl: 'https://escrevida.com/en/',
  siteUrl: 'https://quecoloresahora.lauraesteves.com',
  alternateSites: [
    { url: 'https://quecoreagora.lauraesteves.com', flag: '/images/flags/pt.svg', label: 'Português' },
    { url: 'https://whatcolorisitnow.lauraesteves.com', flag: '/images/flags/en.svg', label: 'English' },
  ],
  ogDescription:
    '¿Qué color es ahora? Cada segundo, la hora actual (HH:MM:SS) se convierte en un código hexadecimal (#HHMMSS) y pinta toda la pantalla. De negro a medianoche a azul petróleo al atardecer; un reloj cromático en tiempo real. Otro sitio más de extrema utilidad pública.',
  openMenu: 'Abrir menú',
  closeMenu: 'Cerrar menú',
};

const locales: Record<Locale, Translations> = { pt, en, es };

const currentLocale: Locale = (import.meta.env.VITE_LOCALE as Locale) || 'pt';

export const t = locales[currentLocale];
