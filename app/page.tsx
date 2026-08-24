import Image from 'next/image';

const concerns = [
  { number: '01', title: 'Спина и поясница', note: 'Боль, скованность, ограничение движения' },
  { number: '02', title: 'Шея и плечи', note: 'Дискомфорт при поворотах и подъёме руки' },
  { number: '03', title: 'Колени и суставы', note: 'Возвращение к привычной нагрузке' },
  { number: '04', title: 'После травм', note: 'Восстановление движения после операций и травм' },
  { number: '05', title: 'Осанка', note: 'Работа с двигательными привычками и дисбалансами' },
  { number: '06', title: 'Возвращение в спорт', note: 'Постепенное и контролируемое повышение нагрузки' },
];

const steps = [
  { number: '01', title: 'Разбираем ситуацию', text: 'Что беспокоит, когда началось и какие движения сейчас ограничены.' },
  { number: '02', title: 'Оцениваем движение', text: 'Смотрим подвижность, привычные компенсации и реакцию на простые тесты.' },
  { number: '03', title: 'Составляем план', text: 'Подбираем понятные упражнения и определяем следующий шаг восстановления.' },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="В начало страницы">
          <span className="brand-mark">ДР</span>
          <span className="brand-name">Дмитрий Рихальский</span>
        </a>
        <nav className="desktop-nav" aria-label="Основная навигация">
          <a href="#help">С чем работаю</a>
          <a href="#process">Как проходит</a>
          <a href="#about">Обо мне</a>
        </nav>
        <a className="header-cta" href="#contact">Записаться <span aria-hidden="true">↗</span></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Физическая реабилитация · Севастополь</p>
          <h1>Вернуться<br />к движению.</h1>
          <p className="hero-lead">Помогаю разобраться, почему движение стало болезненным или ограниченным, и составляю индивидуальный план восстановления.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#contact">Разобрать мой случай <span aria-hidden="true">↗</span></a>
            <a className="text-link" href="#process">Как проходит консультация <span>↓</span></a>
          </div>
          <div className="hero-facts" aria-label="Основная информация о консультации">
            <div><strong>60</strong><span>минут</span></div>
            <div><strong>5 000 ₽</strong><span>стоимость</span></div>
            <div><strong>2 формата</strong><span>очно и онлайн</span></div>
          </div>
        </div>

        <div className="hero-visual" aria-label="Дмитрий Рихальский">
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />
          <div className="portrait-frame">
            <Image src="/portrait-story.png" alt="Дмитрий Рихальский, специалист по физической реабилитации" fill priority sizes="(max-width: 760px) 88vw, 42vw" className="portrait-image" />
            <div className="portrait-shade" />
          </div>
          <div className="visual-note note-top"><span>Очно</span><strong>Севастополь</strong></div>
          <div className="visual-note note-bottom"><span>Онлайн</span><strong>Из любой точки</strong></div>
          <p className="visual-caption">Движение — это навык,<br />который можно вернуть.</p>
        </div>
      </section>

      <section className="concerns section" id="help">
        <div className="section-heading">
          <p className="eyebrow"><span /> С чем можно обратиться</p>
          <h2>Когда тело<br />мешает жить активно</h2>
          <p>Начинаем не с универсального упражнения, а с понимания вашей ситуации.</p>
        </div>
        <div className="concern-grid">
          {concerns.map((item) => (
            <article className="concern-card" key={item.number}>
              <span className="card-number">{item.number}</span>
              <div><h3>{item.title}</h3><p>{item.note}</p></div>
              <span className="card-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="process section" id="process">
        <div className="process-intro">
          <p className="eyebrow light"><span /> Как проходит работа</p>
          <h2>Понятный путь<br />без случайных действий</h2>
          <p>Консультация помогает увидеть исходную точку и получить реалистичный план дальнейшей работы.</p>
        </div>
        <div className="steps">
          {steps.map((step) => (
            <article className="step" key={step.number}>
              <span>{step.number}</span>
              <div><h3>{step.title}</h3><p>{step.text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="about section" id="about">
        <div className="about-statement">
          <p className="eyebrow"><span /> Подход</p>
          <p className="about-quote">Разобраться в движении. Понять исходную точку. Выстроить последовательный план восстановления.</p>
        </div>
        <div className="about-card">
          <div className="about-name">
            <span>ДР</span>
            <div><strong>Дмитрий Рихальский</strong><p>Специалист по физической реабилитации</p></div>
          </div>
          <p className="about-text">Работаю с болью и ограничениями движения, восстановлением после травм, нарушениями осанки и возвращением к физической активности.</p>
          <div className="about-tags"><span>Индивидуальный подход</span><span>Практика движения</span><span>Очно и онлайн</span></div>
        </div>
      </section>

      <section className="format section">
        <div className="section-heading format-heading">
          <p className="eyebrow"><span /> Форматы консультации</p>
          <h2>Выберите удобный<br />способ начать</h2>
        </div>
        <div className="format-grid">
          <article className="format-card featured">
            <div className="format-top"><span>01</span><p>Севастополь</p></div>
            <h3>Очная<br />консультация</h3>
            <p className="format-description">Личная оценка движения и индивидуальные рекомендации.</p>
            <div className="format-price"><strong>5 000 ₽</strong><span>/ 60 минут</span></div>
            <a href="#contact">Записаться <span>↗</span></a>
          </article>
          <article className="format-card">
            <div className="format-top"><span>02</span><p>Видеосвязь</p></div>
            <h3>Онлайн-<br />консультация</h3>
            <p className="format-description">Разбор запроса по видеосвязи и рекомендации для дальнейшей работы.</p>
            <div className="format-price"><strong>5 000 ₽</strong><span>/ 60 минут</span></div>
            <a href="#contact">Записаться <span>↗</span></a>
          </article>
        </div>
      </section>

      <section className="contact section" id="contact">
        <div className="contact-copy">
          <p className="eyebrow light"><span /> Запись на консультацию</p>
          <h2>Расскажите,<br />что вас беспокоит</h2>
          <p>Напишите Дмитрию в Instagram. Укажите, нужен очный или онлайн-формат — детали и свободное время согласуете в переписке.</p>
        </div>
        <a className="contact-button" href="https://www.instagram.com/dm_rihalsky/" target="_blank" rel="noreferrer">
          <span className="contact-label">Написать в Instagram</span>
          <span className="contact-handle">@dm_rihalsky</span>
          <span className="contact-arrow" aria-hidden="true">↗</span>
        </a>
      </section>

      <footer>
        <div className="footer-brand"><span className="brand-mark">ДР</span><p>Дмитрий Рихальский<br /><small>Физическая реабилитация</small></p></div>
        <p className="footer-note">Информация на сайте не является медицинским диагнозом. Имеются противопоказания, необходима консультация специалиста.</p>
        <a href="#top">Наверх ↑</a>
      </footer>
    </main>
  );
}
