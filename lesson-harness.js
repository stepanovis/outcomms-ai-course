/* Program 02. Academic lecture draft for slide-by-slide review, 2026-10-07.
   Examples and comparison axes are authored teaching devices, not measured results.
   The core definition is deliberately scoped to agent harnesses. */
(() => {
  const sources = {
    loop: ['Anthropic: устройство harness', 'https://www.anthropic.com/engineering/managed-agents'],
    long: ['Anthropic: длительные задачи и состояние', 'https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents'],
    agents: ['Anthropic: workflows и агенты', 'https://www.anthropic.com/engineering/building-effective-agents'],
    eval: ['Anthropic: оценка агентных систем', 'https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents'],
  };
  const source = key => `<p class="lesson-source">Опора: <a href="${sources[key][1]}" target="_blank" rel="noopener noreferrer">${sources[key][0]}</a></p>`;
  const hermesDocs = {
    tools: ['Инструменты', 'features/tools'],
    security: ['Ограничения', 'security'],
    skills: ['Skills', 'features/skills'],
    messaging: ['Мессенджеры', 'messaging/'],
    cron: ['Расписание', 'features/cron'],
    context: ['Файлы контекста', 'features/context-files'],
    hooks: ['Hooks', 'features/hooks'],
    delegation: ['Субагенты', 'features/delegation/'],
    memory: ['Память и история', 'features/memory'],
  };
  const hermesSource = keys => '<p class="lesson-source">Hermes: ' + keys.map(key => `<a href="https://hermes-agent.nousresearch.com/docs/user-guide/${hermesDocs[key][1]}" target="_blank" rel="noopener noreferrer">${hermesDocs[key][0]}</a>`).join(' · ') + '</p>';
  const cards = items => `<div class="lesson-grid">${items.map(([title, body]) => `<section class="lesson-card"><h3>${title}</h3><div class="card-copy">${body}</div></section>`).join('')}</div>`;
  const takeaway = text => `<p class="lesson-takeaway">${text}</p>`;
  const flow = items => `<ol class="flow">${items.map(([title, body]) => `<li>${title}<small>${body}</small></li>`).join('')}</ol>`;
  const slide = (section, title, lead, html) => ({eyebrow: section, title, lead, html});
  window.OUTCOMMS_HARNESS_SLIDES = [
    {eyebrow: 'Программа 02 / Рабочая версия для разбора', title: 'Harness: как настроить работу с ИИ', highlight: 'с ИИ', lead: 'От общих возможностей модели — к нужному качеству результата и удобству работы.', tags: ['Понятие', 'Устройство', 'Выбор']},
    slide('Карта лекции', 'Девять вопросов о harness', 'От определения — к обоснованному выбору.', cards([
      ['Понять', 'Что это? Чем отличается? Зачем нужен? Из чего состоит? Как работает?'],
      ['Сопоставить и выбрать', 'Какие бывают? Где ограничения? Как выбирать? Как проверить выбор?'],
    ]) + takeaway('Главный вопрос: какие условия работы ИИ нужны именно для нашей задачи?')),
    slide('01 / Что такое harness', 'Что такое harness', 'Harness — программная система вокруг ИИ-модели, которая управляет циклом выполнения задачи: передаёт модели контекст, исполняет запрошенные ею действия и определяет условия продолжения и остановки.', flow([
      ['Контекст', 'Инструкции и данные для текущего шага'], ['Действия', 'Вызов разрешённых инструментов'], ['Цикл', 'Возврат результата модели и следующий шаг'],
    ]) + takeaway('В этой лекции речь об агентном harness: он задаёт правила, по которым модель работает над задачей.') + source('loop')),
    slide('01 / Что такое harness', 'Что делает harness настраиваемым', 'Программные механизмы задают, что ИИ знает, что может делать и как приходит к результату.', '<div class="harness-components">' + cards([
      ['01 / Вызов модели', 'Выбор модели и параметров: глубина рассуждения, длина ответа, бюджет запроса.'],
      ['02 / Инструкции и skills', 'Роли, правила, примеры и подключаемые процедуры для конкретной задачи.'],
      ['03 / Сборка контекста', 'Поиск по источникам, отбор данных, загрузка нужного и сжатие истории.'],
      ['04 / Память и состояние', 'История, файлы, прогресс и контрольные точки для продолжения работы.'],
      ['05 / Инструменты и связи', 'Вызовы API, MCP, поиск, браузер и действия в рабочих системах.'],
      ['06 / Среда исполнения', 'Файлы, зависимости, запуск кода и изоляция рабочего пространства.'],
      ['07 / Управление ходом', 'Этапы, подагенты, повторы при сбоях, лимиты времени и условия остановки.'],
      ['08 / Права и согласования', 'Разрешённые действия и данные; когда требуется решение человека.'],
      ['09 / Обработчики событий', 'Hooks: свой код до и после действий, при запуске и завершении.'],
      ['10 / Проверка результата', 'Схемы ответа, шаблоны, тесты и критерии приёмки; возврат на исправление.'],
      ['11 / Наблюдение и оценка', 'Журнал шагов, ошибки, стоимость, версии настроек и сравнение качества.'],
      ['12 / Интерфейс и запуск', 'Чат, формы, расписания и события; показ прогресса и доставка результата.'],
    ]) + '</div><p class="harness-components-note">Карта возможностей, а не обязательный стандарт: состав и глубина настройки различаются. Настраиваем процесс; веса модели не меняем.</p><p class="lesson-source">Опора: <a href="https://code.claude.com/docs/en/agent-sdk/overview" target="_blank" rel="noopener noreferrer">Agent SDK</a> · <a href="https://www.anthropic.com/engineering/managed-agents" target="_blank" rel="noopener noreferrer">Устройство harness</a>. Группировка — учебная.</p>'),
    slide('Классификация / По назначению', 'Для каких задач создают харнессы', 'Шесть классов по ожидаемому результату. Одна система может решать задачи нескольких классов.', '<div class="harness-classes">' + cards([
      ['Разработка ПО', 'Создать функцию, исправить ошибку, проверить код.<small>Среда: репозиторий, команды, тесты, Git.</small><small>Пример: <a href="https://code.claude.com/docs/en/overview" target="_blank" rel="noopener noreferrer">Claude Code</a>.</small>'],
      ['Исследования', 'Найти сведения и подготовить обзор с источниками.<small>Среда: поиск, чтение, сбор свидетельств.</small><small>Пример: <a href="https://github.com/assafelovic/gpt-researcher" target="_blank" rel="noopener noreferrer">GPT Researcher</a>.</small>'],
      ['Анализ данных', 'Рассчитать показатели, очистить данные, построить графики.<small>Среда: таблицы, БД, Python и SQL.</small><small>Основа для сборки: <a href="https://docs.pandas-ai.com/v3/introduction" target="_blank" rel="noopener noreferrer">PandasAI</a>.</small>'],
      ['Документы и офис', 'Подготовить презентацию, сводку, таблицу; разобрать файлы.<small>Среда: документы и рабочие приложения.</small><small>Пример: <a href="https://claude.com/resources/articles/cowork-web-mobile" target="_blank" rel="noopener noreferrer">Claude Cowork</a>.</small>'],
      ['Бизнес-процессы', 'Обработать заявку и провести её через этапы согласования.<small>Среда: CRM/ERP, API, RPA, правила процесса.</small><small>Пример: <a href="https://docs.uipath.com/agents/automation-cloud/latest/user-guide/about-agents" target="_blank" rel="noopener noreferrer">UiPath Agents + Maestro</a>.</small>'],
      ['Диалоговое обслуживание', 'Консультировать, уточнять запрос и помогать клиенту.<small>Среда: диалог, инструменты, передача ролям.</small><small>Основа для сборки: <a href="https://docs.livekit.io/agents/" target="_blank" rel="noopener noreferrer">LiveKit Agents</a>.</small>'],
    ]) + '</div>' + takeaway('Мультиагентность — способ организации: и кодинг, и исследования могут выполняться командой агентов.') + '<p class="lesson-source">Организация команд: <a href="https://docs.crewai.com/en/introduction" target="_blank" rel="noopener noreferrer">CrewAI</a> · Универсальный harness: <a href="https://www.langchain.com/deep-agents" target="_blank" rel="noopener noreferrer">Deep Agents</a>. Учебная классификация; ссылки в карточках ведут к источникам.</p>'),
    slide('03 / Архитектура / Hermes Agent', 'Как устроен Hermes', 'В центре — агентный цикл. Вокруг — подключаемые правила, действия и способы запуска.', `
      <div class="hermes-architecture" aria-label="Упрощённая архитектура Hermes Agent">
        <div class="ha-entry">
          <div><strong>Интерфейсы</strong><span>CLI · Telegram через шлюз</span></div>
          <div><strong>Команды</strong><span>/model · /status · вызов skill</span></div>
          <div><strong>Cron</strong><span>Поручение по расписанию</span></div>
        </div>
        <div class="ha-connector ha-start">↓ <span>запуск и управление</span></div>
        <div class="ha-main">
          <section class="ha-node ha-context">
            <h3>Контекст и процедуры</h3>
            <p><strong>AGENTS.md</strong><br>Правила проекта</p>
            <p><strong>SOUL.md</strong><br>Роль и стиль общения</p>
            <p><strong>Skills</strong><br>Инструкции, шаблоны, скрипты</p>
          </section>
          <div class="ha-connector ha-horizontal" aria-label="Контекст передаётся циклу">→</div>
          <section class="ha-node ha-core">
            <div class="ha-model"><strong>ИИ-модель</strong><span>Выбирает следующий шаг</span></div>
            <div class="ha-connector">↕</div>
            <h3>Агентный цикл</h3>
            <p>Контекст → вызов модели<br>→ исполнение запросов</p>
            <div class="ha-loop">↻ Результат инструмента<br>возвращается модели</div>
          </section>
          <div class="ha-connector ha-horizontal" aria-label="Вызов инструмента и возврат результата">↔</div>
          <section class="ha-node ha-actions">
            <h3>Действия и контроль</h3>
            <p><strong>Hooks + разрешения</strong><br>Код при событиях; проверка перед вызовом</p>
            <p><strong>Инструменты + MCP</strong><br>Поиск, файлы, внешние сервисы</p>
            <p><strong>Среда исполнения</strong><br>Локально · Docker · сервер</p>
          </section>
        </div>
        <div class="ha-connector ha-delegate-link">↕ <span>delegate_task: цель + контекст ↓ · итог подзадачи ↑</span></div>
        <section class="ha-delegation" aria-label="Делегирование субагентам">
          <div><strong>Субагенты</strong><span>Отдельный контекст, свой цикл<br>Модель ↔ инструменты</span></div>
          <div><strong>А / Найти кейсы</strong><span>Ищет примеры для дайджеста</span></div>
          <div><strong>Б / Найти исследования</strong><span>Ищет данные для дайджеста</span></div>
          <p>А и Б работают параллельно → основной агент получает итоги, проверяет и собирает выпуск.</p>
        </section>
        <div class="ha-bottom">
          <div><strong>↔ Сессии и память</strong><span>История, сохранение и восстановление контекста</span></div>
          <div><strong>→ Результат</strong><span>Ответ в интерфейсе · файлы · доставка в канал</span></div>
        </div>
        <p class="ha-note">Субагент не получает всю переписку родителя: нужные сведения передаются с поручением. Skill задаёт процедуру; субагент выполняет подзадачу.</p>
      </div>
      <p class="lesson-source">Hermes: <a href="https://hermes-agent.nousresearch.com/docs/developer-guide/architecture" target="_blank" rel="noopener noreferrer">Архитектура</a> · <a href="https://hermes-agent.nousresearch.com/docs/user-guide/features/context-files" target="_blank" rel="noopener noreferrer">Файлы контекста</a> · <a href="https://hermes-agent.nousresearch.com/docs/user-guide/features/hooks" target="_blank" rel="noopener noreferrer">Hooks</a> · <a href="https://hermes-agent.nousresearch.com/docs/user-guide/features/delegation/" target="_blank" rel="noopener noreferrer">Субагенты</a></p>`),
    slide('03 / Архитектура подробно / Контекст и процедуры', 'Настраиваем Hermes для дайджеста', 'Задача: еженедельный черновик из трёх новостей для редактора сообщества внутрикомов.', `
      <div class="hermes-setup">
        <div class="hs-workspace"><strong>1. Создаём рабочую папку проекта, например weekly-digest/</strong><p>Кладём туда список источников sources.md и файл правил AGENTS.md; создаём drafts/ для черновиков. Запускаем Hermes из этой папки. Эти названия и структура — наш выбор для примера.</p></div>
        <div class="hs-files">
          <section class="lesson-card">
            <h3>2. AGENTS.md — правила проекта</h3>
            <p>Обычный текстовый файл: объясняем агенту, для кого он работает, где брать данные и что считать готовым. Hermes добавляет эти инструкции в контекст.</p>
            <div class="hs-example"><strong>Пример содержимого:</strong><br>Читатель — специалист по внутрикомам.<br>Источники — из sources.md.<br>У новости должны быть дата и ссылка.<br>Нет подтверждения — пометь пробел.<br>Черновик сохраняй в drafts/.</div>
          </section>
          <section class="lesson-card">
            <h3>3. SOUL.md — роль и стиль</h3>
            <p>В домашней папке Hermes задаём общую манеру работы этого помощника.</p>
            <div class="hs-example">«Ты редакционный помощник. Пиши ясно и кратко. Объясняй термины. Отделяй факты от предположений».</div>
          </section>
          <section class="lesson-card">
            <h3>4. Skill digest — процедура</h3>
            <p>Создаём и устанавливаем свой skill. В его SKILL.md записываем порядок подготовки; рядом кладём шаблон выпуска.</p>
            <div class="hs-example">Прочитать источники → отобрать новости за нужный период → проверить даты и ссылки → оформить по шаблону → сохранить черновик.</div>
          </section>
        </div>
        <div class="hs-request"><strong>5. Даём поручение на этот выпуск</strong><p>«/digest Подготовь выпуск за 1–7 октября: три новости об адаптации сотрудников. Сохрани черновик для редактора».</p></div>
        <p class="hs-note">Это учебная настройка: файлы и skill создаём сами. AGENTS.md содержит общие правила, skill — шаги, сообщение — условия выпуска. Здесь предполагаем, что нет .hermes.md или AGENTS.override.md с более высоким приоритетом. Инструменты и права настроим на следующем слайде.</p>
      </div>` + hermesSource(['context', 'skills'])),
    slide('03 / Архитектура подробно / Действия и контроль', 'Даём Hermes инструменты и границы', 'Та же задача: прочитать источники и сохранить черновик дайджеста в weekly-digest/drafts/.', `
      <div class="hermes-setup">
        <div class="hs-workspace"><strong>1. Определяем разрешённые действия</strong><p>Агент читает sources.md, ищет и открывает материалы, сохраняет черновик. Редактор проверяет выпуск и публикует его сам. Доступ к рассылке и её учётные данные агенту не выдаём.</p></div>
        <div class="hs-files">
          <section class="lesson-card">
            <h3>2. Подключаем инструменты</h3>
            <p>Через hermes tools выбираем web, file и skills. Настраиваем доступ к сервису веб-поиска.</p>
            <div class="hs-example"><strong>Что сможет агент:</strong><br>web_search — найти материалы.<br>web_extract — прочитать страницы.<br>read_file — прочитать источники и шаблон.<br>write_file / patch — сохранить и поправить черновик.</div>
          </section>
          <section class="lesson-card">
            <h3>3. Ограничиваем запись</h3>
            <p>Для локальной работы задаём HERMES_WRITE_SAFE_ROOT: полный путь к нашей папке weekly-digest/.</p>
            <div class="hs-example">Это ограничивает запись через write_file и patch. Чтение файлов этим параметром не ограничивается. Для нашего примера terminal и другие способы записи не включаем.</div>
          </section>
          <section class="lesson-card">
            <h3>4. Добавляем свой hook</h3>
            <p>Пишем скрипт и подключаем в config.yaml на pre_tool_call для write_file и patch.</p>
            <div class="hs-example"><strong>Наше правило:</strong> разрешать изменения только внутри drafts/. Попытку изменить AGENTS.md или sources.md блокировать с объяснением. Для ошибки самого скрипта задаём fail_closed: true.</div>
          </section>
        </div>
        <div class="hs-request"><strong>5. Проверяем настройку на двух действиях</strong><p>«Сохрани drafts/issue-01.md» → разрешено. «Перепиши sources.md» → отказ с причиной; файл не изменён.</p></div>
        <p class="hs-note">Механизмы инструментов, ограничения пути и hooks есть в Hermes; скрипт с нашим правилом нужно создать. Это контроль действий. Достоверность новостей и качество текста проверяем отдельно.</p>
      </div>` + hermesSource(['tools', 'security', 'hooks'])),
    slide('03 / Архитектура подробно / Субагенты', 'Разделяем работу над дайджестом', 'Субагенты ищут материалы параллельно; их модель и поставщик API могут отличаться от основных.', `
      <div class="hermes-setup hs-delegation-setup">
        <div class="hs-workspace"><strong>1. Выделяем независимые части задачи</strong><p>Первый ищет кейсы адаптации сотрудников, второй — исследования по теме. У каждого свой контекст и агентный цикл.</p></div>
        <div class="hs-files">
          <section class="lesson-card">
            <h3>2. Задаём поручения</h3>
            <p>Включаем delegation. Через delegate_task основной агент передаёт каждому цель и нужные сведения: период, источники, критерии отбора.</p>
            <div class="hs-example">«Найди кейсы за 1–7 октября по источникам из списка. Верни тезис, дату и ссылку». Для второго — такой же запрос на исследования. Всю переписку родителя дети не получают.</div>
          </section>
          <section class="lesson-card">
            <h3>3. Выбираем модель и API</h3>
            <p>Модель — кто обрабатывает задачу. Поставщик — через чей API мы к ней обращаемся.</p>
            <div class="hs-example"><strong>Пример сочетания:</strong><br>Основной: Claude через Anthropic.<br>Оба субагента: Gemini через OpenRouter.<br>В config.yaml задаём delegation.model и delegation.provider; подключаем доступ к выбранному API.</div>
          </section>
          <section class="lesson-card">
            <h3>4. Задаём лимиты</h3>
            <p>В разделе delegation выбираем max_concurrent_children: 2 и max_iterations: 40.</p>
            <div class="hs-example">Это наши учебные значения: два исполнителя одновременно, до 40 шагов каждому. Проверяем качество, время и расходы: более дешёвая модель выгодна, только если справляется с поручением.</div>
          </section>
        </div>
        <div class="hs-request"><strong>5. Собираем общий результат</strong><p>Кейсы + исследования → основной агент сверяет источники, убирает повторы и сохраняет выпуск. В его контекст приходят итоги работы субагентов.</p></div>
        <p class="hs-note">В Hermes настройка delegation.model / provider общая для детей delegate_task: отдельной модели на каждое поручение здесь нет. Без переопределения наследуются модель и поставщик родителя. Конкретные ID моделей выбираем из доступных у поставщика; смена модели не расширяет права агента.</p>
      </div>` + hermesSource(['delegation'])),
    slide('03 / Архитектура подробно / Сессии и память', 'Что Hermes помнит между выпусками', 'Сессия — один разговор. Память и история сохраняются между разговорами, но используются по-разному.', `
      <div class="hermes-setup hs-memory-setup">
        <div class="hs-files">
          <section class="lesson-card">
            <h3>Сессия — как отдельный чат</h3>
            <p>Разговор с агентом: поручение, ответы, результаты действий. В нём готовим выпуск.</p>
            <div class="hs-example">«Сократи вторую новость» — речь о текущем черновике.<br>Новый выпуск начинаем с новой сессии. В мессенджере окно чата может остаться тем же.</div>
          </section>
          <section class="lesson-card">
            <h3>Память — короткие заметки</h3>
            <p>Агент сохраняет важные факты и предпочтения в текстовые файлы. В начале новой сессии Hermes добавляет эти заметки в контекст модели.</p>
            <div class="hs-example">Заметка: «Редактор любит короткие абзацы».<br>Заметка остаётся, пока её не изменят или не удалят.</div>
          </section>
          <section class="lesson-card">
            <h3>История — архив разговоров</h3>
            <p>Сохраняет ход обсуждений и действий. В новую сессию весь архив не загружается: агент ищет нужное по запросу.</p>
            <div class="hs-example">«Почему отклонили тот кейс?» — находим прежнее обсуждение.<br>Начало новой сессии само по себе архив не стирает.</div>
          </section>
        </div>
        <div class="hs-request hs-memory-settings"><strong>Память тоже настраивается</strong><p>Задаём объём и правила записи: что сохранять, когда обновлять, нужно ли согласование. Harness передаёт модели инструкции и инструмент работы с памятью.</p><p>В заметке можно оставить указатель: «Выпуски — в weekly-digest/drafts/». Нужный файл агент читает отдельно; сам путь не загружает его содержимое.</p></div>
        <p class="hs-note">Один факт может быть в памяти и истории. Пример: стандартная память Hermes в одном профиле.</p>
      </div>` + hermesSource(['memory'])),
    slide('03 / Настройка рабочего места', '«Но это же всё для инженеров?»', 'Настроить harness — значит обустроить своё рабочее место для работы с ИИ. Это часть профессионального навыка.', `
      <div class="hermes-setup hs-workplace-setup">
        <div class="hs-files">
          <section class="lesson-card">
            <h3>Вы понимаете, что нужно</h3>
            <p>Какая задача, что считать хорошим результатом, какие материалы нужны и что агенту разрешено.</p>
            <div class="hs-example">Термины помогают сформулировать запрос: skill — процедура, память — важное между разговорами, инструменты — доступные действия.</div>
          </section>
          <section class="lesson-card">
            <h3>Агент помогает настроить</h3>
            <p>Ему можно поручить саму настройку: создать файлы инструкций, оформить skill, изменить доступную конфигурацию.</p>
            <div class="hs-example">Вы описываете рабочий процесс обычным языком. Агент переводит его в инструкции и настройки, объясняет изменения.</div>
          </section>
          <section class="lesson-card">
            <h3>Вы проверяете на задаче</h3>
            <p>Запускаете пробный дайджест и оцениваете источники, формат, качество текста и границы действий.</p>
            <div class="hs-example">«Новости подходят, но слишком длинные. Уточни процедуру и подготовь выпуск ещё раз».</div>
          </section>
        </div>
        <div class="hs-request"><strong>Как можно поручить настройку</strong><p>«Настрой себя для моего еженедельного дайджеста: три новости со ссылками, короткие абзацы, черновик мне на проверку. Создай инструкции и skill, объясни настройки и проверим на одном выпуске».</p></div>
        <p class="hs-note">Агент выполняет настройку в пределах выданных инструментов и прав. Вы определяете цель, предоставляете доступы и оцениваете результат.</p>
      </div>`),
    slide('03 / Выбор рабочей среды', 'Готовое приложение или универсальный harness?', 'Выбираем между готовым способом работы с ИИ и основой для организации своего процесса.', `
      <div class="hermes-setup hs-workplace-setup hs-value-setup">
        <div class="hs-files">
          <section class="lesson-card">
            <h3>Готовое приложение</h3>
            <p><strong>Даёт удобство и быстрый старт.</strong> Интерфейс, модели и основные инструменты уже соединены в продукт.</p>
            <div class="hs-example">Можно сразу обсуждать задачу, искать информацию, работать с файлами и получать результат.<br><br>Подстраиваем работу через доступные инструкции, проекты и подключения. Большую часть устройства и обслуживания берёт на себя поставщик.</div>
          </section>
          <section class="lesson-card">
            <h3>Универсальный harness</h3>
            <p><strong>Даёт основу для своего рабочего процесса.</strong> Generic означает «универсальный»: конкретную специализацию задаём мы.</p>
            <div class="hs-example">Соединяем нужные модели, инструменты, правила, память и способы запуска. Можно закрепить свою процедуру и добавить проверки.<br><br>Получаем больше контроля над организацией работы; настройка и поддержка требуют нашего участия.</div>
          </section>
        </div>
        <div class="hs-request"><strong>На примере дайджеста</strong><p>Готовое приложение помогает быстро подготовить выпуск. Настроенный harness позволяет собрать процесс под редакцию: свои источники, порядок отбора, проверку и передачу черновика.</p></div>
        <p class="hs-note">Возможности пересекаются: готовые приложения тоже умеют автоматизацию и имеют собственный harness. Здесь сравниваем готовый продукт и настраиваемую основу вроде Hermes. Качество проверяем в обоих случаях.</p>
      </div>
      <p class="lesson-source">Учебное сравнение подходов. Примеры: <a href="https://learn.chatgpt.com/docs/use-chatgpt" target="_blank" rel="noopener noreferrer">ChatGPT</a> · <a href="https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects" target="_blank" rel="noopener noreferrer">Claude</a> · <a href="https://hermes-agent.nousresearch.com/docs/user-guide/configuration" target="_blank" rel="noopener noreferrer">Hermes</a>.</p>`),
    slide('03 / Готовые варианты', 'Какие готовые среды можно выбрать?', 'Кроме Hermes: среды для работы с агентом и платформы для ведения проектов командой.', `
      <div class="hermes-setup hs-workplace-setup hs-catalog">
        <p class="hs-catalog-label"><strong>Работа с агентом</strong></p>
        <div class="hs-files">
          <section class="lesson-card"><h3>OpenClaw</h3><p>Помощник в Telegram, WhatsApp и других каналах. Работает на вашем компьютере или сервере; есть веб-интерфейс.</p></section>
          <section class="lesson-card"><h3>Agent Zero</h3><p>Среда в браузере для исследований и работы с файлами. Launcher помогает установить и запустить агента.</p></section>
          <section class="lesson-card"><h3>goose</h3><p>Агент на рабочем компьютере: приложение и терминал, подключаемые инструменты. Заметен акцент на разработке.</p></section>
        </div>
        <p class="hs-catalog-label"><strong>Проекты и координация команды</strong> — кто делает работу, зачем и кому передаёт</p>
        <div class="hs-files hs-catalog-team">
          <section class="lesson-card"><h3>Paperclip</h3><p>Организация как в компании: цели, проекты, роли, задачи, делегирование, бюджеты и согласования. Подключаем агентные движки и задаём структуру команды.</p></section>
          <section class="lesson-card"><h3>Kelly</h3><p>Настольный AI-офис: агенты, чат, задачи, документы и рабочие папки проекта. Агенты передают работу, владелец проверяет и принимает результат.</p></section>
        </div>
        <div class="hs-request"><strong>Готовая среда — основа для своего процесса</strong><p>Подключаем модели или агентные движки, материалы и права. Для редакции задаём цепочку: поиск новостей → текст → проверка → приёмка человеком.</p></div>
        <p class="hs-note">Paperclip и Kelly координируют агентов и их harness. Возможности пересекаются; группировка показывает основной сценарий, а не жёсткую границу.</p>
      </div>
      <p class="lesson-source">Источники: <a href="https://docs.openclaw.ai/start/openclaw" target="_blank" rel="noopener noreferrer">OpenClaw</a> · <a href="https://www.agent-zero.ai/p/docs/installation/" target="_blank" rel="noopener noreferrer">Agent Zero</a> · <a href="https://goose-docs.ai/docs/quickstart/" target="_blank" rel="noopener noreferrer">goose</a> · <a href="https://docs.paperclip.ing/guides/welcome/what-is-paperclip/" target="_blank" rel="noopener noreferrer">Paperclip</a>; Kelly — справка приложения. 08.10.2026.</p>`),
    slide('03 / Проверка и улучшение', 'Как понять, что harness стал лучше?', 'Повторяем знакомые задачи, сравниваем результаты и превращаем подтверждённые ошибки в новые правила.', `
      <div class="hermes-setup hs-workplace-setup hs-learning">
        <div class="hs-files">
          <section class="lesson-card">
            <h3>1. Повторяем задачи</h3>
            <p>Сохраняем задания и материалы прошлых дайджестов: обычный выпуск, мало новостей, спорный источник.</p>
            <div class="hs-example">Старую и новую настройку запускаем несколько раз на одинаковых данных, с той же моделью и начальным состоянием памяти.<br>Часть задач оставляем для проверки, без подгонки под них.</div>
          </section>
          <section class="lesson-card">
            <h3>2. Считаем качество</h3>
            <p>Заранее задаём критерии: факты подтверждены, период соблюдён, нет дублей, формат подходит редактору.</p>
            <div class="hs-example">Сравниваем долю выпусков без правок, число ошибок, время и стоимость.<br>Формат проверяет программа; смысл и подтверждение фактов — редактор. Оценки ИИ сверяем с человеческими.</div>
          </section>
          <section class="lesson-card">
            <h3>3. Учимся на правках</h3>
            <p>Сохраняем ошибку, исправление и причину. Агент предлагает изменение инструкции или skill.</p>
            <div class="hs-example">Проверяем новую версию на всём наборе, включая отложенные задачи. Если стало лучше без новых ошибок — принимаем.<br>Сохраняем прежнюю версию для отката и следим за следующими выпусками.</div>
          </section>
        </div>
        <div class="hs-request"><strong>Как поручить агенту этот цикл</strong><p>«После моей правки запиши, что и почему исправлено. Предложи изменение skill дайджеста, сравни версии на проверочных задачах и покажи результаты. Сохраняй новое правило после моего одобрения».</p></div>
        <p class="hs-note">Здесь «самообучение» — настроенный цикл обратной связи: меняются инструкции, skills и сохранённый опыт, а не веса модели. Самооценка агента сама по себе не доказывает улучшение.</p>
      </div>
      <p class="lesson-source">Основа: <a href="https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents" target="_blank" rel="noopener noreferrer">Anthropic — оценка агентов</a> · <a href="https://hermes-agent.nousresearch.com/docs/user-guide/features/skills" target="_blank" rel="noopener noreferrer">Hermes — skills</a>. Цикл дайджеста — учебная настройка.</p>`),
    slide('04 / Свой harness', 'Можно собрать свой harness', 'Если у вас специфическая задача, вокруг модели можно построить собственную рабочую среду — под ваш процесс.', `
      <div class="hermes-setup hs-workplace-setup hs-value-setup">
        <div class="hs-files">
          <section class="lesson-card">
            <h3>Своя память</h3>
            <p>Вы определяете, что сохранять между запусками, как находить прошлый опыт и когда его обновлять.</p>
          </section>
          <section class="lesson-card">
            <h3>Нужные инструменты</h3>
            <p>Подключаете свои системы и действия: например, поиск по базе компании и сохранение черновика.</p>
          </section>
          <section class="lesson-card">
            <h3>Свои материалы и границы</h3>
            <p>Выбираете, что давать модели. Доступ к данным и действиям ограничиваете правами и кодом.</p>
          </section>
          <section class="lesson-card">
            <h3>Свой порядок работы</h3>
            <p>Задаёте инструкции, этапы и проверки: сначала собрать факты, затем сделать вывод, затем проверить.</p>
          </section>
        </div>
        <div class="hs-request"><strong>Например, помощник редактора</strong><p>Помнит принятые формулировки → читает только выбранные папки → готовит дайджест по вашему шаблону → передаёт редактору на проверку.</p></div>
        <p class="hs-note">Можно расширить готовую среду или разработать свою. Вы управляете условиями работы модели; качество результата проверяете на своих задачах.</p>
      </div>`),
    slide('05 / Задание', 'Объясните, как работает ваш AI-помощник', 'Выберите повторяющуюся задачу: дайджест, подготовку встречи или разбор обратной связи. Можно взять пример из лекции.', `
      <div class="hermes-setup hs-workplace-setup">
        <div class="hs-files">
          <section class="lesson-card">
            <h3>1. Нарисуйте схему</h3>
            <p>Покажите модель, инструкции и материалы, инструменты и то, что сохраняется между запусками.</p>
            <div class="hs-example">У каждого элемента поясните своими словами: зачем он нужен именно в вашей задаче?<br><br>Выберите нужные механизмы — использовать все необязательно.</div>
          </section>
          <section class="lesson-card">
            <h3>2. Проведите поручение</h3>
            <p>Объясните по схеме, как поручение поступает агенту и превращается в результат.</p>
            <div class="hs-example">Что получает модель? Как вызывается инструмент и его ответ возвращается модели? Что получает человек и кто решает, что работа готова?</div>
          </section>
          <section class="lesson-card">
            <h3>3. Исправьте ошибку</h3>
            <p>Выберите одну повторяющуюся ошибку. Например, агент включает старые новости в дайджест.</p>
            <div class="hs-example">Что вы измените в настройке? На каких задачах и по каким признакам проверите, что стало лучше?</div>
          </section>
        </div>
        <div class="hs-request"><strong>Что представить</strong><p>Схему и короткое объяснение голосом или текстом: задача → устройство помощника → один проход работы → улучшение. Устанавливать программы не нужно; подсматривать в слайды можно.</p></div>
        <p class="hs-note"><strong>Хороший ответ:</strong> вы различаете модель и harness, объясняете движение информации и действий, связываете настройки со своей задачей и предлагаете проверку результата.</p>
      </div>`),
  ];
})();
