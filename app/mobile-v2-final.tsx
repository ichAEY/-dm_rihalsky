'use client';

import { useEffect } from 'react';

export default function MobileV2FinalPolish() {
  useEffect(() => {
    const mobile = document.querySelector<HTMLElement>('.mobile-v2');
    const sticky = document.querySelector<HTMLElement>('.m2-sticky');
    const hero = document.querySelector<HTMLElement>('.m2-hero');
    const form = document.getElementById('m2-contact-form');
    const rail = document.querySelector<HTMLElement>('.m2-request-scroll');

    if (!mobile || !sticky || !hero || !form) return;

    sticky.classList.add('m2-final-managed');

    let heroVisible = true;
    let formNear = false;
    const syncSticky = () => {
      sticky.classList.toggle('m2-final-show', !heroVisible && !formNear);
    };

    const heroObserver = new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting;
      syncSticky();
    }, { threshold: 0.03 });

    const formObserver = new IntersectionObserver(([entry]) => {
      formNear = entry.isIntersecting;
      syncSticky();
    }, {
      threshold: 0,
      rootMargin: '0px 0px 32% 0px',
    });

    heroObserver.observe(hero);
    formObserver.observe(form);

    if (rail && rail.children.length > 0 && !rail.dataset.marqueeReady) {
      rail.dataset.marqueeReady = 'true';
      const items = Array.from(rail.children);
      const track = document.createElement('div');
      track.className = 'm2-request-track';

      const group = document.createElement('div');
      group.className = 'm2-request-group';
      items.forEach((item) => group.appendChild(item));

      const clone = group.cloneNode(true) as HTMLElement;
      clone.setAttribute('aria-hidden', 'true');
      track.append(group, clone);
      rail.append(track);
      rail.classList.add('m2-marquee-ready');
    }

    return () => {
      heroObserver.disconnect();
      formObserver.disconnect();
      sticky.classList.remove('m2-final-managed', 'm2-final-show');
    };
  }, []);

  return null;
}
