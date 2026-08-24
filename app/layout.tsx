import type { Metadata } from 'next';
import './globals.css';
import './hero-v2.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://ichaey.github.io/-dm_rihalsky/'),
  title: 'Дмитрий Рихальский — физическая реабилитация',
  description: 'Индивидуальный разбор движения и план восстановления. Очно в Севастополе и онлайн.',
  openGraph: {
    title: 'Дмитрий Рихальский — физическая реабилитация',
    description: 'Разобраться в ограничении движения и выстроить понятный план восстановления. Севастополь · онлайн.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Дмитрий Рихальский — физическая реабилитация',
    description: 'Очно в Севастополе и онлайн.',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
