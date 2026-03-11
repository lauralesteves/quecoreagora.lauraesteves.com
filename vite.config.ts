import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import type { Plugin } from 'vite';

const localeData: Record<
  string,
  { lang: string; title: string; url: string; description: string }
> = {
  pt: {
    lang: 'pt-BR',
    title: 'Que cor é agora?',
    url: 'https://quecoreagora.lauraesteves.com',
    description:
      'Que cor é agora? A cada segundo, o horário atual (HH:MM:SS) vira um código hexadecimal (#HHMMSS) e pinta a tela inteira. De preto à meia-noite a azul-petróleo no fim da tarde; um relógio cromático em tempo real. Mais um site de extrema utilidade pública.',
  },
  en: {
    lang: 'en',
    title: 'What color is it now?',
    url: 'https://whatcolorisitnow.lauraesteves.com',
    description:
      'What color is it now? Every second, the current time (HH:MM:SS) becomes a hex color code (#HHMMSS) and fills the entire screen. From black at midnight to teal blue at dusk — a real-time chromatic clock. Yet another site of extreme public utility.',
  },
  es: {
    lang: 'es',
    title: '¿Qué color es ahora?',
    url: 'https://quecoloresahora.lauraesteves.com',
    description:
      '¿Qué color es ahora? Cada segundo, la hora actual (HH:MM:SS) se convierte en un código hexadecimal (#HHMMSS) y pinta toda la pantalla. De negro a medianoche a azul petróleo al atardecer; un reloj cromático en tiempo real. Otro sitio más de extrema utilidad pública.',
  },
};

function htmlLocalePlugin(): Plugin {
  return {
    name: 'html-locale',
    transformIndexHtml(html) {
      const locale = process.env.VITE_LOCALE || 'pt';
      const data = localeData[locale] || localeData.pt;
      return html
        .replace(/%LANG%/g, data.lang)
        .replace(/%TITLE%/g, data.title)
        .replace(/%URL%/g, data.url)
        .replace(/%DESCRIPTION%/g, data.description);
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), htmlLocalePlugin()],
});
