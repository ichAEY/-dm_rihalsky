'use client';

import { useEffect, useState } from 'react';

const instagramUrl = 'https://www.instagram.com/dm_rihalsky/';

const concerns = [
  { title: 'Спина и поясница', text: 'Боль, скованность или ограничение движения мешают привычной активности.' },
  { title: 'Шея и плечевой пояс', text: 'Повороты, подъём руки или длительная нагрузка вызывают дискомфорт.' },
  { title: 'Колени и суставы', text: 'Нужно вернуть уверенность в ходьбе, приседании и повседневной нагрузке.' },
  { title: 'После травмы', text: 'Нужно последовательно вернуть движение и безопасно увеличить нагрузку.' },
  { title: 'Возвращение к спорту', text: 'Хочется вернуться к тренировкам без хаотичного увеличения нагрузки.' },
  { title: 'Непонятное ограничение', text: 'Движение изменилось, но непонятно, что именно мешает и с чего начинать.' },
];

const steps = [
  { number: '01', title: 'Разбираем ситуацию', text: 'Что беспокоит, когда началось, какие движения сейчас ограничены и к чему хотите вернуться.' },
  { number: '02', title: 'Оцениваем движение', text: 'Смотрим подвижность, реакцию на нагрузку и простые двигательные тесты.' },
  { number: '03', title: 'Собираем план', text: 'Определяем приоритеты, упражнения и понятную последовательность дальнейшей работы.' },
];

const vertebrae = Array.from({ length: 13 }, (_, index) => index);

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);
  const [stickyVisible, setStickyVisible] = useState(false);

  useEffect(() => {
    const introTimer = window.setTimeout(() => setIntroVisible(false), 1800);
    const onScroll = () => setStickyVisible(window.scrollY > window.innerHeight * 0.82);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.12 },
    );
    document.querySelectorAll('[data-reveal]').forEach((node) => observer.observe(node));

    return () => {
      window.clearTimeout(introTimer);
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

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

      <header className="mct-hero" id="mobile-top">
        <div className="mct-shell">
          <div className="mct-topbar">
            <a className="mct-brand" href="#mobile-top">Дмитрий Рихальский</a>
            <nav className="dct-navigation" aria-label="Основные разделы сайта">
              <a href="#mobile-help">С чем работаю</a>
              <a href="#mobile-process">Как проходит</a>
              <a href="#mobile-formats">Форматы</a>
              <a href="#mobile-booking">Запись</a>
            </nav>
            <div className="dct-top-actions">
              <a className="dct-top-phone" href={instagramUrl} target="_blank" rel="noreferrer">
                <span><small>Связаться</small><strong>@dm_rihalsky</strong></span>
              </a>
            </div>
            <div className="mct-menu-wrap">
              <button
                className={`mct-menu-button${menuOpen ? ' is-open' : ''}`}
                type="button"
                aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((value) => !value)}
              >
                <span /><span /><span />
              </button>
              {menuOpen && (
                <nav className="mct-menu-panel" aria-label="Разделы сайта">
                  <a href="#mobile-help" onClick={() => setMenuOpen(false)}><span>•</span>С чем работаю</a>
                  <a href="#mobile-process" onClick={() => setMenuOpen(false)}><span>•</span>Как проходит</a>
                  <a href="#mobile-formats" onClick={() => setMenuOpen(false)}><span>•</span>Форматы</a>
                  <a href="#mobile-booking" onClick={() => setMenuOpen(false)}><span>•</span>Запись</a>
                </nav>
              )}
            </div>
          </div>

          <div className="mct-hero-content">
            <div className="mct-hero-meta">
              <span>Физическая реабилитация · Севастополь</span>
              <a className="mct-hero-phone" href={instagramUrl} target="_blank" rel="noreferrer">
                <span>@dm_rihalsky</span>
              </a>
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
            <div className="mct-hero-actions">
              <a className="mct-main-cta" href={instagramUrl} target="_blank" rel="noreferrer">Разобрать мой случай&nbsp; →</a>
              <a className="mct-quiet-link" href="#mobile-process">Как проходит консультация ↓</a>
            </div>
            <div className="mct-stats" aria-label="Основная информация о консультации">
              <div className="mct-stat"><strong>60</strong><span>минут</span></div>
              <div className="mct-stat"><strong>5 000 ₽</strong><span>стоимость</span></div>
              <div className="mct-stat"><strong>2</strong><span>очно · онлайн</span></div>
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
                <span className="mct-service-arrow" aria-hidden="true">↗</span>
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
              <a href={instagramUrl} target="_blank" rel="noreferrer">Разобрать мой случай →</a>
            </article>
            <article className="mct-format-card">
              <span>02 · Видеосвязь</span>
              <h3>Онлайн-консультация</h3>
              <p>Разбор ситуации, доступная оценка движения и план самостоятельной работы.</p>
              <strong>5 000 ₽ <small>/ 60 минут</small></strong>
              <a href={instagramUrl} target="_blank" rel="noreferrer">Разобрать мой случай →</a>
            </article>
          </div>
        </div>
      </section>

      <section className="mct-final-book" id="mobile-booking">
        <div className="mct-book-glow" aria-hidden="true" />
        <div className="mct-shell">
          <p className="mct-section-kicker">Запись на консультацию</p>
          <h2>Расскажите,<br />что мешает двигаться</h2>
          <p className="mct-final-copy">Коротко опишите ситуацию Дмитрию. В переписке можно выбрать очный или онлайн-формат и согласовать детали.</p>
          <a className="mct-final-cta" href={instagramUrl} target="_blank" rel="noreferrer">Написать @dm_rihalsky&nbsp; →</a>
        </div>
      </section>

      <footer className="mct-footer">
        <div className="mct-shell">
          <a className="mct-footer-brand" href="#mobile-top">Дмитрий Рихальский</a>
          <div><span>Формат</span><p>Севастополь · очно<br />Онлайн · видеосвязь</p></div>
          <div><span>Консультация</span><p>60 минут · 5 000 ₽</p></div>
          <div><span>Связь</span><p><a href={instagramUrl} target="_blank" rel="noreferrer">@dm_rihalsky ↗</a></p></div>
        </div>
      </footer>

      <a
        className={`mct-sticky-book${stickyVisible ? ' is-visible' : ''}`}
        href={instagramUrl}
        target="_blank"
        rel="noreferrer"
      >
        <span><small>Консультация</small><strong>Разобрать мой случай</strong></span>
        <i aria-hidden="true">→</i>
      </a>
    </div>
  );
}
