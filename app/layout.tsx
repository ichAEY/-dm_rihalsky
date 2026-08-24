import type { Metadata, Viewport } from 'next';
import './globals.css';
import './ux-polish.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://ichaey.github.io/-dm_rihalsky/'),
  title: 'Дмитрий Рихальский — физическая реабилитация',
  description: 'Индивидуальный разбор движения и план восстановления. Очно в Севастополе и онлайн.',
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Дмитрий Рихальский — физическая реабилитация',
    description: 'Разобраться в ограничении движения и выстроить понятный план восстановления. Севастополь · онлайн.',
    type: 'website',
    locale: 'ru_RU',
  },
  twitter: {
    card: 'summary',
    title: 'Дмитрий Рихальский — физическая реабилитация',
    description: 'Очно в Севастополе и онлайн.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#f8fafb',
  colorScheme: 'light',
};

const enhancementScript = `
  document.documentElement.classList.add('js');
  try {
    if (sessionStorage.getItem('dm-rihalsky-intro-seen')) {
      document.documentElement.classList.add('dm-intro-seen');
    }
  } catch (_) {}
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <head>
        <script dangerouslySetInnerHTML={{ __html: enhancementScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
