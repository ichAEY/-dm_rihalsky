'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';

const instagramUrl = 'https://www.instagram.com/dm_rihalsky/';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const asset = (path: string) => `${basePath}${path}`;

const trustFacts = [
  ['13+', 'лет практики'],
  ['1000+', 'клиентов'],
  ['СРР', 'Союз реабилитологов России'],
  ['Личный', 'опыт восстановления после травмы'],
];

const concerns = [
  ['Спина, суставы, мышцы', 'Когда боль или скованность мешают нормально двигаться и нагружаться.'],
  ['После травмы', 'Когда нужно постепенно вернуть движение, силу и привычную активность.'],
  ['Осанка и дисбалансы', 'Таз, грудная клетка, лопатки и другие двигательные дисбалансы.'],
  ['Возвращение к нагрузке', 'Когда хочется снова тренироваться и двигаться увереннее.'],
];

const steps = [
  ['01', 'Разбираем запрос', 'Что беспокоит, как давно и к какому движению вы хотите вернуться.'],
  ['02', 'Смотрим движение', 'Оцениваем подвижность, реакцию на нагрузку и доступные двигательные тесты.'],
  ['03', 'Собираем план', 'Определяем приоритеты и понятную последовательность дальнейшей работы.'],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const bookingRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.12 },
    );
    document.querySelectorAll('[data-reveal]').forEach((node) => revealObserver.observe(node));

    let heroVisible = true;
    let bookingVisible = false;
    const syncSticky = () => setStickyVisible(!heroVisible && !bookingVisible);

    const heroObserver = new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting;
      syncSticky();
    }, { threshold: 0.06 });

    const bookingObserver = new IntersectionObserver(([entry]) => {
      bookingVisible = entry.isIntersecting;
      syncSticky();
    }, { threshold: 0.08 });

    if (heroRef.current) heroObserver.observe(heroRef.current);
    if (bookingRef.current) bookingObserver.observe(bookingRef.current);

    return () => {
      revealObserver.disconnect();
      heroObserver.disconnect();
      bookingObserver.disconnect();
    };
  }, []);

  return (
    <main className="site">
      <header className="hero" id="top" ref={heroRef}>
        <div className="topbar shell">
          <a className="brand" href="#top">Дмитрий Рихальский</a>
          <nav className="desktop-nav" aria-label="Разделы сайта">
            <a href="#trust">О специалисте</a>
            <a href="#help">С чем работаю</a>
            <a href="#process">Как проходит</a>
          </nav>
          <div className="top-actions">
            <a className="contact-link" href={instagramUrl}>@dm_rihalsky <span>↗</span></a>
            <button className={`menu-button${menuOpen ? ' is-open' : ''}`} type="button" aria-label="Меню" onClick={() => setMenuOpen((v) => !v)}>
              <i /><i />
            </button>
          </div>
          {menuOpen && (
            <nav className="mobile-menu" aria-label="Мобильное меню">
              <a href="#trust" onClick={() => setMenuOpen(false)}>О специалисте</a>
              <a href="#help" onClick={() => setMenuOpen(false)}>С чем работаю</a>
              <a href="#process" onClick={() => setMenuOpen(false)}>Как проходит</a>
              <a href="#booking" onClick={() => setMenuOpen(false)}>Записаться</a>
            </nav>
          )}
        </div>

        <div className="hero-inner shell">
          <div className="hero-copy">
            <div className="eyebrow">Физическая реабилитация · Севастополь и онлайн</div>
            <h1>Вернуться<br /><span>к движению</span></h1>
            <p>Помогаю разобраться, почему движение стало болезненным или ограниченным, и выстроить понятный план восстановления.</p>
          </div>

          <div className="hero-art" aria-hidden="true">
            <div className="hero-anatomy-window">
              <img src={asset('/portrait-story.png')} alt="" />
            </div>
            <div className="orbit orbit-a" />
            <div className="orbit orbit-b" />
            <span className="motion-dot dot-a" />
            <span className="motion-dot dot-b" />
            <div className="motion-label"><span>движение</span><b>нагрузка</b><em>контроль</em></div>
          </div>

          <div className="hero-bottom">
            <div className="hero-facts">
              <div><strong>60 мин</strong><span>консультация</span></div>
              <div><strong>5 000 ₽</strong><span>стоимость</span></div>
              <div><strong>2 формата</strong><span>очно · онлайн</span></div>
            </div>
            <a className="primary-cta" href={instagramUrl}>Разобрать мой случай <span>↗</span></a>
            <a className="quiet-cta" href="#trust">Почему Дмитрий <span>↓</span></a>
          </div>
        </div>
      </header>

      <section className="trust section" id="trust">
        <div className="shell trust-grid">
          <div className="portrait-card reveal" data-reveal>
            <div className="portrait-crop">
              <img src={asset('/portrait-story.png')} alt="Дмитрий Рихальский, специалист по физической реабилитации" />
            </div>
            <div className="portrait-caption"><span>Дмитрий Рихальский</span><small>специалист по физической реабилитации</small></div>
          </div>

          <div className="trust-copy reveal" data-reveal>
            <p className="section-kicker">О специалисте</p>
            <h2>Опыт, который<br />можно проверить</h2>
            <p className="trust-lead">В сохранённых материалах Дмитрия указаны высшее образование, 13+ лет практики, членство в Союзе реабилитологов России и личный опыт восстановления после тяжёлой травмы.</p>
            <div className="trust-facts">
              {trustFacts.map(([value, label]) => (
                <div key={value + label}><strong>{value}</strong><span>{label}</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="help section" id="help">
        <div className="shell">
          <div className="section-head reveal" data-reveal>
            <div><p className="section-kicker">С чем работает Дмитрий</p><h2>Не только<br />«болит спина»</h2></div>
            <p>Фокус — вернуть движение и нагрузку, а не просто выдать одинаковый комплекс упражнений.</p>
          </div>

          <div className="help-layout">
            <div className="anatomy-card reveal" data-reveal aria-hidden="true">
              <img src={asset('/portrait-story.png')} alt="" />
              <div className="anatomy-gradient" />
              <span>движение<br />как система</span>
            </div>
            <div className="concern-grid">
              {concerns.map(([title, text], index) => (
                <article className="concern reveal" data-reveal key={title} style={{ '--delay': `${index * 70}ms` } as CSSProperties}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="process section" id="process">
        <div className="shell">
          <div className="section-head reveal" data-reveal>
            <div><p className="section-kicker">Как проходит консультация</p><h2>Понятно.<br />Без лишнего.</h2></div>
            <p>За одну встречу вы проходите путь от запроса до конкретного следующего шага.</p>
          </div>
          <div className="steps">
            {steps.map(([number, title, text], index) => (
              <article className="step reveal" data-reveal key={number} style={{ '--delay': `${index * 90}ms` } as CSSProperties}>
                <span>{number}</span><div><h3>{title}</h3><p>{text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="booking" id="booking" ref={bookingRef}>
        <div className="booking-bg" aria-hidden="true"><div /><div /></div>
        <div className="shell booking-inner reveal" data-reveal>
          <p className="section-kicker">Консультация</p>
          <h2>Выберите формат.<br />Остальное разберёте вместе.</h2>
          <div className="format-row">
            <div><span>Очно</span><strong>Севастополь</strong></div>
            <div><span>Онлайн</span><strong>Видеосвязь</strong></div>
            <div><span>Длительность</span><strong>60 минут</strong></div>
            <div><span>Стоимость</span><strong>5 000 ₽</strong></div>
          </div>
          <p className="booking-copy">Для первого сообщения достаточно написать, что беспокоит и какой формат удобнее.</p>
          <a className="booking-cta" href={instagramUrl}>Написать Дмитрию <span>↗</span></a>
          <a className="instagram-handle" href={instagramUrl}>@dm_rihalsky</a>
        </div>
      </section>

      <footer className="footer">
        <div className="shell"><span>Дмитрий Рихальский · физическая реабилитация</span><a href="#top">Наверх ↑</a></div>
      </footer>

      <a className={`sticky-cta${stickyVisible ? ' is-visible' : ''}`} href={instagramUrl}>
        <span><small>60 минут · 5 000 ₽</small><strong>Разобрать мой случай</strong></span><i>→</i>
      </a>
    </main>
  );
}
