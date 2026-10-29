/* Edit this file to fill the deck. No server or build is required.
   Each program: { id, title, slides: [...] }.
   Each slide: { title, highlight?: string, eyebrow?, lead?, tags?: string[], theme?: 'light', html?: string }.
   highlight optionally frames the final word or phrase of the title, as on /kruzhok.
   html is trusted, locally authored slide markup, never external/user-generated data.
   Add slides: [...] to any program below to replace its two default layout samples.
   Append slide objects to that array; navigation counts them automatically.
   Programs 01–03 load authored content from lesson-*.js files.
   Programs 04–07 retain their two layout samples for later lesson authoring. */
window.OUTCOMMS_PROGRAMS = [
  { id: 'models', title: 'Модели, чаты и агенты', slides: window.OUTCOMMS_MODELS_SLIDES },
  { id: 'harness', title: 'Harness: среда работы агента', slides: window.OUTCOMMS_HARNESS_SLIDES },
  { id: 'data-access', title: 'Хранение и доступ к данным', slides: window.OUTCOMMS_DATA_ACCESS_SLIDES },
  { id: 'skills', title: 'Skills и hooks', topics: ['Skill', 'Hook'], lead: 'Что такое skill и hook.' },
  { id: 'data', title: 'Агент и данные', topics: ['Агент', 'Данные'], lead: 'Как агент может работать с данными.' },
  { id: 'agents', title: 'Агенты работают вместе', topics: ['Агенты', 'Взаимодействие'], lead: 'Как агент может работать с другими агентами.' },
  { id: 'configurations', title: 'Разбор конфигураций', topics: ['Конфигурации', 'Примеры', 'Разбор'], lead: 'Примеры конфигураций с разбором.' },
].map((program, index, all) => ({
  id: program.id,
  title: program.title,
  slides: program.slides ?? [
    { eyebrow: `Программа ${String(index + 1).padStart(2, '0')} / ${String(all.length).padStart(2, '0')}`, title: program.title, highlight: program.title.split(' ').at(-1), lead: program.lead, tags: program.topics },
    { eyebrow: 'Продолжение программы', title: 'Следующий слайд', lead: 'Здесь появятся материалы встречи.', theme: 'light' },
  ],
}));
