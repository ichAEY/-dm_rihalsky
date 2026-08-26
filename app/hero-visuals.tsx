'use client';

import { useEffect } from 'react';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const visuals = Array.from({ length: 8 }, (_, index) => `/kosti${String(index + 1).padStart(5, '0')}.webp`);

export default function HeroVisualRotator() {
  useEffect(() => {
    const space = document.querySelector<HTMLElement>('.m2-hero-space');
    if (!space || space.dataset.heroVisualsReady === 'true') return;

    space.dataset.heroVisualsReady = 'true';

    const stage = document.createElement('div');
    stage.className = 'm2-xray-ribbon';
    stage.setAttribute('aria-hidden', 'true');

    const track = document.createElement('div');
    track.className = 'm2-xray-track';
    stage.appendChild(track);

    const makeGroup = () => {
      const group = document.createElement('div');
      group.className = 'm2-xray-group';

      visuals.forEach((src) => {
        const image = document.createElement('img');
        image.src = `${basePath}${src}`;
        image.alt = '';
        image.decoding = 'async';
        image.loading = 'eager';
        image.draggable = false;
        group.appendChild(image);
      });

      return group;
    };

    track.appendChild(makeGroup());
    track.appendChild(makeGroup());
    track.appendChild(makeGroup());
    space.appendChild(stage);

    let groupWidth = 0;
    let offset = 0;
    let lastFrame = performance.now();
    let animationFrame = 0;
    let dragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragStartOffset = 0;
    let horizontalDrag = false;
    let pauseUntil = 0;
    let lastPointerX = 0;
    let lastPointerTime = 0;
    let pointerVelocity = 0;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const baseVelocity = -14;
    let velocity = baseVelocity;

    const normalize = () => {
      if (!groupWidth) return;
      while (offset <= -2 * groupWidth) offset += groupWidth;
      while (offset > -groupWidth) offset -= groupWidth;
    };

    const paint = () => {
      track.style.transform = `translate3d(${offset}px,0,0)`;
    };

    const measure = () => {
      const firstGroup = track.firstElementChild as HTMLElement | null;
      if (!firstGroup) return;
      const nextWidth = firstGroup.getBoundingClientRect().width;
      if (!nextWidth) return;

      if (!groupWidth) {
        groupWidth = nextWidth;
        offset = -groupWidth;
      } else {
        const progress = (offset + groupWidth) / groupWidth;
        groupWidth = nextWidth;
        offset = -groupWidth + progress * groupWidth;
        normalize();
      }
      paint();
    };

    const frame = (now: number) => {
      const delta = Math.min(50, now - lastFrame);
      lastFrame = now;

      if (!dragging && !reducedMotion && now >= pauseUntil && groupWidth) {
        const ease = 1 - Math.pow(0.94, delta / 16.67);
        velocity += (baseVelocity - velocity) * ease;
        offset += velocity * (delta / 1000);
        normalize();
        paint();
      }

      animationFrame = requestAnimationFrame(frame);
    };

    const onPointerDown = (event: PointerEvent) => {
      dragging = true;
      horizontalDrag = false;
      dragStartX = event.clientX;
      dragStartY = event.clientY;
      dragStartOffset = offset;
      lastPointerX = event.clientX;
      lastPointerTime = performance.now();
      pointerVelocity = 0;
      pauseUntil = Number.POSITIVE_INFINITY;
      stage.classList.add('is-dragging');
      stage.setPointerCapture?.(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return;

      const dx = event.clientX - dragStartX;
      const dy = event.clientY - dragStartY;

      if (!horizontalDrag && Math.abs(dx) > 4) {
        if (Math.abs(dx) <= Math.abs(dy)) return;
        horizontalDrag = true;
      }

      if (!horizontalDrag) return;

      event.preventDefault();
      offset = dragStartOffset + dx;
      normalize();
      paint();

      const now = performance.now();
      const elapsed = Math.max(8, now - lastPointerTime);
      const instantVelocity = (event.clientX - lastPointerX) / (elapsed / 1000);
      pointerVelocity = pointerVelocity * 0.35 + instantVelocity * 0.65;
      lastPointerX = event.clientX;
      lastPointerTime = now;
    };

    const finishDrag = (event: PointerEvent) => {
      if (!dragging) return;
      dragging = false;

      if (horizontalDrag) {
        velocity = Math.max(-2200, Math.min(2200, pointerVelocity));
      } else {
        velocity = baseVelocity;
      }

      horizontalDrag = false;
      pauseUntil = performance.now() + 500;
      stage.classList.remove('is-dragging');
      if (stage.hasPointerCapture?.(event.pointerId)) stage.releasePointerCapture?.(event.pointerId);
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(stage);

    stage.addEventListener('pointerdown', onPointerDown);
    stage.addEventListener('pointermove', onPointerMove);
    stage.addEventListener('pointerup', finishDrag);
    stage.addEventListener('pointercancel', finishDrag);

    requestAnimationFrame(measure);
    animationFrame = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      stage.removeEventListener('pointerdown', onPointerDown);
      stage.removeEventListener('pointermove', onPointerMove);
      stage.removeEventListener('pointerup', finishDrag);
      stage.removeEventListener('pointercancel', finishDrag);
      stage.remove();
      delete space.dataset.heroVisualsReady;
    };
  }, []);

  return null;
}
