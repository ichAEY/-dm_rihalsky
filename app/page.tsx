'use client';

import { useEffect, useRef, useState } from 'react';

const instagramUrl = 'https://www.instagram.com/dm_rihalsky/';

const concerns = [
  { title: 'Спина и поясница', text: 'Когда боль, скованность или ограничение движения мешают привычной активности.' },
  { title: 'Шея и плечевой пояс', text: 'Когда повороты, подъём руки или длительная нагрузка вызывают дискомфорт.' },
  { title: 'Колени и суставы', text: 'Когда нужно вернуть уверенность в ходьбе, приседании и повседневной нагрузке.' },
  { title: 'После травмы', text: 'Когда важно последовательно вернуть движение и постепенно увеличить нагрузку.' },
  { title: 'Возвращение к спорту', text: 'Когда хочется вернуться к тренировкам без хаотичного увеличения нагрузки.' },
];

const steps = [
  { number: '01', title: 'Разбираем ситуацию', text: 'Что беспокоит, когда началось, какие движения сейчас ограничены и к чему вы хотите вернуться.' },
  { number: '02', title: 'Оцениваем движение', text: 'Смотрим подвижность, реакцию на нагрузку и простые двигательные тесты.' },
  { number: '03', title: 'Собираем план', text: 'Определяем приоритеты, упражнения и понятную последовательность дальнейшей работы.' },
];

const vertebrae = Array.from({ length: 13 }, (_, index) => index);

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);
  const [stickyVisible, setStickyVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const bookingRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let introTimer = 0;
    try {
      if (window.sessionStorage.getItem('dm-rihalsky-intro-seen')) {
        setIntroVisible(false);
      } else {
        introTimer = window.setTimeout(() => {
          setIntroVisible(false);
          window.sessionStorage.setItem('dm-rihalsky-intro-seen', '1');
          document.documentElement.classList.add('dm-intro-seen');
        }, 1050);
      }
    } catch {
      introTimer = window.setTimeout(() => setIntroVisible(false), 1050);
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.1 },
    );
    document.querySelectorAll('[data-reveal]').forEach((node) => observer.observe(node));

    let heroIsVisible = true;
    let bookingIsVisible = false;
    const syncSticky = () => setStickyVisible(!heroIsVisible && !bookingIsVisible);

    const heroObserver = new IntersectionObserver(([entry]) => {
      heroIsVisible = entry.isIntersecting;
      syncSticky();
    }, { threshold: 0.08 });

    const bookingObserver = new IntersectionObserver(([entry]) => {
      bookingIsVisible = entry.isIntersecting;
      syncSticky();
    }, { threshold: 0.05 });

    if (heroRef.current) heroObserver.observe(heroRef.current);
    if (bookingRef.current) bookingObserver.observe(bookingRef.current);

    return () => {
      if (introTimer) window.clearTimeout(introTimer);
      observer.disconnect();
      heroObserver.disconnect();
      bookingObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setMenuOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  return (
    <div className="mct-mobile">
      {introVisible && (
        <div className="mct-intro" aria-hidden="true">
          <div className="mct-intro-mark">
            <span>Дмитрий</span>
            <i />
            <small>Физическая реабилитация</small>
          </div>
        </div>
      )}

      <header className="mct-hero" id="mobile-top" ref={heroRef}>
        <div className="mct-shell">
          <div className="mct-topbar">
            <a className="mct-brand" href="#mobile-top" aria-label="Дмитрий Рихальский — в начало страницы">Дмитрий Рихальский</a>

            <nav className="dct-navigation" aria-label="Основные разделы сайта">
              <a href="#mobile-help">С чем работаю</a>
              <a href="#mobile-process">Как проходит</a>
              <a href="#mobile-formats">Форматы</a>
              <a href="#mobile-booking">Запись</a>
            </nav>

            <div className="dct-top-actions">
              <a className="dct-top-phone" href={instagramUrl} aria-label="Связаться с Дмитрием в Instagram">
                <span><small>Связаться</small><strong>@dm_rihalsky</strong></span>
              </a>
            </div>

            <div className="mct-topbar-mobile-actions">
              <a className="mct-mobile-contact" href={instagramUrl} aria-label="Связаться с Дмитрием в Instagram">Связаться <span aria-hidden="true">↗</span></a>
              <div className="mct-menu-wrap" ref={menuRef}>
                <button
                  className={`mct-menu-button${menuOpen ? ' is-open' : ''}`}
                  type="button"
                  aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
                  aria-expanded={menuOpen}
                  aria-controls="mobile-navigation"
                  onClick={() => setMenuOpen((value) => !value)}
                >
                  <span /><span /><span />
                </button>
                {menuOpen && (
                  <nav className="mct-menu-panel" id="mobile-navigation" aria-label="Разделы сайта">
                    <a href="#mobile-help" onClick={() => setMenuOpen(false)}><span>•</span>С чем работаю</a>
                    <a href="#mobile-process" onClick={() => setMenuOpen(false)}><span>•</span>Как проходит</a>
                    <a href="#mobile-formats" onClick={() => setMenuOpen(false)}><span>•</span>Форматы</a>
                    <a href="#mobile-booking" onClick={() => setMenuOpen(false)}><span>•</span>Запись</a>
                  </nav>
                )}
              </div>
            </div>
          </div>

          <div className="mct-hero-content">
            <div className="mct-hero-meta">
              <span>Физическая реабилитация</span>
              <span className="mct-hero-mode">Севастополь · онлайн</span>
            </div>
            <h1>Вернуться <em>к движению</em></h1>
            <p className="mct-hero-copy">Помогаю разобраться, почему движение стало болезненным или ограниченным, и составляю индивидуальный план восстановления.</p>
          </div>

          <div className="mct-hero-visual" aria-hidden="true">
            <div className="mct-spine-stage">
              <div className="mct-spine-halo" />
              <div className="mct-spine-axis" />
              <div className="mct-spine">
                {vertebrae.map((index) => (
                  <span className="mct-vertebra" key={index} style={{ '--i': index } as React.CSSProperties}>
                    <i className="mct-vertebra-core" />
                    <b className="mct-vertebra-wing mct-vertebra-wing-left" />
                    <b className="mct-vertebra-wing mct-vertebra-wing-right" />
                  </span>
                ))}
              </div>
              <span className="mct-motion-line mct-motion-line-one" />
              <span className="mct-motion-line mct-motion-line-two" />
            </div>
          </div>

          <div className="mct-hero-bottom">
            <div className="mct-stats" aria-label="Основная информация о консультации">
              <div className="mct-stat"><strong>60</strong><span>минут</span></div>
              <div className="mct-stat"><strong>5 000 ₽</strong><span>стоимость</span></div>
              <div className="mct-stat"><strong>2</strong><span>очно · онлайн</span></div>
            </div>
            <div className="mct-hero-actions">
              <a className="mct-main-cta" href={instagramUrl} aria-label="Написать Дмитрию в Instagram и разобрать свой случай">Разобрать мой случай&nbsp; →</a>
              <a className="mct-quiet-link" href="#mobile-process">Как проходит консультация <span aria-hidden="true">↓</span></a>
            </div>
          </div>
        </div>
      </header>

      <section className="mct-prices mct-reveal" id="mobile-help" data-reveal>
        <div className="mct-shell">
          <div className="mct-price-head">
            <p className="mct-section-kicker">С чем можно обратиться</p>
            <h2>Когда движение<br />стало ограниченным</h2>
            <span>Не начинаем с универсального комплекса. Сначала разбираем, что именно изменилось и чего вы хотите вернуть.</span>
          </div>
          <div className="mct-service-list">
            {concerns.map((item, index) => (
              <article className="mct-service-row" key={item.title}>
                <span className="mct-service-index">{String(index + 1).padStart(2, '0')}</span>
                <div className="mct-service-name"><strong>{item.title}</strong><p>{item.text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mct-process mct-reveal" id="mobile-process" data-reveal>
        <div className="mct-shell">
          <div className="mct-section-head mct-process-head">
            <div><p className="mct-section-kicker">Как проходит консультация</p><h2>Сначала понять.<br />Потом нагружать.</h2></div>
          </div>
          <div className="mct-process-list">
            {steps.map((step) => (
              <article className="mct-process-card" key={step.number}>
                <span>{step.number}</span>
                <div><h3>{step.title}</h3><p>{step.text}</p></div>
              </article>
            ))}
          </div>
          <div className="mct-outcome-card">
            <p className="mct-section-kicker">После консультации</p>
            <h3>У вас остаётся понятный план дальнейших действий.</h3>
            <div className="mct-outcome-grid">
              <span>Исходная точка</span><span>Приоритеты</span><span>План нагрузки</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mct-formats mct-reveal" id="mobile-formats" data-reveal>
        <div className="mct-shell">
          <div className="mct-formats-head">
            <div><p className="mct-section-kicker">Форматы консультации</p><h2>Очно или<br />онлайн</h2></div>
            <span>60 минут · 5 000 ₽</span>
          </div>
          <div className="mct-format-grid">
            <article className="mct-format-card mct-format-card-primary">
              <span>01 · Севастополь</span>
              <h3>Очная консультация</h3>
              <p>Разбор запроса, оценка движения и двигательные тесты вживую.</p>
              <strong>5 000 ₽ <small>/ 60 минут</small></strong>
              <a href={instagramUrl} aria-label="Записаться на очную консультацию через Instagram">Выбрать очный формат <span aria-hidden="true">→</span></a>
            </article>
            <article className="mct-format-card">
              <span>02 · Видеосвязь</span>
              <h3>Онлайн-консультация</h3>
              <p>Разбор ситуации, доступная оценка движения и план самостоятельной работы.</p>
              <strong>5 000 ₽ <small>/ 60 минут</small></strong>
              <a href={instagramUrl} aria-label="Записаться на онлайн-консультацию через Instagram">Выбрать онлайн <span aria-hidden="true">→</span></a>
            </article>
          </div>
        </div>
      </section>

      <section className="mct-final-book" id="mobile-booking" ref={bookingRef}>
        <div className="mct-book-glow" aria-hidden="true" />
        <div className="mct-shell">
          <p className="mct-section-kicker">Запись на консультацию</p>
          <h2>Расскажите,<br />что мешает двигаться</h2>
          <p className="mct-final-copy">Не нужно заранее формулировать всё идеально. Для первого сообщения достаточно трёх вещей:</p>
          <div className="mct-message-guide" aria-label="Что написать Дмитрию в первом сообщении">
            <span><b>01</b> Что беспокоит</span>
            <span><b>02</b> Как давно</span>
            <span><b>03</b> Очно или онлайн</span>
          </div>
          <a className="mct-final-cta" href={instagramUrl} aria-label="Написать Дмитрию в Instagram">Написать @dm_rihalsky&nbsp; →</a>
        </div>
      </section>

      <footer className="mct-footer">
        <div className="mct-shell">
          <a className="mct-footer-brand" href="#mobile-top">Дмитрий Рихальский</a>
          <div><span>Формат</span><p>Севастополь · очно<br />Онлайн · видеосвязь</p></div>
          <div><span>Консультация</span><p>60 минут · 5 000 ₽</p></div>
          <div><span>Связь</span><p><a href={instagramUrl}>@dm_rihalsky ↗</a></p></div>
        </div>
      </footer>

      <a
        className={`mct-sticky-book${stickyVisible ? ' is-visible' : ''}`}
        href={instagramUrl}
        aria-label="Разобрать свой случай с Дмитрием"
      >
        <span><small>60 минут · 5 000 ₽</small><strong>Разобрать мой случай</strong></span>
        <i aria-hidden="true">→</i>
      </a>
    </div>
  );
}
