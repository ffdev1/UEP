/*
 * ЕОП — Единая образовательная платформа
 * Финальная версия с полной интерактивностью и глобальной синхронизацией
 * Добавлены разделы: Обучение, Путь
 */

'use strict';

// ===========================
// Состояние приложения
// ===========================
const state = {
  currentScreen: 'welcome',
  user: {
    name: 'Иван',
    surname: 'Иванов',
    patronymic: 'Иванович',
    birthDate: '2010-01-15',
    snils: '123-456-789-00',
    passport: '1234 567890',
    region: 'Сахалинская область',
    institutions: []
  },
  selectedDocType: 'study',
  selectedOrg: null,
  documents: [
    {
      id: 1,
      name: 'Справка об обучении',
      type: 'study',
      date: '22.04.2026',
      status: 'ready',
      statusText: 'Готово',
      icon: 'fas fa-file-alt',
      school: 'МБОУ «Школа №1»',
      class: '10 «А»'
    }
  ],
  pendingDoc: null,
  schedule: {
    mon: [
      { time: '09:00 - 09:45', subject: 'Математика', place: 'Кабинет 301', institution: 'МБОУ «Школа №1»', icon: 'fas fa-calculator' },
      { time: '10:00 - 10:45', subject: 'Физика', place: 'Кабинет 205', institution: 'МБОУ «Школа №1»', icon: 'fas fa-flask' },
      { time: '11:00 - 11:45', subject: 'Английский язык', place: 'Кабинет 105', institution: 'МБОУ «Школа №1»', icon: 'fas fa-language' },
      { time: '16:00 - 17:00', subject: 'Музыкальный инструмент', place: 'Кабинет 12', institution: 'Детская музыкальная школа №3', icon: 'fas fa-music' }
    ],
    tue: [
      { time: '09:00 - 09:45', subject: 'Русский язык', place: 'Кабинет 203', institution: 'МБОУ «Школа №1»', icon: 'fas fa-language' },
      { time: '10:00 - 10:45', subject: 'Литература', place: 'Кабинет 203', institution: 'МБОУ «Школа №1»', icon: 'fas fa-book-reader' },
      { time: '11:00 - 11:45', subject: 'История', place: 'Кабинет 101', institution: 'МБОУ «Школа №1»', icon: 'fas fa-history' },
      { time: '15:00 - 16:00', subject: 'Рисование', place: 'Студия 5', institution: 'Детская художественная школа', icon: 'fas fa-palette' }
    ],
    wed: [
      { time: '09:00 - 09:45', subject: 'Биология', place: 'Кабинет 402', institution: 'МБОУ «Школа №1»', icon: 'fas fa-leaf' },
      { time: '10:00 - 10:45', subject: 'Химия', place: 'Кабинет 403', institution: 'МБОУ «Школа №1»', icon: 'fas fa-flask' },
      { time: '14:00 - 15:00', subject: 'Информатика', place: 'Компьютерный класс', institution: 'МБОУ «Школа №1»', icon: 'fas fa-computer' }
    ],
    thu: [
      { time: '09:00 - 09:45', subject: 'Обществознание', place: 'Кабинет 201', institution: 'МБОУ «Школа №1»', icon: 'fas fa-handshake' },
      { time: '10:00 - 10:45', subject: 'География', place: 'Кабинет 301', institution: 'МБОУ «Школа №1»', icon: 'fas fa-globe' },
      { time: '14:00 - 15:00', subject: 'Хореография', place: 'Зал 1', institution: 'Детская школа искусств', icon: 'fas fa-shoe-prints' }
    ],
    fri: [
      { time: '09:00 - 09:45', subject: 'Физическая культура', place: 'Спортзал', institution: 'МБОУ «Школа №1»', icon: 'fas fa-futbol' },
      { time: '10:00 - 10:45', subject: 'Технология', place: 'Мастерская', institution: 'МБОУ «Школа №1»', icon: 'fas fa-hammer' },
      { time: '15:00 - 16:00', subject: 'Спортивная подготовка', place: 'Спортзал', institution: 'Спортивная школа «Олимп»', icon: 'fas fa-dumbbell' }
    ],
    sat: [
      { time: '10:00 - 11:00', subject: 'Подготовка к ОГЭ', place: 'Кабинет 150', institution: 'МБОУ «Школа №1»', icon: 'fas fa-book' },
      { time: '12:00 - 13:30', subject: 'Футбол', place: 'Стадион', institution: 'Спортивная школа «Олимп»', icon: 'fas fa-futbol' }
    ],
    sun: [
      { time: '11:00 - 12:00', subject: 'Сольфеджио', place: 'Кабинет 8', institution: 'Детская музыкальная школа №3', icon: 'fas fa-music' }
    ]
  },
  diary: [
    { subject: 'Математика', grades: '5, 4, 5', homework: 'Стр. 120, упр. 5', icon: 'fas fa-calculator' },
    { subject: 'Русский язык', grades: '5', homework: 'Написать сочинение на тему «Моё лето»', icon: 'fas fa-language' },
    { subject: 'Сольфеджио', grades: '5', homework: 'Выучить гамму До-мажор', icon: 'fas fa-music' }
  ],
  news: [
    { id: 1, title: 'Объявление: Весенние каникулы', institution: 'МБОУ «Школа №1»', date: '10 апреля 2026', desc: 'Уважаемые ученики и родители! Информируем вас о сроках весенних каникул...', icon: 'fas fa-bullhorn' },
    { id: 2, title: 'Концерт «Юные таланты»', institution: 'Детская музыкальная школа №3', date: '5 апреля 2026', desc: 'Приглашаем всех желающих на ежегодный концерт...', icon: 'fas fa-music' },
    { id: 3, title: 'Спортивное соревнование', institution: 'Спортивная школа «Олимп»', date: '12 апреля 2026', desc: 'Приглашаем принять участие в региональном чемпионате по футболу...', icon: 'fas fa-trophy' },
    { id: 4, title: 'Выставка работ учащихся', institution: 'Детская художественная школа', date: '8 апреля 2026', desc: 'Открывается выставка лучших работ наших учащихся. Приглашаем всех!', icon: 'fas fa-palette' },
    { id: 5, title: 'Родительское собрание', institution: 'МБОУ «Школа №1»', date: '15 апреля 2026', desc: 'Состоится родительское собрание по итогам третьей четверти...', icon: 'fas fa-users' }
  ],
  organizations: [
    { id: 1, name: 'МБОУ «Средняя общеобразовательная школа №1 г. Южно-Сахалинска»', type: 'Школа', address: 'г. Южно-Сахалинск, ул. Ленина, 100', phone: '+7 (4242) 12-34-56', email: 'school1@sakhalin.edu', icon: 'fas fa-school' },
    { id: 2, name: 'МБОУ «Гимназия №3»', type: 'Школа', address: 'г. Южно-Сахалинск, ул. Комсомольская, 50', phone: '+7 (4242) 23-45-67', email: 'gymnasium3@sakhalin.edu', icon: 'fas fa-school' },
    { id: 3, name: 'Лицей №2 г. Южно-Сахалинска', type: 'Школа', address: 'г. Южно-Сахалинск, ул. Советская, 75', phone: '+7 (4242) 34-56-78', email: 'lyceum2@sakhalin.edu', icon: 'fas fa-school' },
    { id: 4, name: 'Сахалинский государственный университет', type: 'ВУЗ', address: 'г. Южно-Сахалинск, ул. Ленина, 290', phone: '+7 (4242) 45-67-89', email: 'info@sgu.sakhalin.ru', icon: 'fas fa-university' },
    { id: 5, name: 'Сахалинский техникум', type: 'ВУЗ', address: 'г. Южно-Сахалинск, ул. Октябрьская, 120', phone: '+7 (4242) 56-78-90', email: 'contact@tech.sakhalin.ru', icon: 'fas fa-university' },
    { id: 6, name: 'Детская музыкальная школа №3', type: 'Дополнительное образование', address: 'г. Южно-Сахалинск, ул. Пушкина, 45', phone: '+7 (4242) 67-89-01', email: 'music3@sakhalin.edu', icon: 'fas fa-music' },
    { id: 7, name: 'Детская художественная школа г. Южно-Сахалинска', type: 'Дополнительное образование', address: 'г. Южно-Сахалинск, ул. Комсомольская, 180', phone: '+7 (4242) 78-90-12', email: 'art@sakhalin.edu', icon: 'fas fa-palette' },
    { id: 8, name: 'Спортивная школа «Олимп»', type: 'Дополнительное образование', address: 'г. Южно-Сахалинск, ул. Мира, 5', phone: '+7 (4242) 89-01-23', email: 'olimp@sakhalin.sport', icon: 'fas fa-futbol' },
    { id: 9, name: 'Детская школа искусств', type: 'Дополнительное образование', address: 'г. Южно-Сахалинск, ул. Театральная, 15', phone: '+7 (4242) 90-12-34', email: 'arts@sakhalin.edu', icon: 'fas fa-theater-masks' },
    { id: 10, name: 'Центр дополнительного образования «Развитие»', type: 'Дополнительное образование', address: 'г. Южно-Сахалинск, ул. Молодежная, 30', phone: '+7 (4242) 01-23-45', email: 'razvitie@sakhalin.edu', icon: 'fas fa-graduation-cap' }
  ],
  // ===== ОБУЧЕНИЕ =====
  learning: [
    {
      id: 1, subject: 'math', subjectName: 'Математика',
      type: 'hw', typeName: 'Домашнее задание',
      title: 'Квадратные уравнения: решение по формуле дискриминанта',
      desc: 'Решите задачи №1–15 на стр. 120. Обратите внимание на случай D < 0.',
      deadline: '24 апр, 23:59', status: 'new',
      icon: 'fas fa-calculator', color: '#2563EB', bg: '#EFF6FF',
      teacher: 'Смирнова А.В.', grade: null
    },
    {
      id: 2, subject: 'russian', subjectName: 'Русский язык',
      type: 'hw', typeName: 'Домашнее задание',
      title: 'Сочинение-рассуждение «Роль книги в жизни человека»',
      desc: 'Объём: не менее 200 слов. Соблюдайте структуру: тезис, аргументы, вывод.',
      deadline: '25 апр, 08:00', status: 'new',
      icon: 'fas fa-pen-nib', color: '#7C3AED', bg: '#F3EEFF',
      teacher: 'Петрова Н.С.', grade: null
    },
    {
      id: 3, subject: 'physics', subjectName: 'Физика',
      type: 'test', typeName: 'Тест',
      title: 'Контрольная работа: Законы Ньютона',
      desc: '15 вопросов с выбором ответа + 2 задачи с развёрнутым решением. Время: 45 минут.',
      deadline: '23 апр, 09:00', status: 'overdue',
      icon: 'fas fa-flask', color: '#EF4444', bg: '#FEE2E2',
      teacher: 'Козлов Д.М.', grade: null
    },
    {
      id: 4, subject: 'history', subjectName: 'История',
      type: 'lesson', typeName: 'Урок',
      title: 'Великая Отечественная война: основные сражения',
      desc: 'Изучите параграф 28–29, составьте хронологическую таблицу ключевых сражений.',
      deadline: '26 апр', status: 'done',
      icon: 'fas fa-landmark', color: '#10B981', bg: '#D1FAE5',
      teacher: 'Иванова Т.Р.', grade: 5
    },
    {
      id: 5, subject: 'english', subjectName: 'Английский язык',
      type: 'hw', typeName: 'Домашнее задание',
      title: 'Reading comprehension: «The Future of Technology»',
      desc: 'Прочитайте текст и ответьте на вопросы 1–8. Выучите новые слова из глоссария.',
      deadline: '24 апр, 08:00', status: 'new',
      icon: 'fas fa-language', color: '#F59E0B', bg: '#FFFBEB',
      teacher: 'Белова О.К.', grade: null
    },
    {
      id: 6, subject: 'biology', subjectName: 'Биология',
      type: 'test', typeName: 'Тест',
      title: 'Тест: Строение клетки',
      desc: '20 вопросов. Темы: органоиды клетки, митоз, мейоз. Разрешены учебники.',
      deadline: '27 апр, 10:00', status: 'new',
      icon: 'fas fa-dna', color: '#10B981', bg: '#D1FAE5',
      teacher: 'Морозова В.Л.', grade: null
    },
    {
      id: 7, subject: 'math', subjectName: 'Математика',
      type: 'lesson', typeName: 'Урок',
      title: 'Тригонометрические функции: синус, косинус, тангенс',
      desc: 'Видеоурок + конспект. Запишите основные формулы в тетрадь.',
      deadline: '22 апр', status: 'done',
      icon: 'fas fa-calculator', color: '#2563EB', bg: '#EFF6FF',
      teacher: 'Смирнова А.В.', grade: 4
    },
    {
      id: 8, subject: 'russian', subjectName: 'Русский язык',
      type: 'test', typeName: 'Тест',
      title: 'Диктант: Правописание приставок',
      desc: 'Текст диктанта будет зачитан учителем. Повторите правила пре-/при-, раз-/рас-.',
      deadline: '28 апр, 09:00', status: 'new',
      icon: 'fas fa-pen-nib', color: '#7C3AED', bg: '#F3EEFF',
      teacher: 'Петрова Н.С.', grade: null
    }
  ],
  currentFilter: {
    documents: 'all',
    schedule: 'mon',
    news: 'all',
    organizations: 'all',
    learningSubject: 'all',
    learningType: 'all'
  },
  searchQuery: ''
};

// ===========================
// Советы для раздела «Путь»
// ===========================
const pathTips = [
  'Ты на правильном пути! Уделяй 30 минут в день повторению материала — это лучше, чем зубрить всё перед экзаменом.',
  'Не бойся задавать вопросы учителям. Каждый вопрос — это шаг к пониманию, а не признак слабости.',
  'Участие в олимпиадах и конкурсах — отличный способ выделиться при поступлении в университет.',
  'Изучай английский язык каждый день хотя бы по 15 минут. Это откроет тебе двери в международные программы.',
  'Попробуй разные кружки и секции — так ты быстрее поймёшь, что тебе по-настоящему интересно.',
  'Средний балл аттестата важен при поступлении. Не запускай предметы, которые кажутся скучными.',
  'Волонтёрство и общественная деятельность — это не только полезно, но и ценится в портфолио.',
  'Поговори с родителями о своих интересах и мечтах. Они могут помочь найти нужные ресурсы и возможности.',
  'СахГУ предлагает бюджетные места по многим направлениям — изучи список специальностей заранее.',
  'Регулярный сон и физическая активность напрямую влияют на успеваемость. Береги себя!'
];

let currentTipIndex = 0;

window.refreshPathTip = function() {
  currentTipIndex = (currentTipIndex + 1) % pathTips.length;
  const tipEl = document.getElementById('path-tip-content');
  if (tipEl) {
    tipEl.style.opacity = '0';
    setTimeout(() => {
      tipEl.textContent = pathTips[currentTipIndex];
      tipEl.style.opacity = '1';
    }, 200);
  }
};

// ===========================
// Данные маршрута «Путь»
// ===========================
const pathJourney = [
  {
    id: 'grade9',
    status: 'done',
    label: 'Пройдено',
    labelClass: 'label-done',
    dotClass: '',
    year: '2024–2025',
    title: '9 класс',
    subtitle: 'МБОУ СОШ №1 г. Южно-Сахалинска',
    tips: [
      { icon: '✅', text: 'Успешно сдан ОГЭ по математике и русскому языку' },
      { icon: '🏆', text: 'Призёр районной олимпиады по информатике' }
    ],
    achievements: ['ОГЭ сдан', 'Олимпиада', 'Аттестат']
  },
  {
    id: 'grade10',
    status: 'current',
    label: 'Ты здесь',
    labelClass: 'label-current',
    dotClass: 'current',
    year: '2025–2026',
    title: '10 «А» класс',
    subtitle: 'МБОУ СОШ №1 г. Южно-Сахалинска',
    tips: [
      { icon: '📌', text: 'Сейчас ты здесь — продолжай в том же духе!' },
      { icon: '💡', text: 'Самое время определиться с направлением для поступления' },
      { icon: '📚', text: 'Запишись на подготовительные курсы к ЕГЭ — лучше начать сейчас' },
      { icon: '🎯', text: 'Участвуй в олимпиадах: победы дают льготы при поступлении' }
    ],
    achievements: []
  },
  {
    id: 'grade11',
    status: 'next',
    label: 'Следующий шаг',
    labelClass: 'label-next',
    dotClass: 'future',
    year: '2026–2027',
    title: '11 класс',
    subtitle: 'МБОУ СОШ №1 г. Южно-Сахалинска',
    tips: [
      { icon: '📝', text: 'Сдача ЕГЭ — главное событие года. Начни готовиться уже сейчас' },
      { icon: '🗂️', text: 'Собери портфолио достижений для подачи в вузы' },
      { icon: '🔍', text: 'Изучи список специальностей и проходные баллы в СахГУ' }
    ],
    achievements: []
  },
  {
    id: 'ege',
    status: 'future',
    label: 'Впереди',
    labelClass: 'label-future',
    dotClass: 'future',
    year: 'Май–июнь 2027',
    title: 'ЕГЭ',
    subtitle: 'Единый государственный экзамен',
    tips: [
      { icon: '🎯', text: 'Выбери предметы ЕГЭ в соответствии с желаемой специальностью' },
      { icon: '💪', text: 'Регулярная практика важнее зубрёжки — решай варианты каждый день' },
      { icon: '🧘', text: 'Не забывай об отдыхе: выспавшийся мозг работает лучше' }
    ],
    achievements: []
  },
  {
    id: 'admission',
    status: 'future',
    label: 'Цель',
    labelClass: 'label-goal',
    dotClass: 'future',
    year: 'Август 2027',
    title: 'Поступление',
    subtitle: 'Сахалинский государственный университет (СахГУ)',
    tips: [
      { icon: '🎓', text: 'СахГУ — ведущий вуз Сахалина с бюджетными местами по 40+ специальностям' },
      { icon: '📋', text: 'Подай документы в несколько вузов одновременно — это разрешено' },
      { icon: '🌟', text: 'Победы в олимпиадах могут дать право на поступление без экзаменов' },
      { icon: '💼', text: 'Изучи программы целевого обучения от работодателей Сахалина' }
    ],
    achievements: []
  }
];

const pathBranches = [
  {
    icon: '🎓',
    title: 'Высшее образование',
    desc: 'Поступление в СахГУ или другой вуз России. Широкий выбор специальностей: IT, медицина, педагогика, экономика.',
    tags: [{ text: 'Бюджет', color: '#D1FAE5', textColor: '#065F46' }, { text: 'СахГУ', color: '#EFF6FF', textColor: '#1D4ED8' }],
    color: '#2563EB'
  },
  {
    icon: '⚙️',
    title: 'Среднее профессиональное',
    desc: 'Техникумы и колледжи Сахалина. Быстрый старт карьеры, практические навыки, возможность совмещать с работой.',
    tags: [{ text: 'Техникум', color: '#FEF3C7', textColor: '#92400E' }, { text: 'Колледж', color: '#FEF3C7', textColor: '#92400E' }],
    color: '#F59E0B'
  },
  {
    icon: '💻',
    title: 'IT и технологии',
    desc: 'Онлайн-курсы, буткемпы, стажировки в IT-компаниях. Один из самых востребованных путей на Сахалине.',
    tags: [{ text: 'Онлайн', color: '#F3EEFF', textColor: '#7C3AED' }, { text: 'Стажировка', color: '#F3EEFF', textColor: '#7C3AED' }],
    color: '#7C3AED'
  },
  {
    icon: '🌍',
    title: 'Учёба за рубежом',
    desc: 'Программы обмена, университеты Японии и Кореи. Сахалин имеет особые связи с соседними странами.',
    tags: [{ text: 'Япония', color: '#FEE2E2', textColor: '#991B1B' }, { text: 'Корея', color: '#FEE2E2', textColor: '#991B1B' }],
    color: '#EF4444'
  },
  {
    icon: '🛢️',
    title: 'Нефтегазовая отрасль',
    desc: 'Целевое обучение от «Сахалин Энерджи» и других крупных работодателей. Гарантированное трудоустройство.',
    tags: [{ text: 'Целевое', color: '#D1FAE5', textColor: '#065F46' }, { text: 'Стипендия', color: '#D1FAE5', textColor: '#065F46' }],
    color: '#10B981'
  },
  {
    icon: '🎨',
    title: 'Творческие профессии',
    desc: 'Дизайн, музыка, театр, кино. Сахалин активно развивает культурную сферу и нуждается в творческих кадрах.',
    tags: [{ text: 'Дизайн', color: '#FEF3C7', textColor: '#92400E' }, { text: 'Искусство', color: '#FEF3C7', textColor: '#92400E' }],
    color: '#F59E0B'
  }
];

// ===========================
// Синхронизация данных пользователя на всех экранах
// ===========================
function syncUserData() {
  const initials = (state.user.surname.charAt(0) + state.user.name.charAt(0)).toUpperCase();
  const fullName = `${state.user.surname} ${state.user.name}`;

  document.querySelectorAll('.user-avatar').forEach(el => {
    el.textContent = initials;
  });
  
  document.querySelectorAll('.user-name').forEach(el => {
    el.textContent = fullName;
  });
}

// ===========================
// Навигация между экранами
// ===========================
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('screen-' + screenId);
  if (target) {
    target.classList.add('active');
    state.currentScreen = screenId;
    updateNavState(screenId);
    
    syncUserData();
    
    if (screenId === 'documents') renderDocuments();
    if (screenId === 'schedule') renderSchedule('mon');
    if (screenId === 'diary') renderDiary();
    if (screenId === 'news') renderNews();
    if (screenId === 'organizations') renderOrganizations();
    if (screenId === 'profile') renderProfile();
    if (screenId === 'learning') renderLearning();
    if (screenId === 'path') renderPath();
  }
}

function updateNavState(screenId) {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
    if (item.dataset.screen === screenId) {
      item.classList.add('active');
    }
  });
}

// ===========================
// Профиль пользователя
// ===========================
function renderProfile() {
  const profileContent = document.getElementById('profile-content');
  if (!profileContent) return;

  const fullName = `${state.user.surname} ${state.user.name} ${state.user.patronymic}`;
  profileContent.innerHTML = `
    <div class="card">
      <div class="card-title">Личные данные</div>
      <div style="display: grid; gap: 16px; margin-top: 16px;">
        <div>
          <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Полное имя</div>
          <div style="font-size: 16px; font-weight: 500;">${fullName}</div>
        </div>
        <div>
          <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Дата рождения</div>
          <div style="font-size: 16px; font-weight: 500;">${state.user.birthDate}</div>
        </div>
        <div>
          <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">СНИЛС</div>
          <div style="font-size: 16px; font-weight: 500;">${state.user.snils}</div>
        </div>
        <div>
          <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Паспорт</div>
          <div style="font-size: 16px; font-weight: 500;">${state.user.passport || 'Не указан'}</div>
        </div>
        <div>
          <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Регион</div>
          <div style="font-size: 16px; font-weight: 500;">${state.user.region}</div>
        </div>
      </div>
    </div>
  `;
}

// ===========================
// Регистрация
// ===========================
function initWelcome() {
  const startBtn = document.getElementById('welcome-start-btn');
  const loginBtn = document.getElementById('welcome-login-btn');
  
  if (startBtn) startBtn.addEventListener('click', () => showScreen('register'));
  
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      state.user = {
        name: 'Иван',
        surname: 'Иванов',
        patronymic: 'Иванович',
        birthDate: '2010-01-15',
        snils: '123-456-789-00',
        passport: '1234 567890',
        region: 'Сахалинская область',
        institutions: []
      };
      syncUserData();
      showScreen('dashboard');
    });
  }
}

function initRegistration() {
  const step1Btn = document.getElementById('reg-step1-next');
  const step1BackBtn = document.getElementById('reg-step1-back');
  
  if (step1BackBtn) {
    step1BackBtn.addEventListener('click', () => showScreen('welcome'));
  }
  
  if (step1Btn) {
    step1Btn.addEventListener('click', () => {
      const name = document.getElementById('reg-name')?.value;
      const surname = document.getElementById('reg-surname')?.value;
      const patronymic = document.getElementById('reg-patronymic')?.value;
      const birthDate = document.getElementById('reg-birthdate')?.value;
      const snils = document.getElementById('reg-snils')?.value;
      const passport = document.getElementById('reg-passport')?.value;

      if (name && surname && birthDate && snils) {
        state.user.name = name;
        state.user.surname = surname;
        state.user.patronymic = patronymic;
        state.user.birthDate = birthDate;
        state.user.snils = snils;
        state.user.passport = passport;
        syncUserData();
        showScreen('register-institutions');
      } else {
        alert('Заполните все обязательные поля');
      }
    });
  }

  const schoolBtn = document.getElementById('add-school-btn');
  const univBtn = document.getElementById('add-univ-btn');
  const doBtn = document.getElementById('add-do-btn');
  const instBackBtn = document.getElementById('reg-inst-back');
  const instNextBtn = document.getElementById('reg-inst-next');

  if (schoolBtn) schoolBtn.addEventListener('click', () => showScreen('register-school'));
  if (univBtn) univBtn.addEventListener('click', () => showScreen('register-univ'));
  if (doBtn) doBtn.addEventListener('click', () => showScreen('register-do'));
  
  if (instBackBtn) {
    instBackBtn.addEventListener('click', () => showScreen('register'));
  }

  if (instNextBtn) {
    instNextBtn.addEventListener('click', () => {
      if (state.user.institutions.length === 0) {
        alert('Пожалуйста, добавьте хотя бы одно учреждение');
        return;
      }
      syncUserData();
      showScreen('dashboard');
      state.documents.push({
        id: 1,
        name: 'Справка об обучении',
        type: 'study',
        date: new Date().toLocaleDateString('ru-RU'),
        status: 'ready',
        statusText: 'Готово',
        icon: 'fas fa-file-alt',
        school: 'МБОУ «Школа №1»',
        class: '10 «А»'
      });
    });
  }

  document.querySelectorAll('.reg-complete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const screen = e.target.closest('.screen');
      let type = '';
      let name = '';
      
      if (screen.id === 'screen-register-school') {
        type = 'Школа';
        name = screen.querySelector('select')?.value || '';
      } else if (screen.id === 'screen-register-univ') {
        type = 'ВУЗ';
        name = screen.querySelector('select')?.value || '';
      } else if (screen.id === 'screen-register-do') {
        type = 'ДО';
        name = screen.querySelector('select')?.value || '';
      }

      if (name) {
        state.user.institutions.push({ type, name });
        renderInstitutionsList();
      }
      
      showScreen('register-institutions');
    });
  });

  document.querySelectorAll('.reg-back-btn').forEach(btn => {
    btn.addEventListener('click', () => showScreen('register-institutions'));
  });
}

function renderInstitutionsList() {
  const list = document.getElementById('selected-institutions-list');
  if (!list) return;

  if (state.user.institutions.length === 0) {
    list.innerHTML = '';
    return;
  }

  list.innerHTML = `
    <div style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--text-primary);">Добавленные учреждения:</div>
    <div style="display: grid; gap: 8px;">
      ${state.user.institutions.map((inst, idx) => `
        <div style="display: flex; align-items: center; justify-content: space-between; background: var(--bg-secondary); padding: 12px; border-radius: 6px; border-left: 4px solid var(--primary);">
          <div>
            <div style="font-size: 12px; color: var(--text-secondary);">${inst.type}</div>
            <div style="font-size: 14px; font-weight: 500;">${inst.name}</div>
          </div>
          <button onclick="removeInstitution(${idx})" style="background: none; border: none; color: #ef4444; cursor: pointer; font-size: 18px;"><i class="fas fa-times"></i></button>
        </div>
      `).join('')}
    </div>
  `;
}

window.removeInstitution = function(idx) {
  state.user.institutions.splice(idx, 1);
  renderInstitutionsList();
};

// ===========================
// Документы
// ===========================
function renderDocuments() {
  const docList = document.getElementById('doc-list');
  if (!docList) return;

  let filtered = state.documents;
  const filter = state.currentFilter.documents;

  if (filter === 'ready') {
    filtered = state.documents.filter(d => d.status === 'ready');
  } else if (filter === 'sent') {
    filtered = state.documents.filter(d => d.status === 'sent');
  }

  if (filtered.length === 0) {
    docList.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📄</div>
        <div class="empty-title">Нет документов</div>
        <div class="empty-desc">Запросите справку, чтобы начать</div>
      </div>
    `;
    return;
  }

  docList.innerHTML = filtered.map(doc => `
    <div class="doc-item">
      <div class="doc-icon" style="background: var(--primary-light); color: var(--primary);">
        <i class="${doc.icon}"></i>
      </div>
      <div class="doc-info">
        <div class="doc-name">${doc.name}</div>
        <div class="doc-meta">${doc.school} • ${doc.date}</div>
      </div>
      <div class="doc-status" style="color: ${doc.status === 'ready' ? 'var(--secondary)' : 'var(--text-secondary)'};">
        ${doc.statusText}
      </div>
      ${doc.status === 'ready' ? `<button class="btn btn-primary btn-sm" onclick="openSendModal('${doc.id}')">Отправить</button>` : ''}
    </div>
  `).join('');
}

// ===========================
// Расписание
// ===========================
function renderSchedule(day = 'mon') {
  state.currentFilter.schedule = day;
  const scheduleList = document.getElementById('schedule-list');
  if (!scheduleList) return;

  const daySchedule = state.schedule[day] || [];

  if (daySchedule.length === 0) {
    scheduleList.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📅</div>
        <div class="empty-title">Нет занятий</div>
        <div class="empty-desc">В этот день нет расписания</div>
      </div>
    `;
    return;
  }

  scheduleList.innerHTML = daySchedule.map(item => `
    <div class="doc-item">
      <div class="doc-icon" style="background: var(--secondary-light); color: var(--secondary);">
        <i class="${item.icon}"></i>
      </div>
      <div class="doc-info">
        <div class="doc-name">${item.subject}</div>
        <div class="doc-meta">${item.time} • ${item.place}</div>
        <div class="doc-meta" style="color: var(--text-muted);">${item.institution}</div>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('[data-day]').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.day === day) btn.classList.add('active');
  });
}

// ===========================
// Дневник
// ===========================
function renderDiary() {
  const diaryList = document.getElementById('diary-list');
  if (!diaryList) return;

  diaryList.innerHTML = state.diary.map(item => `
    <div class="doc-item">
      <div class="doc-icon" style="background: var(--warning-light); color: var(--warning);">
        <i class="${item.icon}"></i>
      </div>
      <div class="doc-info">
        <div class="doc-name">${item.subject}</div>
        <div class="doc-meta">Оценки: ${item.grades}</div>
        <div class="doc-meta" style="color: var(--text-muted);">Д/З: ${item.homework}</div>
      </div>
    </div>
  `).join('');
}

// ===========================
// Новости
// ===========================
function renderNews() {
  const newsList = document.getElementById('news-list');
  if (!newsList) return;

  let filtered = state.news;
  const filter = state.currentFilter.news;

  if (filter !== 'all') {
    filtered = state.news.filter(n => n.institution === filter);
  }

  if (filtered.length === 0) {
    newsList.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📰</div>
        <div class="empty-title">Нет новостей</div>
        <div class="empty-desc">Новостей по этому фильтру не найдено</div>
      </div>
    `;
    return;
  }

  newsList.innerHTML = filtered.map(news => `
    <div class="doc-item">
      <div class="doc-icon" style="background: var(--primary-light); color: var(--primary);">
        <i class="${news.icon}"></i>
      </div>
      <div class="doc-info">
        <div class="doc-name">${news.title}</div>
        <div class="doc-meta">${news.institution} • ${news.date}</div>
        <div class="doc-meta" style="color: var(--text-muted);">${news.desc}</div>
      </div>
    </div>
  `).join('');
}

// ===========================
// Организации
// ===========================
function renderOrganizations() {
  const orgList = document.getElementById('organizations-list');
  if (!orgList) return;

  let filtered = state.organizations;
  const filter = state.currentFilter.organizations;
  const search = state.searchQuery.toLowerCase();

  if (filter !== 'all') {
    filtered = filtered.filter(o => o.type === filter);
  }

  if (search) {
    filtered = filtered.filter(o => o.name.toLowerCase().includes(search));
  }

  if (filtered.length === 0) {
    orgList.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🏢</div>
        <div class="empty-title">Организаций не найдено</div>
        <div class="empty-desc">Попробуйте изменить фильтр или поисковый запрос</div>
      </div>
    `;
    return;
  }

  orgList.innerHTML = filtered.map(org => `
    <div class="doc-item">
      <div class="doc-icon" style="background: var(--secondary-light); color: var(--secondary);">
        <i class="${org.icon}"></i>
      </div>
      <div class="doc-info">
        <div class="doc-name">${org.name}</div>
        <div class="doc-meta">${org.type}</div>
        <div class="doc-meta" style="color: var(--text-muted);">${org.address}</div>
      </div>
      <button class="btn btn-primary btn-sm" onclick="openOrgModal(${org.id})">Подробнее</button>
    </div>
  `).join('');
}

// ===========================
// ОБУЧЕНИЕ
// ===========================
function renderLearning() {
  const list = document.getElementById('learning-list');
  if (!list) return;

  const subjectFilter = state.currentFilter.learningSubject;
  const typeFilter = state.currentFilter.learningType;

  let filtered = state.learning;

  if (subjectFilter !== 'all') {
    filtered = filtered.filter(t => t.subject === subjectFilter);
  }
  if (typeFilter !== 'all') {
    filtered = filtered.filter(t => t.type === typeFilter);
  }

  if (filtered.length === 0) {
    list.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1;">
        <div class="empty-icon">📚</div>
        <div class="empty-title">Нет заданий</div>
        <div class="empty-desc">По выбранным фильтрам заданий не найдено</div>
      </div>
    `;
    return;
  }

  const statusBadge = {
    new: { text: 'Новое', cls: 'badge-new' },
    done: { text: 'Выполнено', cls: 'badge-done' },
    overdue: { text: 'Просрочено', cls: 'badge-overdue' }
  };

  const typeBadge = {
    hw: { text: 'Д/З', cls: 'badge-hw' },
    test: { text: 'Тест', cls: 'badge-test' },
    lesson: { text: 'Урок', cls: 'badge-lesson' }
  };

  const statusBarColor = {
    new: '#2563EB',
    done: '#10B981',
    overdue: '#EF4444'
  };

  list.innerHTML = filtered.map(task => {
    const sb = statusBadge[task.status];
    const tb = typeBadge[task.type];
    const barColor = statusBarColor[task.status] || '#D1D5DB';

    return `
      <div class="learning-card" onclick="openTaskModal(${task.id})">
        <div class="learning-card-status-bar" style="background: ${barColor};"></div>
        <div class="learning-card-header">
          <div class="learning-card-icon" style="background: ${task.bg}; color: ${task.color};">
            <i class="${task.icon}"></i>
          </div>
          <div class="learning-card-meta">
            <div class="learning-card-subject" style="color: ${task.color};">${task.subjectName}</div>
            <div class="learning-card-title">${task.title}</div>
          </div>
        </div>
        <div class="learning-card-desc">${task.desc}</div>
        <div class="learning-card-footer">
          <div class="learning-card-deadline">
            <i class="fas fa-clock"></i> ${task.deadline}
          </div>
          <div style="display:flex; gap:6px; align-items:center;">
            <span class="learning-badge ${tb.cls}">${tb.text}</span>
            <span class="learning-badge ${sb.cls}">${sb.text}</span>
            ${task.grade ? `<span class="learning-badge badge-done">Оценка: ${task.grade}</span>` : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

window.openTaskModal = function(taskId) {
  const task = state.learning.find(t => t.id === taskId);
  if (!task) return;

  const modal = document.getElementById('task-modal');
  const titleEl = document.getElementById('task-modal-title');
  const bodyEl = document.getElementById('task-modal-body');

  titleEl.textContent = task.title;

  const statusText = { new: 'Новое', done: 'Выполнено', overdue: 'Просрочено' };
  const typeText = { hw: 'Домашнее задание', test: 'Тест', lesson: 'Урок' };

  bodyEl.innerHTML = `
    <div class="task-modal-subject" style="background: ${task.bg}; color: ${task.color};">
      <i class="${task.icon}"></i> ${task.subjectName}
    </div>
    <div class="task-modal-desc">${task.desc}</div>
    <div class="task-modal-meta">
      <div class="task-modal-meta-item">
        <label>Тип задания</label>
        <span>${typeText[task.type]}</span>
      </div>
      <div class="task-modal-meta-item">
        <label>Статус</label>
        <span>${statusText[task.status]}</span>
      </div>
      <div class="task-modal-meta-item">
        <label>Срок сдачи</label>
        <span>${task.deadline}</span>
      </div>
      <div class="task-modal-meta-item">
        <label>Учитель</label>
        <span>${task.teacher}</span>
      </div>
      ${task.grade ? `<div class="task-modal-meta-item"><label>Оценка</label><span style="color:#10B981;font-weight:700;">${task.grade}</span></div>` : ''}
    </div>
    ${task.status !== 'done' ? `
      <div style="display:flex; gap:12px; margin-top:4px;">
        <button class="btn btn-outline" style="flex:1;" onclick="closeModal('task-modal')">Закрыть</button>
        <button class="btn btn-primary" style="flex:1;" onclick="markTaskDone(${task.id})">
          <i class="fas fa-check"></i> Отметить выполненным
        </button>
      </div>
    ` : `
      <button class="btn btn-outline" style="width:100%;" onclick="closeModal('task-modal')">Закрыть</button>
    `}
  `;

  openModal('task-modal');
};

window.markTaskDone = function(taskId) {
  const task = state.learning.find(t => t.id === taskId);
  if (task) {
    task.status = 'done';
    task.grade = Math.floor(Math.random() * 2) + 4; // 4 или 5
    closeModal('task-modal');
    renderLearning();
    showToast('✓ Задание отмечено как выполненное!');
  }
};

// ===========================
// ПУТЬ
// ===========================
function renderPath() {
  renderPathJourney();
  renderPathBranches();
  // Случайный совет при открытии
  currentTipIndex = Math.floor(Math.random() * pathTips.length);
  const tipEl = document.getElementById('path-tip-content');
  if (tipEl) tipEl.textContent = pathTips[currentTipIndex];
}

function renderPathJourney() {
  const container = document.getElementById('path-journey');
  if (!container) return;

  let html = '<div class="path-journey-line"></div>';

  pathJourney.forEach((stop, idx) => {
    html += `
      <div class="path-stop">
        <div class="path-stop-node">
          <div class="path-stop-dot ${stop.dotClass}"></div>
          <div class="path-stop-year">${stop.year}</div>
        </div>
        <div class="path-stop-card ${stop.status === 'current' ? 'current-card' : ''} ${stop.status === 'future' || stop.status === 'next' ? 'future-card' : ''}">
          <div class="path-stop-card-header">
            <div>
              <span class="path-stop-label ${stop.labelClass}">${stop.label}</span>
            </div>
          </div>
          <div class="path-stop-title">${stop.title}</div>
          <div class="path-stop-subtitle">${stop.subtitle}</div>
          ${stop.tips.length > 0 ? `
            <div class="path-stop-tips">
              ${stop.tips.map(tip => `
                <div class="path-stop-tip">
                  <span class="path-stop-tip-icon">${tip.icon}</span>
                  <span>${tip.text}</span>
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${stop.achievements.length > 0 ? `
            <div class="path-stop-achievements">
              ${stop.achievements.map(a => `<span class="path-achievement">${a}</span>`).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    `;

    // Добавляем отступ между точками (кроме последней)
    if (idx < pathJourney.length - 1) {
      html += `<div style="height: 16px; margin-left: 100px;"></div>`;
    }
  });

  container.innerHTML = html;
}

function renderPathBranches() {
  const container = document.getElementById('path-branches');
  if (!container) return;

  container.innerHTML = pathBranches.map(branch => `
    <div class="path-branch-card" style="border-top: 3px solid ${branch.color};">
      <div class="path-branch-icon">${branch.icon}</div>
      <div class="path-branch-title">${branch.title}</div>
      <div class="path-branch-desc">${branch.desc}</div>
      <div>
        ${branch.tags.map(tag => `
          <span class="path-branch-tag" style="background: ${tag.color}; color: ${tag.textColor};">${tag.text}</span>
        `).join('')}
      </div>
    </div>
  `).join('');
}

// ===========================
// Модальные окна
// ===========================
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.style.display = 'flex';
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.style.display = 'none';
}

function openOrgModal(orgId) {
  const org = state.organizations.find(o => o.id === orgId);
  if (!org) return;

  const modal = document.getElementById('org-modal');
  const content = modal.querySelector('.modal-body');
  
  content.innerHTML = `
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="font-size: 48px; margin-bottom: 16px;"><i class="${org.icon}"></i></div>
      <div style="font-size: 18px; font-weight: 600;">${org.name}</div>
      <div style="font-size: 14px; color: var(--text-secondary); margin-top: 8px;">${org.type}</div>
    </div>
    <div style="display: grid; gap: 16px;">
      <div>
        <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Адрес</div>
        <div style="font-size: 14px; font-weight: 500;">${org.address}</div>
      </div>
      <div>
        <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Телефон</div>
        <div style="font-size: 14px; font-weight: 500;"><a href="tel:${org.phone}" style="color: var(--primary); text-decoration: none;">${org.phone}</a></div>
      </div>
      <div>
        <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">Email</div>
        <div style="font-size: 14px; font-weight: 500;"><a href="mailto:${org.email}" style="color: var(--primary); text-decoration: none;">${org.email}</a></div>
      </div>
    </div>
  `;
  
  openModal('org-modal');
}

function openSendModal(docId) {
  openModal('send-modal');
}

// ===========================
// Обработчики событий
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  initWelcome();
  initRegistration();
  syncUserData();

  // Фильтры документов / новостей / организаций
  document.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const filter = e.target.dataset.filter;
      
      if (e.target.closest('.docs-toolbar')) {
        if (state.currentScreen === 'documents') {
          state.currentFilter.documents = filter;
          document.querySelectorAll('#screen-documents [data-filter]').forEach(b => b.classList.remove('active'));
          e.target.classList.add('active');
          renderDocuments();
        } else if (state.currentScreen === 'news') {
          state.currentFilter.news = filter;
          document.querySelectorAll('#screen-news [data-filter]').forEach(b => b.classList.remove('active'));
          e.target.classList.add('active');
          renderNews();
        } else if (state.currentScreen === 'organizations') {
          state.currentFilter.organizations = filter;
          document.querySelectorAll('#screen-organizations [data-filter]').forEach(b => b.classList.remove('active'));
          e.target.classList.add('active');
          renderOrganizations();
        }
      }
    });
  });

  // Фильтры обучения — предметы
  document.querySelectorAll('[data-subject]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const subject = e.target.dataset.subject;
      state.currentFilter.learningSubject = subject;
      document.querySelectorAll('[data-subject]').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderLearning();
    });
  });

  // Фильтры обучения — тип задания
  document.querySelectorAll('[data-task-type]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const type = e.target.dataset.taskType;
      state.currentFilter.learningType = type;
      document.querySelectorAll('[data-task-type]').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderLearning();
    });
  });

  // Фильтры расписания (дни недели)
  document.querySelectorAll('[data-day]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const day = e.target.dataset.day;
      renderSchedule(day);
    });
  });

  // Поиск организаций
  const searchInput = document.querySelector('input[placeholder*="Поиск"]');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderOrganizations();
    });
  }

  // Клик на профиль
  document.querySelectorAll('.header-user').forEach(el => {
    el.addEventListener('click', () => showScreen('profile'));
  });

  // Навигация по кнопкам
  document.querySelectorAll('[data-screen]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const screen = e.target.closest('[data-screen]')?.dataset.screen;
      if (screen) showScreen(screen);
    });
  });

  // Закрытие модалей
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modal = e.target.closest('.modal');
      if (modal) modal.style.display = 'none';
    });
  });

  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
  });

  // Форма запроса документа
  const requestForm = document.getElementById('request-form');
  if (requestForm) {
    requestForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal('request-modal');
      openModal('status-modal');
      
      setTimeout(() => {
        closeModal('status-modal');
        state.documents.push({
          id: state.documents.length + 1,
          name: 'Справка об обучении',
          type: 'study',
          date: new Date().toLocaleDateString('ru-RU'),
          status: 'ready',
          statusText: 'Готово',
          icon: 'fas fa-file-alt',
          school: 'МБОУ «Школа №1»',
          class: '10 «А»'
        });
        renderDocuments();
        showToast('✓ Справка успешно сформирована!');
      }, 2000);
    });
  }

  // Форма отправки документа
  const sendForm = document.getElementById('send-form');
  if (sendForm) {
    sendForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal('send-modal');
      showToast('✓ Документ успешно отправлен!');
      if (state.documents.length > 0) {
        state.documents[0].status = 'sent';
        state.documents[0].statusText = 'Отправлено';
        renderDocuments();
      }
    });
  }

  // Кнопка запроса документа
  const requestDocBtn = document.getElementById('request-doc-btn');
  if (requestDocBtn) {
    requestDocBtn.addEventListener('click', () => openModal('request-modal'));
  }
});

// ===========================
// Уведомления
// ===========================
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast show';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
}
