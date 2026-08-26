'use client';

import { useEffect, useRef, useState } from 'react';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const asset = (path: string) => `${basePath}${path}`;

type ServiceId = 'offline' | 'online';

const services = {
  offline: {
    tab: 'Очный приём',
    eyebrow: 'Севастополь',
    title: 'Очный приём',
    summary: 'Очная оценка состояния и движения с разбором ограничений и персональным планом дальнейшей работы.',
    gives: [
      'Определить движения и нагрузки, которые сейчас провоцируют дискомфорт.',
      'Понять, какие ограничения действительно требуют внимания в первую очередь.',
      'Получить понятный план восстановления и возвращения к привычной активности.',
    ],
    fits: [
      'Боль и скованность в спине, суставах или мышцах.',
      'Восстановление после травм и периода ограниченной активности.',
      'Возвращение к тренировкам, спорту и повседневной нагрузке.',
    ],
    price: '5 000 ₽',
    duration: '60 минут',
    image: '/dimavhalate.webp',
  },
  online: {
    tab: 'Онлайн',
    eyebrow: 'Дистанционно',
    title: 'Онлайн-консультация',
    summary: 'Видеоразбор ситуации и движения, когда личный визит не нужен или вы находитесь в другом городе.',
    gives: [
      'Структурировать проблему и понять, с чего начинать работу.',
      'Разобрать доступные движения и текущую нагрузку в домашних условиях.',
      'Получить последовательный план действий и критерии оценки прогресса.',
    ],
    fits: [
      'Первичный разбор ситуации из любого города.',
      'Контроль прогресса и корректировка текущей нагрузки.',
      'Ситуации, когда очный приём неудобен или временно невозможен.',
    ],
    price: '5 000 ₽',
    duration: '60 минут',
    image: '/dimaonline.webp',
  },
} as const;

const requestItems = [
  'Боль в спине, суставах и мышцах',
  'Восстановление после травмы',
  'Ограничение подвижности',
  'Возвращение к спорту и нагрузке',
];

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.5 4.5 3.8 11.1c-.9.4-.8 1.1.2 1.4l4.2 1.3 1.6 5c.2.7.7.8 1.2.3l2.3-2.1 4.2 3.1c.7.5 1.3.2 1.5-.7L22 5.7c.2-1-.4-1.6-1.5-1.2Z" />
      <path d="m8.2 13.8 9.5-6.1-7.9 7.1" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21s6-5.4 6-11a6 6 0 1 0-12 0c0 5.6 6 11 6 11Z" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  );
}

export default function DesktopV2() {
  const [activeService, setActiveService] = useState<ServiceId>('offline');
  const [stickyVisible, setStickyVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLElement>(null);
  const service = services[activeService];

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)');
    if (!media.matches) return;

    let frame = 0;
    const syncSticky = () => {
      frame = 0;
      const hero = heroRef.current;
      const form = formRef.current;
      if (!hero || !form) return;
      const heroBottom = hero.getBoundingClientRect().bottom;
      const formTop = form.getBoundingClientRect().top;
      setStickyVisible(heroBottom <= 0 && formTop > 110);
    };

    const requestSync = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(syncSticky);
    };

    syncSticky();
    window.addEventListener('scroll', requestSync, { passive: true });
    window.addEventListener('resize', requestSync);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestSync);
      window.removeEventListener('resize', requestSync);
    };
  }, []);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const goToForm = (serviceId?: ServiceId) => {
    if (serviceId) setActiveService(serviceId);
    goTo('d2-form');
  };

  return (
    <main className="desktop-v2">
      <section className="d2-hero" id="d2-top" ref={heroRef}>
        <header className="d2-topbar d2-shell">
          <button className="d2-identity" type="button" onClick={() => goTo('d2-about')}>
            <span className="d2-avatar">
              <img src={asset('/dmitriyaglav.webp')} alt="Дмитрий Рихальский" />
              <i className="d2-online-dot" />
            </span>
            <span className="d2-identity-copy">
              <strong>Рихальский Дмитрий</strong>
              <small>Специалист по физической реабилитации</small>
            </span>
          </button>

          <nav className="d2-nav" aria-label="Навигация по сайту">
            <button type="button" onClick={() => goTo('d2-services')}>Услуги</button>
            <button type="button" onClick={() => goTo('d2-about')}>Обо мне</button>
            <button type="button" onClick={() => goTo('d2-request')}>С чем обратиться</button>
          </nav>

          <div className="d2-top-meta">
            <span className="d2-handle">@dm_rihalsky</span>
            <span className="d2-telegram"><TelegramIcon /> Telegram</span>
            <button className="d2-top-book" type="button" onClick={() => goToForm()}>Записаться <ArrowIcon /></button>
          </div>
        </header>

        <div className="d2-hero-grid d2-shell">
          <div className="d2-hero-copy">
            <span className="d2-label">Физическая реабилитация</span>
            <h1><span>Рихальский Дмитрий</span><em>Александрович</em></h1>
            <p>Специалист по физической реабилитации. Работает с болью и ограничениями движения, восстановлением после травм и безопасным возвращением к привычной нагрузке.</p>

            <div className="d2-specialty-row">
              <div><small>Специальность</small><strong>Физическая реабилитация</strong></div>
              <i />
              <div><small>Категория</small><strong>Частная практика</strong></div>
            </div>

            <div className="d2-hero-actions">
              <button className="d2-btn d2-btn-primary" type="button" onClick={() => goToForm('offline')}>Записаться на приём <ArrowIcon /></button>
              <button className="d2-btn d2-btn-secondary" type="button" onClick={() => goToForm('online')}>Онлайн-консультация <ArrowIcon /></button>
            </div>
          </div>

          <div className="d2-hero-visual">
            <div className="d2-photo-glow" />
            <img className="d2-hero-photo" src={asset('/dimadima.PNG')} alt="Дмитрий Рихальский" />

            <div className="d2-hero-proof">
              <div><strong>13 лет</strong><span>практики</span></div>
              <div><strong>1000+</strong><span>клиентов</span></div>
            </div>

            <div className="d2-education-row" aria-label="Образование и профессиональные факты">
              <article>
                <small>Образование</small>
                <strong>Высшее</strong>
                <p>профессиональная база для системной работы</p>
              </article>
              <article>
                <small>Аудитория</small>
                <strong>1600+</strong>
                <p>профессионального блога</p>
              </article>
              <article>
                <small>Проф. сообщество</small>
                <strong>СРР</strong>
                <p>член Союза реабилитологов России</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="d2-services d2-section" id="d2-services">
        <div className="d2-shell">
          <header className="d2-section-head">
            <div>
              <span className="d2-label">Услуги</span>
              <h2>Два формата работы</h2>
            </div>
            <p>Те же форматы, условия и стоимость, что и в мобильной версии — без лишних вариантов и скрытых условий.</p>
          </header>

          <div className="d2-services-panel">
            <div className="d2-service-content">
              <div className="d2-service-tabs" role="tablist" aria-label="Формат консультации">
                {(Object.keys(services) as ServiceId[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    className={activeService === id ? 'is-active' : ''}
                    onClick={() => setActiveService(id)}
                  >
                    <span>{services[id].tab}</span>
                    <small>{services[id].eyebrow}</small>
                  </button>
                ))}
              </div>

              <div className="d2-service-main" key={activeService}>
                <span className="d2-service-kicker">{service.eyebrow}</span>
                <h3>{service.title}</h3>
                <p className="d2-service-summary">{service.summary}</p>

                <div className="d2-service-info-grid">
                  <div>
                    <small>Что даст консультация</small>
                    <ul>{service.gives.map((item) => <li key={item}>{item}</li>)}</ul>
                  </div>
                  <div>
                    <small>Кому подходит</small>
                    <ul>{service.fits.map((item) => <li key={item}>{item}</li>)}</ul>
                  </div>
                </div>

                <div className="d2-service-bottom">
                  <div className="d2-service-meta">
                    <span><small>Длительность</small><strong>{service.duration}</strong></span>
                    <span><small>Стоимость</small><strong>{service.price}</strong></span>
                  </div>
                  <button className="d2-btn d2-btn-primary" type="button" onClick={() => goToForm(activeService)}>Записаться <ArrowIcon /></button>
                </div>
              </div>
            </div>

            <div className="d2-service-photo" key={`photo-${activeService}`}>
              <img src={asset(service.image)} alt={`${service.title} с Дмитрием Рихальским`} />
              <div className="d2-service-photo-caption">
                <span>{service.eyebrow}</span>
                <strong>{service.title}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="d2-about d2-section" id="d2-about">
        <div className="d2-shell">
          <div className="d2-about-grid">
            <div className="d2-about-copy">
              <span className="d2-label">Обо мне</span>
              <h2>Системный подход к восстановлению движения.</h2>
              <p>В работе Дмитрий соединяет оценку движения, понимание нагрузки и последовательную физическую реабилитацию. Цель — не набор случайных упражнений, а понятный план: что ограничивает движение сейчас и как безопасно двигаться дальше.</p>

              <div className="d2-achievements">
                <article><strong>13</strong><span>лет практики</span></article>
                <article><strong>1000+</strong><span>клиентов</span></article>
              </div>
            </div>

            <div className="d2-about-photo-wrap">
              <div className="d2-about-photo-glow" />
              <img src={asset('/dimaosebe.webp')} alt="Дмитрий Рихальский — физическая реабилитация" />
            </div>

            <div className="d2-request" id="d2-request">
              <span className="d2-label">С чем обратиться</span>
              <h3>Когда движение стало болезненным, ограниченным или непредсказуемым.</h3>
              <div className="d2-request-list">
                {requestItems.map((item, index) => (
                  <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="d2-form-section" id="d2-form" ref={formRef}>
        <div className="d2-shell d2-form-grid">
          <div className="d2-form-copy">
            <span className="d2-label">Форма обращения</span>
            <h2>Оставьте заявку</h2>
            <p>Оставьте заявку и мы свяжемся с вами в ближайшее время, чтобы проконсультировать.</p>

            <div className="d2-form-person">
              <span className="d2-avatar d2-avatar-large">
                <img src={asset('/dmitriyaglav.webp')} alt="Дмитрий Рихальский" />
                <i className="d2-online-dot" />
              </span>
              <span><strong>Рихальский Дмитрий</strong><small>Специалист по физической реабилитации</small></span>
            </div>

            <div className="d2-contact-list">
              <span><i><TelegramIcon /></i><b>Telegram</b></span>
              <span><i className="d2-i-mark">i</i><b>@dm_rihalsky</b></span>
              <span><i><PinIcon /></i><b>Севастополь</b></span>
            </div>
          </div>

          <form className="d2-form" onSubmit={(event) => event.preventDefault()}>
            <input type="hidden" name="specialist" value="Дмитрий Рихальский" readOnly />
            <input type="hidden" name="source" value="dm-rihalsky-site" readOnly />
            <input type="hidden" name="service" value={activeService} readOnly />

            <label>
              <span>ФИО</span>
              <input name="fullName" type="text" autoComplete="name" placeholder="Иван Иванов" required />
            </label>
            <label>
              <span>Телефон</span>
              <input name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+7 999 000-00-00" required />
            </label>
            <label>
              <span>Комментарий <small>необязательно</small></span>
              <textarea name="comment" rows={5} placeholder="Коротко опишите, с чем хотите обратиться" />
            </label>
            <button type="submit">Оставить заявку <ArrowIcon /></button>
          </form>
        </div>
      </section>

      <div className={`d2-sticky${stickyVisible ? ' is-visible' : ''}`} aria-hidden={!stickyVisible}>
        <button className="d2-sticky-person" type="button" onClick={() => goTo('d2-top')}>
          <span className="d2-avatar d2-avatar-small">
            <img src={asset('/dmitriyaglav.webp')} alt="" />
            <i className="d2-online-dot" />
          </span>
          <span><strong>Рихальский Дмитрий</strong><small>Физическая реабилитация</small></span>
        </button>
        <button className="d2-sticky-book" type="button" onClick={() => goToForm()}>Запись</button>
      </div>
    </main>
  );
}
