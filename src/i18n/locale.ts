type Locale = 'pt' | 'en';

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
  alternateSiteUrl: string;
  alternateFlag: string;
  ogDescription: string;
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
  alternateSiteUrl: 'https://whatcolorisitnow.lauraesteves.com',
  alternateFlag: '/images/flags/en.svg',
  ogDescription:
    'Que cor é agora? A cada segundo, o horário atual (HH:MM:SS) vira um código hexadecimal (#HHMMSS) e pinta a tela inteira. De preto à meia-noite a azul-petróleo no fim da tarde; um relógio cromático em tempo real. Mais um site de extrema utilidade pública.',
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
  alternateSiteUrl: 'https://quecoreagora.lauraesteves.com',
  alternateFlag: '/images/flags/pt.svg',
  ogDescription:
    'What color is it now? Every second, the current time (HH:MM:SS) becomes a hex color code (#HHMMSS) and fills the entire screen. From black at midnight to teal blue at dusk — a real-time chromatic clock. Yet another site of extreme public utility.',
};

const locales: Record<Locale, Translations> = { pt, en };

const currentLocale: Locale = (import.meta.env.VITE_LOCALE as Locale) || 'pt';

export const t = locales[currentLocale];
