"use client";

import { Image } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

import { useLeadCaptureModal } from "@/components/LeadCaptureModal";

export default function CourseView() {
  const { openModal, Modal } = useLeadCaptureModal();

  return (
    <div>
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-yellow-50 dark:from-blue-800 dark:to-yellow-600 pt-16 pb-20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-warning text-foreground dark:text-slate-900 rounded-full text-sm font-medium">
                Філософсько-практичний курс
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="gradient-text">Шлях самопізнання</span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-slate-50 font-alegreya">
              П&apos;ять модулів для тих, хто готовий зустрітися з собою
              справжнім
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <a
                href="#packages"
                className="bg-warning hover:bg-yellow-400 text-foreground dark:text-slate-900 px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105 shadow-lg min-w-[250px]"
              >
                Почати курс
              </a>
              <a
                href="#details"
                className="border-2 border-primary dark:border-yellow-400 text-primary dark:text-yellow-400 hover:bg-primary dark:hover:bg-slate-600 hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all"
              >
                Дізнатися більше
              </a>
            </div>

            <div className="text-sm text-gray-500 dark:text-slate-50 space-y-1">
              <p>
                📚 5 модулів • 🎯 Практичні завдання • 📝 Щоденникові практики
              </p>
              <p>
                👤 Автор: <strong>Ігор Кузьменко</strong>, ведучий подкасту
                &ldquo;Душніла&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary opacity-10 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-warning opacity-10 rounded-full"></div>
        <div className="absolute bottom-10 right-15 w-24 h-24 bg-warning opacity-10 rounded-full"></div>
        <div className="absolute bottom-10 right-5 w-24 h-24 bg-warning opacity-10 rounded-full"></div>
        <div className="absolute top-10 left-5 w-7 h-7 bg-primary opacity-10 rounded-full"></div>
      </header>

      {/* Для кого цей курс */}
      <section className="py-16 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Цей курс для вас, якщо ви:
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Відчуваєте, що живете &ldquo;не своє&rdquo; життя
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Як Марія з притчі — успішна ззовні, але порожня всередині
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Шукаєте глибші відповіді на життєві питання
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Готові до серйозної роботи з собою через філософію та
                      психологію
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Готові до ведення щоденника та рефлексії
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Розумієте, що зміни потребують часу та постійної роботи
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-bold">✗</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Шукаєте швидких рішень
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Курс вимагає глибокої роботи та не обіцяє миттєвих
                      результатів
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-bold">✗</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Не готові до самоаналізу
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Курс передбачає чесний погляд на себе та свої переконання
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-bold">✗</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Хочете тільки мотивацію
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Це не мотиваційний курс, а глибинна робота з особистістю
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Мапа модулів */}
      <section
        id="details"
        className="py-20 mountain-path relative overflow-hidden bg-gradient-to-tr from-blue-50 to-yellow-50 dark:from-slate-800 dark:to-yellow-500"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ваш шлях на вершину
            </h2>
            <p className="text-xl text-slate-500 dark:text-slate-50 max-w-2xl mx-auto">
              П&apos;ять етапів сходження до справжнього себе
            </p>
          </div>

          {/* Desktop версія - горизонтально */}
          <div className="hidden lg:block">
            <div className="relative max-w-6xl mx-auto">
              {/* Path line */}
              <svg
                className="absolute inset-0 w-full h-full"
                style={{ height: 400 }}
              >
                <path
                  d="M 50 350 Q 200 250 350 200 Q 500 150 650 100 Q 800 50 950 50"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="3"
                  fill="none"
                  className="path-line"
                />
              </svg>

              {/* Modules */}
              <div
                className="relative grid grid-cols-5 gap-4"
                style={{ height: 450 }}
              >
                {/* Модуль 1 */}
                <ModuleCard
                  number={1}
                  title="Початок шляху"
                  description="Тригери самопізнання. Принципи: сміливість, відвертість, зацікавленість"
                />
                <ModuleCard
                  number={2}
                  style={{ marginBottom: 50 }}
                  title="Сумнів та норма"
                  description="Внутрішній критик. Соціальні норми та їх вплив на автентичність"
                />
                <ModuleCard
                  number={3}
                  style={{ marginBottom: 120 }}
                  title="Бажання та призначення"
                  description='Розрізнення справжніх прагнень від нав&apos;язаних. Пошук "сродної праці"'
                />
                <ModuleCard
                  number={4}
                  style={{ marginBottom: 200 }}
                  title="Світогляд та зміна"
                  description="Робота з переконаннями. Стрибок у невідоме. Що таке зміна?"
                />
                <ModuleCard
                  number={5}
                  style={{ marginBottom: 220 }}
                  title="Інтеграція та спіраль"
                  description="Спіраль самопізнання. Пошук часу для себе. Безкінечний шлях"
                />
              </div>
            </div>
          </div>

          {/* Mobile версія - вертикально */}
          <div className="lg:hidden">
            <div className="max-w-md mx-auto space-y-8">
              <ModuleCard
                number={1}
                title="Початок шляху"
                description="Тригери самопізнання. Принципи: сміливість, відвертість, зацікавленість"
              />
              <div className="flex justify-center">
                <div className="w-px h-8 bg-white/50"></div>
              </div>
              <ModuleCard
                number={2}
                title="Сумнів та норма"
                description="Внутрішній критик. Соціальні норми та їх вплив на автентичність"
              />
              <div className="flex justify-center">
                <div className="w-px h-8 bg-white/50"></div>
              </div>
              <ModuleCard
                number={3}
                title="Бажання та призначення"
                description='Розрізнення справжніх прагнень від нав&apos;язаних. Пошук "сродної праці"'
              />
              <div className="flex justify-center">
                <div className="w-px h-8 bg-white/50"></div>
              </div>
              <ModuleCard
                number={4}
                title="Світогляд та зміна"
                description="Робота з переконаннями. Стрибок у невідоме. Що таке зміна?"
              />
              <div className="flex justify-center">
                <div className="w-px h-8 bg-white/50"></div>
              </div>
              <ModuleCard
                number={5}
                title="Інтеграція та спіраль"
                description="Спіраль самопізнання. Пошук часу для себе. Безкінечний шлях"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Що включено в курс */}
      <section className="py-16 bg-gray-50 dark:bg-gray-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Що включено в курс
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <IncludedCard
                emoji="📚"
                title="Відеолекції"
                description="5 модулів з детальним розбором теорії та практичних вправ"
              />

              <IncludedCard
                emoji="📖"
                title="Конспекти"
                description="Структуровані матеріали з ключовими поняттями та джерелами"
              />

              <IncludedCard
                emoji="📝"
                title="Практичні завдання"
                description="Щоденникові практики та вправи для глибокої рефлексії"
              />

              <IncludedCard
                alt
                emoji="🎭"
                title="Притча"
                description="Історія Марії як метафора вашого власного шляху"
              />

              <IncludedCard
                alt
                emoji="🧠"
                title="Філософські концепції"
                description="Від Платона до сучасної психології в доступному викладі"
              />

              <IncludedCard
                alt
                emoji="🔄"
                title="Спіраль самопізнання"
                description="Методологія безкінечного саморозвитку"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Відгуки учасників */}
      <section className="py-16 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Відгуки учасників
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeedbackItem name="Олександр" gender="m">
                Матеріал дуже якісний і продуманий. Мені особисто потрібно
                рухатись повільніше. Коли занадто багато рефлексії одразу — це
                може зіграти проти.
              </FeedbackItem>

              <FeedbackItem name="Аня" gender="f">
                ...мені цікаво, матеріали хороші, завдання зрозумілі та
                актуальні. Можливо давати трошки більше часу на опрацювання
                кожної лекції.
              </FeedbackItem>

              <FeedbackItem name="Роман" gender="m">
                Для себе зрозумів, що ці лекції хороший буст для іншого погляду
                на деякі очевидні речі та перезавантаження себе. Однозначно дає
                результат.
              </FeedbackItem>
            </div>

            <div className="text-center mt-16">
              <div className="bg-yellow-50 dark:bg-warning-700 border border-yellow-200 rounded-xl p-6 max-w-3xl mx-auto">
                <h3 className="font-bold text-lg mb-2 dark:text-slate-700">
                  ❗Важливо знати❗
                </h3>
                <p className="text-gray-700">
                  Цей курс не для швидких результатів. Учасники відзначають
                  потребу в повільному опрацюванні матеріалів та регулярній
                  рефлексії. Найкращі результати отримують ті, хто готовий
                  інвестувати час у глибоку роботу з собою.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Пакети та ціни */}
      <section
        id="packages"
        className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-800"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">
              Оберіть свій шлях
            </h2>
            <p className="text-center text-gray-600 dark:text-slate-200 mb-12 max-w-2xl mx-auto">
              Різні формати навчання для різних потреб. Від самостійного
              проходження до індивідуального&nbsp;супроводу.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Базовий пакет */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-2">Базовий</h3>
                <p className="text-gray-600 mb-6">
                  Для самостійного проходження
                </p>

                <div className="mb-6">
                  <span className="text-4xl font-bold">1500</span>
                  <span className="text-gray-600"> грн</span>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Відеолекції (5 модулів)
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Конспекти та матеріали
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Практичні завдання
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Пожиттєвий доступ
                  </li>
                </ul>

                <button
                  onClick={() => openModal("basic")}
                  className="w-full bg-gray-800 text-white py-3 rounded-full font-semibold hover:bg-gray-700 transition-colors"
                >
                  Обрати базовий
                </button>
              </div>

              {/* Стандартний пакет */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-lg border-2 border-warning relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-warning text-foreground dark:text-slate-900 px-4 py-1 rounded-full text-sm font-semibold">
                    Популярний
                  </span>
                </div>

                <h3 className="text-2xl font-bold mb-2">Стандарт</h3>
                <p className="text-gray-600 mb-6">З груповою підтримкою</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold">3000</span>
                  <span className="text-gray-600"> грн</span>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Все з базового пакету
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Телеграм-група учасників
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>2 групові
                    зустрічі
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Підтримка в чаті
                  </li>
                </ul>

                <button
                  onClick={() => openModal("standard")}
                  className="w-full bg-warning text-foreground dark:text-slate-900  py-3 rounded-full font-semibold hover:bg-yellow-400 transition-colors"
                >
                  Приєднатися до групи
                </button>

                <p className="text-center text-sm text-gray-500 dark:text-gray-50 mt-3">
                  * Чекаємо наповнення групи
                </p>
              </div>

              {/* Індивідуальний пакет */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-2">Індивідуальний</h3>
                <p className="text-gray-600 mb-6">Особистий супровід</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold">7500</span>
                  <span className="text-gray-600"> грн</span>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Все з базового пакету
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Індивідуальний темп
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>5 особистих
                    зустрічей
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Персональний супровід
                  </li>
                </ul>

                <button
                  onClick={() => openModal("individual")}
                  className="w-full bg-primary text-white py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors"
                >
                  Обрати індивідуальний
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Про автора */}
      <section className="py-16 bg-white dark:bg-blue-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-shrink-0">
                <Image
                  src="https://avatars.githubusercontent.com/u/1727140?v=4"
                  alt="Ігор Кузьменко"
                  className="w-40 h-40 rounded-full object-cover shadow-lg"
                />
              </div>

              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4">Про автора курсу</h2>
                <h3 className="text-xl font-semibold mb-4 text-primary dark:text-blue-200">
                  Ігор Кузьменко
                </h3>

                <div className="space-y-4 text-gray-700 dark:text-white">
                  <p>
                    Ведучий подкасту &quot;Душніла&quot;, який налічує майже
                    сотню випусків про філософію, психологію та самоаналіз.
                    Студент філософської школи, програміст з 16-річним досвідом.
                  </p>

                  <p>
                    Пройшов власний шлях від панічних атак та екзистенційної
                    кризи до глибокого занурення в стоїцизм та філософську
                    практику. Поєднує академічні знання з особистим досвідом
                    трансформації.
                  </p>

                  <p className="font-semibold">
                    &quot;Людина, яка питає, — це людина, яка живе. Запрошую вас
                    приєднатися до цієї подорожі!&quot;
                  </p>
                </div>

                <div className="mt-6 flex gap-4">
                  <Link
                    href="/episodes"
                    className="text-primary hover:underline dark:text-white"
                  >
                    🎧 Слухати подкаст
                  </Link>
                  <a
                    href="/about"
                    className="text-primary hover:underline dark:text-white"
                  >
                    👤 Детальніше про автора
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Часті питання
            </h2>

            <div className="space-y-6">
              <FaqItem title="Скільки часу потрібно на проходження курсу?">
                Рекомендую проходити не більше одного модулю на тиждень, але
                темп можна адаптувати під себе. Важливо не поспішати — глибока
                рефлексія потребує часу, тому для комфортного проходження в
                групі було обрано графік раз на два тижні (сумарно 10 тижнів на
                5 модулів).
              </FaqItem>

              <FaqItem title="Чи потрібна філософська освіта?">
                Ні, курс розроблений для всіх. Філософські концепції подаються
                доступно, з поясненнями та практичними прикладами.
              </FaqItem>

              <FaqItem title="Що робити, якщо важко з мотивацією?">
                Мотивація до самопізнання може виникати тільки зсередини. Якщо
                її немає зараз — можливо, варто почекати підходящого моменту.
                Якщо вона зникне в процесі — пишіть, спробуємо її відшукати.
              </FaqItem>

              <FaqItem title="Чому набір групи всього два рази на рік?">
                Моя мета — створити систему, що може допомагати іншим людям
                знаходити себе. Щоб ця система була ефективною, її потрібно
                вдосконалювати, а на це йде доволі багато часу і сил, як і на
                групове проходження. <br />
                <br />
                <b>(Важливо)</b> Індивідуальний пакет доступний завжди з
                найбільш актуальною версією курсу.
              </FaqItem>

              <FaqItem title="Чи можна проходити курс повторно?">
                Так, курс розроблений як спіраль — кожне повторне проходження
                може відкрити нові глибини. Доступ до матеріалів пожиттєвий.
              </FaqItem>

              <FaqItem title="Чи є гарантія повернення коштів?">
                Так, якщо після першого модуля ви відчуваєте, що вам курс не
                підходить — зроблю повернення без зайвих питань. Кошти не
                повертаються у пакеті &quot;Базовий&quot;, бо ви отримуєте
                доступ до всіх матеріалів одразу.
              </FaqItem>
            </div>
          </div>
        </div>
      </section>

      {/* Заклик до дії */}
      <section className="py-20 bg-gradient-to-br from-primary to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Готові розпочати свій шлях?
            </h2>

            <p className="text-xl mb-8 opacity-90">
              Як Марія з притчі, ви стоїте на початку своєї гори. Перший крок —
              найважливіший.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => openModal("standard")}
                className="bg-warning text-foreground dark:text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition-all hover:scale-105"
              >
                Почати курс зараз
              </button>
              <a
                href="mailto:hello@dushni.la"
                className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-full font-semibold text-lg transition-all"
              >
                Поставити питання
              </a>
            </div>

            <p className="text-sm mt-6 opacity-75">
              💝 Гарантія повернення коштів
            </p>
          </div>
        </div>
      </section>

      <Modal />
    </div>
  );
}

const FaqItem: React.FC<React.PropsWithChildren & { title: string }> = ({
  title,
  children,
}) => (
  <div className="bg-white dark:bg-slate-700 rounded-xl p-6">
    <h3 className="font-bold text-lg mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-slate-200">{children}</p>
  </div>
);

const FeedbackItem: React.FC<
  React.PropsWithChildren & { name: string; gender: "f" | "m" }
> = ({ name, gender, children }) => (
  <div className="bg-gray-50 dark:bg-primary rounded-xl p-6">
    <p className="text-gray-600 dark:text-gray-50 mb-4">
      ❝&nbsp;{children}&nbsp;❞
    </p>
    <div className="flex items-center">
      <div className="w-10 h-10 bg-primary dark:bg-yellow-400 rounded-full flex items-center justify-center mr-3">
        <span className="text-white dark:text-slate-900 font-bold">
          {name[0].toUpperCase()}
        </span>
      </div>
      <div>
        <p className="font-semibold dark:text-gray-50">{name}</p>
        <p className="text-sm text-gray-500 dark:text-slate-200">
          Учасни{gender === "f" ? "ця" : "к"} курсу
        </p>
      </div>
    </div>
  </div>
);

const ModuleCard: React.FC<
  React.PropsWithChildren & {
    style?: React.CSSProperties;
    number: number;
    title: string;
    description: string;
  }
> = ({ style, number, title, description }) => (
  <div className="flex flex-col justify-end items-center" style={style}>
    <div className="module-card bg-white/90 dark:bg-slate-800 rounded-xl p-6 text-center mb-4 max-w-xs">
      <div className="w-12 h-12 bg-warning rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="font-bold text-foreground dark:text-slate-900">
          {number}
        </span>
      </div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-slate-200">{description}</p>
    </div>
  </div>
);

const IncludedCard: React.FC<{
  emoji: string;
  title: string;
  description: string;
  alt?: boolean;
}> = ({ emoji, title, description, alt }) => (
  <div className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center shadow-sm">
    <div
      className={`w-16 h-16 bg-${alt ? "warning/20" : "primary/20"} rounded-full flex items-center justify-center mx-auto mb-4`}
    >
      <span className="text-3xl">{emoji}</span>
    </div>
    <h3 className="font-bold text-lg mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-slate-200">{description}</p>
  </div>
);
