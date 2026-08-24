'use client';

import { useEffect } from 'react';

const concerns = [
  ['01', 'Спина и поясница', 'Когда боль, скованность или ограничение мешают привычно двигаться.'],
  ['02', 'Шея и плечевой пояс', 'Когда повороты, подъём руки или длительная нагрузка вызывают дискомфорт.'],
  ['03', 'Колени и суставы', 'Когда хочется вернуть уверенность в ходьбе, приседании и повседневной нагрузке.'],
  ['04', 'После травмы', 'Когда нужно последовательно вернуть движение и постепенно увеличить нагрузку.'],
  ['05', 'Возвращение к спорту', 'Когда важно вернуться к тренировкам без хаотичного увеличения нагрузки.'],
  ['06', 'Неясное ограничение', 'Когда движение изменилось, но непонятно, с чего начинать восстановление.'],
];

const steps = [
  ['01', 'Разбираем запрос', 'Что беспокоит, как давно, какие движения стали сложнее и чего вы хотите вернуть.'],
  ['02', 'Оцениваем движение', 'Смотрим подвижность, реакцию на нагрузку и простые двигательные тесты.'],
  ['03', 'Собираем план', 'Определяем приоритеты, упражнения и понятную последовательность дальнейшей работы.'],
];

const vertebrae = Array.from({ length: 14 });

export default function Home() {
  useEffect(() => {
    document.body.classList.add('is-ready');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.14 }
    );
    document.querySelectorAll('[data-reveal]').forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <div className="intro" aria-hidden="true"><span>Движение</span></div>

      <header className="nav">
        <a className="brand" href="#top">Дмитрий Рихальский<small>физическая реабилитация</small></a>
        <nav aria-label="Основная навигация">
          <a href="#help">С чем работаю</a>
          <a href="#process">Как проходит</a>
          <a href="#format">Форматы</a>
        </nav>
        <a className="navCta" href="#contact">Связаться <span>↗</span></a>
      </header>

      <section className="hero" id="top">
        <div className="heroWords">
          <p className="heroKicker">Физическая реабилитация · Севастополь · онлайн</p>
          <h1>
            <span>Вернуться</span>
            <span className="accentLine"><em>к движению</em></span>
            <span>уверенно</span>
          </h1>
          <p className="heroLead">Помогаю понять, что ограничивает движение, оценить исходную точку и выстроить индивидуальный план восстановления — очно в Севастополе или онлайн.</p>
          <div className="heroActions">
            <a className="button primaryButton" href="#contact">Разобрать мой случай <span>↗</span></a>
            <a className="textLink" href="#process">Как проходит консультация ↓</a>
          </div>
        </div>

        <div className="heroVisual" aria-hidden="true">
          <div className="motionHalo haloOne" />
          <div className="motionHalo haloTwo" />
          <div className="spineObject">
            {vertebrae.map((_, index) => <span className="vertebra" key={index} style={{ '--i': index } as React.CSSProperties} />)}
          </div>
          <p className="visualNote"><span>движение</span><strong>не шаблон.<br />это система.</strong></p>
        </div>
      </section>

      <div className="factsMarquee" aria-label="60 минут, 5 000 рублей, очно и онлайн">
        <div className="factsTrack" aria-hidden="true">
          {[0, 1].map((set) => (
            <div className="factsSet" key={set}>
              <span>60 минут <b>·</b> 5 000 ₽ <b>·</b> Очно в Севастополе <b>·</b> Онлайн <b>·</b></span>
              <span>60 минут <b>·</b> 5 000 ₽ <b>·</b> Очно в Севастополе <b>·</b> Онлайн <b>·</b></span>
            </div>
          ))}
        </div>
      </div>

      <section className="helpSection" id="help">
        <div className="sectionIntro reveal" data-reveal>
          <p>С чем можно обратиться</p>
          <h2>Когда движение<br /><em>перестало быть простым</em></h2>
          <span>Начинаем не с набора универсальных упражнений, а с вашей конкретной ситуации.</span>
        </div>
        <div className="concernGrid reveal" data-reveal>
          {concerns.map(([number, title, text]) => (
            <article className="concernCard" key={number}>
              <span className="cardIndex">{number}</span>
              <div><h3>{title}</h3><p>{text}</p></div>
              <span className="cardMark" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="processSection" id="process">
        <div className="processStatement reveal" data-reveal>
          <p>Принцип работы</p>
          <h2>Сначала <em>понять.</em><br />Потом нагружать.</h2>
          <p className="processLead">Консультация нужна не для того, чтобы выдать случайный комплекс упражнений, а чтобы определить исходную точку и следующий разумный шаг.</p>
        </div>
        <div className="steps reveal" data-reveal>
          {steps.map(([number, title, text]) => (
            <article className="step" key={number}>
              <span>{number}</span>
              <div><h3>{title}</h3><p>{text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="resultSection">
        <div className="resultTitle reveal" data-reveal>
          <p>Что остаётся после консультации</p>
          <h2>Не просто<br /><em>«делайте упражнения»</em></h2>
        </div>
        <div className="resultList reveal" data-reveal>
          <article><span>01</span><h3>Понимание исходной точки</h3><p>Что сейчас ограничивает движение и на что стоит обратить внимание в первую очередь.</p></article>
          <article><span>02</span><h3>Приоритеты восстановления</h3><p>Что делать сейчас, а что не нужно форсировать раньше времени.</p></article>
          <article><span>03</span><h3>План следующих действий</h3><p>Понятная последовательность упражнений и дальнейшего увеличения нагрузки.</p></article>
        </div>
      </section>

      <section className="formatSection" id="format">
        <div className="formatIntro reveal" data-reveal>
          <p>Форматы</p>
          <h2>Начать можно<br /><em>двумя способами</em></h2>
          <span>Одинаковая логика разбора — отличается только формат встречи.</span>
        </div>
        <div className="formatGrid reveal" data-reveal>
          <article className="formatCard featured">
            <div className="formatTop"><span>01</span><small>Севастополь</small></div>
            <h3>Очная<br />консультация</h3>
            <p>Личная оценка движения, двигательные тесты и рекомендации по дальнейшей работе.</p>
            <div className="formatFacts"><strong>5 000 ₽</strong><span>60 минут</span></div>
            <a href="#contact">Разобрать мой случай <span>↗</span></a>
          </article>
          <article className="formatCard">
            <div className="formatTop"><span>02</span><small>Видеосвязь</small></div>
            <h3>Онлайн-<br />консультация</h3>
            <p>Разбор запроса, доступная оценка движения по видеосвязи и план самостоятельной работы.</p>
            <div className="formatFacts"><strong>5 000 ₽</strong><span>60 минут</span></div>
            <a href="#contact">Разобрать мой случай <span>↗</span></a>
          </article>
        </div>
      </section>

      <section className="contactSection" id="contact">
        <div className="contactGlow" aria-hidden="true" />
        <p>Запись на консультацию</p>
        <h2>Опишите,<br /><em>что мешает двигаться</em></h2>
        <span className="contactCopy">Напишите Дмитрию в Instagram. Коротко опишите ситуацию и укажите, какой формат вам удобнее — очный или онлайн.</span>
        <a className="button lightButton" href="https://www.instagram.com/dm_rihalsky/" target="_blank" rel="noreferrer">Написать @dm_rihalsky <span>↗</span></a>
      </section>

      <footer>
        <a className="footerBrand" href="#top">Дмитрий Рихальский<small>физическая реабилитация</small></a>
        <div><span>Формат</span><p>Очно · Севастополь<br />Онлайн · видеосвязь</p></div>
        <div><span>Консультация</span><p>60 минут<br />5 000 ₽</p></div>
        <div><span>Связь</span><p><a href="https://www.instagram.com/dm_rihalsky/" target="_blank" rel="noreferrer">@dm_rihalsky ↗</a></p></div>
      </footer>
    </main>
  );
}
