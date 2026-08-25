'use client';

import { useEffect, useState, type CSSProperties } from 'react';

const instagramUrl = 'https://www.instagram.com/dm_rihalsky/';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const asset = (path: string) => `${basePath}${path}`;

const helpItems = [
  {
    title: 'Спина, суставы, мышцы',
    text: 'Если боль, скованность или неприятные ощущения мешают нормально двигаться и нагружаться.',
    tone: 'back',
  },
  {
    title: 'После травмы',
    text: 'Если нужно постепенно вернуть движение, силу и уверенность после травмы или периода ограничений.',
    tone: 'trauma',
  },
  {
    title: 'Осанка и дисбалансы',
    text: 'Если тело двигается неравномерно и отдельные зоны постоянно перегружаются.',
    tone: 'posture',
  },
  {
    title: 'Возвращение к нагрузке',
    text: 'Если хочется снова тренироваться, ходить, бегать и двигаться без страха повторной боли.',
    tone: 'load',
  },
];

const consultationSteps = [
  ['01', 'Разберём вашу ситуацию', 'Вы расскажете, что беспокоит, как давно это длится и в каких движениях появляется ограничение.'],
  ['02', 'Проверим движение', 'Я посмотрю подвижность, контроль и реакцию тела на доступные движения и нагрузку.'],
  ['03', 'Соберём план восстановления', 'Вы получите понятный следующий шаг: что делать, чего пока избегать и как возвращать нагрузку.'],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.14 },
    );
    document.querySelectorAll('[data-reveal]').forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="site">
      <header className="hero" id="top">
        <div className="topbar shell">
          <a className="brand" href="#top">Дмитрий Рихальский</a>
          <nav className="desktop-nav" aria-label="Навигация">
            <a href="#about">Обо мне</a>
            <a href="#help">С чем помогаю</a>
            <a href="#consultation">Консультация</a>
          </nav>
          <button
            className={`menu-button${menuOpen ? ' is-open' : ''}`}
            type="button"
            aria-label="Меню"
            onClick={() => setMenuOpen((value) => !value)}
          >
            <i /><i />
          </button>
          {menuOpen && (
            <nav className="mobile-menu" aria-label="Мобильное меню">
              <a href="#about" onClick={() => setMenuOpen(false)}>Обо мне</a>
              <a href="#help" onClick={() => setMenuOpen(false)}>С чем помогаю</a>
              <a href="#consultation" onClick={() => setMenuOpen(false)}>Консультация</a>
            </nav>
          )}
        </div>

        <div className="hero-inner shell">
          <div className="hero-copy">
            <p className="eyebrow">Физическая реабилитация · Севастополь и онлайн</p>
            <h1>Вернуться<br /><span>к движению</span></h1>
            <p className="hero-lead">Помогаю понять, почему движение стало болезненным или ограниченным, и выстроить персональный план восстановления.</p>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="spine-glow" />
            <div className="spine-ring spine-ring-a" />
            <div className="spine-ring spine-ring-b" />
            <img className="spine-image" src={asset('/spine-hero.svg')} alt="" />
            <span className="spine-dot spine-dot-a" />
            <span className="spine-dot spine-dot-b" />
          </div>

          <div className="hero-bottom">
            <div className="hero-facts">
              <div><strong>60 минут</strong><span>консультация</span></div>
              <div><strong>5 000 ₽</strong><span>стоимость</span></div>
              <div><strong>Очно / онлайн</strong><span>два формата</span></div>
            </div>
            <a className="hero-consult-link" href="#consultation">Как проходит консультация <span>↓</span></a>
            <a className="primary-cta" href={instagramUrl}>Разобрать мой случай <span>↗</span></a>
          </div>
        </div>
      </header>

      <section className="about section" id="about">
        <div className="shell">
          <div className="section-frame about-frame reveal" data-reveal>
            <div className="about-photo">
              <img src={asset('/dmitry-ai.jpg')} alt="Дмитрий Рихальский" />
            </div>
            <div className="about-copy">
              <p className="section-kicker">Обо мне</p>
              <h2>Дмитрий Рихальский</h2>
              <p>Я занимаюсь физической реабилитацией больше 13 лет. Работаю с болью в спине, суставах и мышцах, восстановлением после травм, двигательными дисбалансами и возвращением к привычной нагрузке.</p>
              <p>Мне важно не просто дать упражнения. Сначала я разбираюсь, что именно ограничивает движение у конкретного человека, а затем выстраиваю понятный путь восстановления.</p>
              <div className="about-facts">
                <span><strong>13+</strong> лет практики</span>
                <span><strong>1000+</strong> клиентов</span>
                <span>Высшее образование</span>
                <span>Член Союза реабилитологов России</span>
              </div>
              <a className="profile-badge" href={instagramUrl}>
                <span className="profile-dot" />
                <span><small>Instagram</small><strong>@dm_rihalsky</strong></span>
                <i>↗</i>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="help section" id="help">
        <div className="shell">
          <div className="section-heading reveal" data-reveal>
            <div>
              <p className="section-kicker">С чем я помогаю</p>
              <h2>Четыре частых запроса</h2>
            </div>
            <p>Если узнаёте свою ситуацию — можно начать с одной консультации и понять, какой следующий шаг нужен именно вам.</p>
          </div>

          <div className="help-grid">
            {helpItems.map((item, index) => (
              <article
                className="help-card reveal"
                data-reveal
                key={item.title}
                style={{ '--delay': `${index * 70}ms` } as CSSProperties}
              >
                <div className={`help-visual ${item.tone}`} aria-hidden="true">
                  <span className="joint joint-a" />
                  <span className="joint joint-b" />
                  <i />
                </div>
                <div className="help-card-copy">
                  <span className="card-number">0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="consultation" id="consultation">
        <div className="consultation-shell shell reveal" data-reveal>
          <div className="consultation-head">
            <div>
              <p className="section-kicker">Консультация</p>
              <h2>За 60 минут — от вопроса к понятному плану.</h2>
            </div>
            <p>Я не обещаю универсальное «лечение за один сеанс». Моя задача — разобраться в вашей ситуации и показать, как безопасно двигаться дальше.</p>
          </div>

          <div className="consultation-steps">
            {consultationSteps.map(([number, title, text]) => (
              <article className="consult-step" key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>

          <div className="consultation-footer">
            <div className="consultation-meta">
              <div><small>Формат</small><strong>Севастополь / онлайн</strong></div>
              <div><small>Длительность</small><strong>60 минут</strong></div>
              <div><small>Стоимость</small><strong>5 000 ₽</strong></div>
            </div>
            <a className="consultation-cta" href={instagramUrl}>Написать Дмитрию <span>↗</span></a>
            <a className="consultation-handle" href={instagramUrl}>@dm_rihalsky</a>
          </div>
        </div>
      </section>
    </main>
  );
}
