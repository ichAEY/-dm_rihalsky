'use client';

import { useEffect } from 'react';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const visuals = [
  '/dimadoma1.webp',
  '/dimadoma3.webp',
  '/dimadoma4.webp',
  '/dimadoma5.webp',
  '/dimadoma7.webp',
  '/dimadoma9.webp',
  '/dimadoma10.webp',
];

export default function HeroVisualRotator() {
  useEffect(() => {
    const space = document.querySelector<HTMLElement>('.m2-hero-space');
    if (!space || space.dataset.heroVisualsReady === 'true') return;

    space.dataset.heroVisualsReady = 'true';

    const stage = document.createElement('div');
    stage.className = 'm2-hero-visuals';
    stage.setAttribute('aria-hidden', 'true');

    const images = visuals.map((src, index) => {
      const image = document.createElement('img');
      image.src = `${basePath}${src}`;
      image.alt = '';
      image.decoding = 'async';
      image.loading = 'eager';
      image.className = `m2-hero-visual${index === 0 ? ' is-active' : ''}`;
      stage.appendChild(image);
      return image;
    });

    space.appendChild(stage);

    let active = 0;
    let timer: number | undefined;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reduceMotion) {
      timer = window.setInterval(() => {
        images[active]?.classList.remove('is-active');
        active = (active + 1) % images.length;
        images[active]?.classList.add('is-active');
      }, 3000);
    }

    return () => {
      if (timer) window.clearInterval(timer);
      stage.remove();
      delete space.dataset.heroVisualsReady;
    };
  }, []);

  return null;
}
