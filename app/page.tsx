'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';

const instagramUrl = 'https://www.instagram.com/dm_rihalsky/';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const asset = (path: string) => `${basePath}${path}`;

const concerns = [
  { key: 'back', title: 'Спина, суставы, мышцы', text: 'Если боль, скованность или ограничение движения мешают жить и нормально нагружаться.' },
  { key: 'trauma', title: 'После травмы', text: 'Если нужно постепенно вернуть подвижность, силу и уверенность в движении.' },
  { key: 'posture', title: 'Осанка и дисбалансы', text: 'Если тело перегружает отдельные зоны и движение стало неравномерным.' },
  { key: 'sport', title: 'Возвращение к нагрузке', text: 'Если хотите снова тренироваться и двигаться без хаотичного увеличения нагрузки.' },
];

const steps = [
  ['01', 'Разберём, что болит', 'Вы рассказываете, что беспокоит, когда началось и какие движения сейчас ограничены.'],
  ['02', 'Проверю движение', 'Смотрю подвижность, контроль и реакцию тела на простые двигательные тесты.'],
  ['03', 'Дам план восстановления', 'Вы уходите с понятной последовательностью действий, упражнениями и ориентиром по нагрузке.'],
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
    const sync = () => setStickyVisible(!heroVisible && !bookingVisible);
    const heroObserver = new IntersectionObserver(([entry]) => { heroVisible = entry.isIntersecting; sync(); }, { threshold: 0.06 });
    const bookingObserver = new IntersectionObserver(([entry]) => { bookingVisible = entry.isIntersecting; sync(); }, { threshold: 0.08 });
    if (heroRef.current) heroObserver.observe(heroRef.current);
    if (bookingRef.current) bookingObserver.observe(bookingRef.current);

    return () => { revealObserver.disconnect(); heroObserver.disconnect(); bookingObserver.disconnect(); };
  }, []);

  return (
    <main className="site">
      <header className="hero" id="top" ref={heroRef}>
        <div className="topbar shell">
          <a className="brand" href="#top"><strong>Дмитрий Рихальский</strong><span>физическая реабилитация</span></a>
          <nav className="desktop-nav" aria-label="Разделы сайта">
            <a href="#about">Обо мне</a><a href="#help">С чем помогаю</a><a href="#consultation">Консультация</a>
          </nav>
          <div className="top-actions">
            <a className="contact-link" href={instagramUrl}>@dm_rihalsky</a>
            <button className={`menu-button${menuOpen ? ' is-open' : ''}`} type="button" aria-label="Меню" onClick={() => setMenuOpen((v) => !v)}><i /><i /></button>
          </div>
          {menuOpen && <nav className="mobile-menu"><a href="#about" onClick={() => setMenuOpen(false)}>Обо мне</a><a href="#help" onClick={() => setMenuOpen(false)}>С чем помогаю</a><a href="#consultation" onClick={() => setMenuOpen(false)}>Консультация</a></nav>}
        </div>

        <div className="hero-inner shell">
          <div className="hero-copy">
            <p className="eyebrow">Севастополь · онлайн</p>
            <h1>Помогаю<br /><span>вернуть движение</span><br />без боли</h1>
            <p className="hero-lead">Если спина, суставы или мышцы мешают нормально двигаться, я помогу разобраться в причине ограничений и выстроить план восстановления.</p>
            <div className="hero-tags"><span>боль и скованность</span><span>после травмы</span><span>осанка</span><span>возвращение к нагрузке</span></div>
          </div>

          <div className="hero-motion" aria-hidden="true">
            <div className="spine-glow" />
            <div className="spine-orbit orbit-one" />
            <div className="spine-orbit orbit-two" />
            <div className="spine-stack">{Array.from({ length: 12 }, (_, i) => <span key={i} style={{ '--i': i } as CSSProperties} />)}</div>
            <small className="motion-note note-a">движение</small><small className="motion-note note-b">контроль</small><small className="motion-note note-c">нагрузка</small>
          </div>

          <div className="hero-bottom">
            <div className="hero-facts"><div><strong>13+</strong><span>лет практики</span></div><div><strong>1000+</strong><span>клиентов</span></div><div><strong>60 мин</strong><span>консультация</span></div><div><strong>5 000 ₽</strong><span>стоимость</span></div></div>
            <a className="primary-cta" href={instagramUrl}>Разобрать мой случай <span>↗</span></a>
            <a className="quiet-cta" href="#about">Почему мне доверяют <span>↓</span></a>
          </div>
        </div>
      </header>

      <section className="promise section">
        <div className="shell promise-card reveal" data-reveal>
          <p className="section-kicker">Что я делаю</p>
          <h2>Моя задача — помочь вам снова двигаться нормально, а не просто выдать упражнения.</h2>
          <div className="promise-grid"><article><strong>01</strong><h3>Уменьшить боль</h3><p>Подобрать нагрузку, при которой тело постепенно возвращает движение без лишнего раздражения.</p></article><article><strong>02</strong><h3>Понять причину</h3><p>Объяснить, что именно ограничивает движение и почему симптомы возвращаются.</p></article><article><strong>03</strong><h3>Вернуть уверенность</h3><p>Собрать понятный путь от сегодняшнего состояния до привычной активности.</p></article></div>
        </div>
      </section>

      <section className="about section" id="about">
        <div className="shell about-grid">
          <div className="portrait-card reveal" data-reveal><img src={asset('/dmitry-ai.jpg')} alt="Дмитрий Рихальский" /></div>
          <div className="about-copy reveal" data-reveal>
            <p className="section-kicker">Обо мне</p>
            <h2>Я работаю с болью, движением и восстановлением.</h2>
            <p>Я — Дмитрий Рихальский. Более 13 лет занимаюсь физической реабилитацией. Работаю с болью в спине, суставах и мышцах, помогаю восстанавливаться после травм, корректировать двигательные дисбалансы и возвращаться к нагрузке.</p>
            <p>Я не начинаю с универсального комплекса. Сначала разбираюсь, почему именно у вас движение стало болезненным или ограниченным, а затем собираю персональный план восстановления.</p>
            <div className="about-facts"><span>Высшее образование</span><span>Член Союза реабилитологов России</span><span>1000+ клиентов</span><span>Личный опыт восстановления после тяжёлой травмы</span></div>
            <a className="about-badge" href={instagramUrl}><span><strong>Дмитрий Рихальский</strong><small>физическая реабилитация</small></span><b>@dm_rihalsky ↗</b></a>
          </div>
        </div>
      </section>

      <section className="help section" id="help">
        <div className="shell">
          <div className="section-head reveal" data-reveal><div><p className="section-kicker">С чем я помогаю</p><h2>Четыре частых запроса</h2></div><p>Если узнаёте себя хотя бы в одном пункте — это уже нормальный повод разобрать ситуацию.</p></div>
          <div className="concern-grid">{concerns.map((item, index) => <article className={`concern concern-${item.key} reveal`} data-reveal key={item.key} style={{ '--delay': `${index * 70}ms` } as CSSProperties}><div className="concern-visual" aria-hidden="true"><i /><i /><i /></div><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
        </div>
      </section>

      <section className="consultation section" id="consultation" ref={bookingRef}>
        <div className="shell consult-card reveal" data-reveal>
          <div className="consult-copy"><p className="section-kicker">Консультация</p><h2>За 60 минут мы разберём, что мешает вам двигаться, и что делать дальше.</h2><p>Можно приехать ко мне в Севастополе или провести консультацию онлайн. Стоимость одинаковая — 5 000 ₽.</p></div>
          <div className="steps">{steps.map(([number, title, text]) => <article className="step" key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
          <div className="consult-bottom"><div className="consult-meta"><span><small>Формат</small><strong>очно / онлайн</strong></span><span><small>Длительность</small><strong>60 минут</strong></span><span><small>Стоимость</small><strong>5 000 ₽</strong></span></div><a className="booking-cta" href={instagramUrl}>Написать мне <span>↗</span></a></div>
        </div>
      </section>

      <footer className="footer"><div className="shell"><span>Дмитрий Рихальский · физическая реабилитация</span><a href={instagramUrl}>@dm_rihalsky</a></div></footer>

      <a className={`sticky-cta${stickyVisible ? ' is-visible' : ''}`} href={instagramUrl}><i /><span><small>60 минут · 5 000 ₽</small><strong>Разобрать мой случай</strong></span><b>↗</b></a>
    </main>
  );
}
