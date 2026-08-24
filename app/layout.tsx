import type { Metadata } from 'next';
import './globals.css';
import './hero-v2.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://dm-rihalsky.melikyan-mac.chatgpt.site'),
  title: 'Дмитрий Рихальский — физическая реабилитация',
  description: 'Восстановление движения после боли, травм и операций. Очные консультации в Севастополе и онлайн.',
  openGraph: {
    title: 'Дмитрий Рихальский — вернуться к движению',
    description: 'Физическая реабилитация. Очно в Севастополе и онлайн.',
    type: 'website',
    images: [{ url: '/og.png', width: 1730, height: 909, alt: 'Дмитрий Рихальский — вернуться к движению' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Дмитрий Рихальский — вернуться к движению',
    description: 'Физическая реабилитация. Очно в Севастополе и онлайн.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
