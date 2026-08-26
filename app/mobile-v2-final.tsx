'use client';

import { useEffect } from 'react';

export default function MobileV2FinalPolish() {
  useEffect(() => {
    const mobile = document.querySelector<HTMLElement>('.mobile-v2');
    const sticky = document.querySelector<HTMLElement>('.m2-sticky');
    const hero = document.querySelector<HTMLElement>('.m2-hero');
    const request = document.querySelector<HTMLElement>('.m2-request');
    const form = document.getElementById('m2-contact-form');
    const rail = document.querySelector<HTMLElement>('.m2-request-scroll');

    if (!mobile || !sticky || !hero || !request || !form) return;

    sticky.classList.add('m2-final-managed');
    sticky.classList.remove('is-visible');
    sticky.style.removeProperty('display');

    const legacyStickyObserver = new MutationObserver(() => {
      if (sticky.classList.contains('is-visible')) sticky.classList.remove('is-visible');
    });
    legacyStickyObserver.observe(sticky, { attributes: true, attributeFilter: ['class'] });

    let frame = 0;
    const syncSticky = () => {
      frame = 0;
      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      const heroBottom = hero.getBoundingClientRect().bottom;
      const requestBottom = request.getBoundingClientRect().bottom;
      const formTop = form.getBoundingClientRect().top;

      const afterHero = heroBottom <= 0;
      const beforeRequestEnds = requestBottom > 118;
      const beforeForm = formTop > 118;
      const shouldShow = isMobile && afterHero && beforeRequestEnds && beforeForm;

      sticky.classList.toggle('m2-final-show', shouldShow);
    };

    const requestSync = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(syncSticky);
    };

    syncSticky();
    window.addEventListener('scroll', requestSync, { passive: true });
    window.addEventListener('resize', requestSync);

    const themeMeta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    const originalTheme = themeMeta?.content || '#f4f7f9';
    const originalHtmlBackground = document.documentElement.style.backgroundColor;
    const originalBodyBackground = document.body.style.backgroundColor;

    const setDarkChrome = (dark: boolean) => {
      const color = dark ? '#15181c' : originalTheme;
      if (themeMeta) themeMeta.content = color;
      document.documentElement.style.backgroundColor = dark ? '#15181c' : originalHtmlBackground;
      document.body.style.backgroundColor = dark ? '#15181c' : originalBodyBackground;
      document.body.classList.toggle('m2-dark-browser-chrome', dark);
    };

    const formObserver = new IntersectionObserver(([entry]) => {
      setDarkChrome(entry.isIntersecting);
    }, {
      threshold: 0.02,
      rootMargin: '0px 0px 12% 0px',
    });
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
      track.appendChild(group);
      track.appendChild(clone);
      rail.appendChild(track);
      rail.classList.add('m2-marquee-ready');
    }

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestSync);
      window.removeEventListener('resize', requestSync);
      legacyStickyObserver.disconnect();
      formObserver.disconnect();
      sticky.classList.remove('m2-final-managed', 'm2-final-show', 'is-visible');
      sticky.style.removeProperty('display');
      setDarkChrome(false);
      if (themeMeta) themeMeta.content = originalTheme;
      document.documentElement.style.backgroundColor = originalHtmlBackground;
      document.body.style.backgroundColor = originalBodyBackground;
    };
  }, []);

  return null;
}