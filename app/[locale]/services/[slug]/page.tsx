import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { routing } from '@/routing';

type Slug = 'auto' | 'air' | 'sea' | 'rail' | 'cust' | 'wh';
const SLUGS: Slug[] = ['auto', 'air', 'sea', 'rail', 'cust', 'wh'];

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    SLUGS.map((slug) => ({ locale, slug }))
  );
}

interface Section {
  heading?: string;
  text?: string;
  bullets?: string[];
  numbered?: string[];
  note?: string;
}

interface SlugContent {
  intro: string;
  sections: Section[];
  closing?: string;
}

const CONTENT: Partial<Record<string, Partial<Record<Slug, SlugContent>>>> = {
  uk: {
    auto: {
      intro: 'У сучасному світі успіх компанії безпосередньо залежить від швидкості та точності поставок. Команда Corcel — це ваш стратегічний партнер у сфері транспортної логістики, що забезпечує безперебійну доставку вантажів будь-якої складності. Ми не просто перевозимо товари — ми вибудовуємо оптимальні ланцюжки постачання, які заощаджують ваші ресурси.',
      sections: [
        {
          heading: 'Чому обирають Corcel?',
          text: 'Ми розуміємо, що кожен бізнес унікальний, тому пропонуємо гнучкі рішення для найрізноманітніших завдань. Наш досвід і технічні можливості дозволяють працювати з усіма ключовими сегментами вантажних перевезень:',
          bullets: [
            'FTL (Full Truck Load) — для тих, кому важлива максимальна швидкість і повне завантаження транспорту. Весь обʼєм автомобіля виділяється виключно під ваше замовлення, що гарантує найкоротші строки доставки «від дверей до дверей».',
            'LTL (Less than Truck Load) — оптимальне рішення для малого та середнього бізнесу. Перевезення збірних вантажів дозволяє платити лише за те місце, яке займає ваш товар, суттєво знижуючи логістичні витрати.',
            'Рефрижераторні перевезення — суворий температурний контроль на всьому шляху слідування. Ідеально для продуктів харчування, косметики, фармацевтики та інших товарів, що потребують особливого режиму зберігання.',
            'ADR (Небезпечні вантажі) — Corcel має всі необхідні ліцензії та спеціально обладнаний транспорт для перевезення небезпечних речовин з дотриманням міжнародних протоколів безпеки.',
          ],
        },
        {
          heading: 'Наші переваги — ваші можливості:',
          numbered: [
            'Географія без кордонів — ми здійснюємо міжнародні та внутрішні перевезення, знаходячи оптимальні маршрути навіть в умовах підвищеної складності.',
            'Прозорість і контроль — ви завжди знаєте, де знаходиться ваш вантаж. Ми використовуємо сучасні системи GPS-моніторингу та надаємо регулярну звітність.',
            'Комплексний підхід — від оформлення супровідної документації до страхування: ми беремо всі клопоти на себе, дозволяючи вам зосередитися на розвитку вашого продукту.',
            'Власний автопарк — використання надійної техніки, що відповідає екологічним стандартам, мінімізує ризики поломок і затримок.',
          ],
        },
      ],
      closing: 'Corcel — доставляємо довіру в кожній милі.',
    },
    air: {
      intro: 'Коли час стає вирішальним чинником, авіаційна логістика від Corcel — це ваш найкоротший шлях до глобальних ринків. Ми забезпечуємо доставку вантажів у будь-яку точку світу, де є авіасполучення, гарантуючи максимальну оперативність і збереження вашого товару.',
      sections: [
        {
          heading: 'Глобальне охоплення та бездоганний сервіс',
          text: 'Corcel пропонує повний комплекс послуг з організації авіадоставки:',
          bullets: [
            'Весь світ — ми працюємо з найбільшими міжнародними аеропортами та перевіреними авіалініями, забезпечуючи імпорт та експорт товарів за всіма популярними та нестандартними напрямками.',
            'Термінові та цінні вантажі — авіадоставка ідеальна для електроніки, медичних препаратів, модних колекцій і високотехнологічного обладнання, де критично важлива швидкість.',
            'Повний супровід — ми беремо на себе бронювання вантажних місць, складську обробку, страхування та оформлення всіх необхідних авіанакладних.',
          ],
        },
        {
          heading: 'Розумна доставка в Україну: комбінований метод',
          text: 'Ми розуміємо, наскільки важливо сьогодні підтримувати стабільний потік товарів в Україну. Для цього Corcel використовує відпрацьовану схему мультимодальних перевезень: авіа до сусідніх хабів (Варшава, Франкфурт, Відень) + автодоставка в Україну. Така схема дозволяє обходити обмеження та суттєво скорочувати строки доставки.',
        },
        {
          heading: 'Особливі категорії вантажів',
          bullets: [
            'Фармацевтика та медичне обладнання (GDP-стандарти)',
            'Електроніка та напівпровідники (антистатичне пакування)',
            'Вибухонебезпечні та обмежені до перевезення речовини (з повним оформленням IATA DGR)',
            'Цінні вантажі та твори мистецтва (спецохорона та страхування)',
          ],
        },
      ],
      closing: 'Corcel — ваш глобальний логістичний партнер у небі.',
    },
    sea: {
      intro: 'Морські перевезення — найекономічніший спосіб транспортування великих обсягів вантажів на далекі відстані. Corcel організовує повний цикл морської логістики: від бронювання контейнера до доставки вантажу на ваш склад. Ми співпрацюємо з провідними судноплавними лініями та забезпечуємо конкурентні ставки фрахту за всіма ключовими напрямками — Чорне море, Середземномор\'я, Азія, Америка.',
      sections: [
        {
          heading: 'FCL або LCL — вибір за вами',
          text: 'Залежно від обсягу вантажу Corcel пропонує два варіанти контейнерних перевезень:',
          bullets: [
            'FCL (Full Container Load) — повний контейнер виключно під ваш вантаж. Ідеальне рішення для великих відправлень: максимальна безпека, мінімальна вартість за одиницю обсягу. Типи контейнерів: 20\', 40\', 40\'HC, рефрижераторні, open-top.',
            'LCL (Less than Container Load) — збірний контейнер для невеликих вантажів. Ви платите лише за фактично займаний обсяг, що робить цей варіант оптимальним для регулярних невеликих поставок.',
            'RO-RO (Roll-on/Roll-off) — спеціалізований сервіс для транспортних засобів, спецтехніки та колісного обладнання.',
          ],
        },
        {
          heading: 'Наші морські маршрути',
          text: 'Corcel забезпечує регулярні відправлення за такими напрямками:',
          bullets: [
            'Чорне море — Середземномор\'я: Одеса / Чорноморськ → Стамбул, Пірей (Афіни), Барселона, Генуя',
            'Азійський напрямок: Шанхай, Гуанчжоу, Нінбо → Гамбург, Роттердам → Україна (через польські або румунські порти)',
            'Трансатлантика: Нью-Йорк, Майамі, Х\'юстон → Роттердам / Гамбург → Україна',
          ],
        },
        {
          heading: 'Додаткові послуги',
          bullets: [
            'Букінг і відстеження контейнера в режимі реального часу',
            'Портове оброблення та навантажувально-розвантажувальні роботи (THC)',
            'Оформлення коносамента (B/L) та всієї портової документації',
            'Страхування вантажу на весь маршрут за умовами Гаага-Вісбі',
            'Митне оформлення в порту призначення',
          ],
        },
      ],
      closing: 'Corcel — ваш надійний міст між морями та континентами.',
    },
    rail: {
      intro: 'Залізничні перевезення — оптимальний вибір для транспортування великих обсягів вантажів на середні та далекі відстані за доступною вартістю. Corcel організовує відправлення контейнерними поїздами та вагонними лотами за маршрутами Україна — ЄС — Китай, забезпечуючи повний документальний супровід і митне оформлення на кордоні.',
      sections: [
        {
          heading: 'Залізничні рішення Corcel',
          text: 'Ми пропонуємо гнучкі формати залізничних перевезень для різних потреб:',
          bullets: [
            'Контейнерні поїзди — відправлення у 20\' та 40\'HC контейнерах за розкладом між Україною, Польщею та Китаєм. Строки доставки значно менші за морські та у 2–3 рази дешевші за авіа.',
            'Платформні відправлення — перевезення великогабаритного обладнання, спецтехніки та автомобілів на залізничних платформах.',
            'Вагонні та повагонні лоти (CWL) — для насипних, наливних та пакетованих вантажів великого тоннажу.',
          ],
        },
        {
          heading: 'Мультимодальні схеми',
          text: 'Залізниця — часто лише частина маршруту. Corcel поєднує залізничне відправлення з автодоставкою, забезпечуючи сервіс «від дверей до дверей»:',
          bullets: [
            'Авто + залізниця: збір вантажу по Україні → завантаження в поїзд → автодоставка у місті призначення в ЄС',
            'Залізниця + море: для вантажів на транзитних маршрутах через кілька країн',
            'Транзит через Польщу, Білорусь та Казахстан у напрямку Китаю (Новий шовковий шлях)',
          ],
        },
        {
          heading: 'Переваги залізничної логістики',
          numbered: [
            'Стабільний розклад — відправлення за фіксованими датами, що дозволяє планувати поставки наперед.',
            'Висока вантажопідйомність — один поїзд замінює десятки фур.',
            'Нижча залежність від погодних умов порівняно з морем та авіа.',
            'Екологічність — залізниця залишає значно менший вуглецевий слід.',
          ],
        },
      ],
      closing: 'Corcel — залізнична точність у кожному маршруті.',
    },
    cust: {
      intro: 'Митне оформлення — один із найскладніших та найвідповідальніших етапів міжнародної логістики. Помилка в документах може коштувати вашому бізнесу часу та значних грошових втрат. Команда митних брокерів Corcel з багаторічним досвідом бере цю задачу під свій повний контроль — від класифікації товарів до отримання дозвільних документів.',
      sections: [
        {
          heading: 'Брокерські послуги повного циклу',
          text: 'Corcel виконує всі митні процедури в Україні, Польщі та Іспанії:',
          bullets: [
            'Декларування імпорту — підготовка та подача ВМД, розрахунок митних платежів, оплата мита і ПДВ.',
            'Декларування експорту — оформлення вантажів на вивезення з України з поверненням ПДВ.',
            'Класифікація товарів за УКТЗЕД / HS Code — правильний код товару критично впливає на розмір мита.',
            'Транзитне оформлення — для вантажів, що проходять через кілька митних зон.',
          ],
        },
        {
          heading: 'Дозвільні документи та ліцензії',
          text: 'Окремі категорії товарів потребують спеціальних дозволів:',
          bullets: [
            'Санітарно-епідеміологічні висновки та фітосанітарні сертифікати для продуктів харчування',
            'Ліцензії Мінекономіки для товарів подвійного використання',
            'Сертифікати відповідності та технічні регламенти для промислового обладнання',
            'Дозволи ДАЗВ для радіоелектронних засобів',
          ],
        },
        {
          heading: 'Чому варто обирати митних брокерів Corcel',
          numbered: [
            'Власні представництва в Україні, Польщі та Іспанії — митне оформлення в режимі реального часу без посередників.',
            'Електронне декларування — подача митних декларацій у системі АСМТ 24/7.',
            'Повне юридичне супроводження — захист ваших інтересів при перевірках ДМС.',
            'Консультації з митного законодавства — актуальні роз\'яснення щодо змін у законодавстві ЄС та України.',
          ],
        },
      ],
      closing: 'Corcel — митна чіткість для вашого спокою.',
    },
    wh: {
      intro: 'Сучасний склад — це не просто місце зберігання товару. Це центр управління вашою ланцюжком поставок. Corcel надає складські послуги класу A та B в Україні та Польщі, забезпечуючи повний спектр операцій: від приймання вантажу до відправлення кінцевому покупцю.',
      sections: [
        {
          heading: 'Повний комплекс складських послуг',
          bullets: [
            'Відповідальне зберігання з онлайн-інвентаризацією через WMS-систему в режимі 24/7.',
            'Приймання, сортування та маркування товарів за специфікацією замовника.',
            'Крос-докінг — перевантаження між транспортними засобами без довгострокового зберігання.',
            'Консолідація збірних вантажів та підготовка до відправлення у будь-якому напрямку.',
          ],
        },
        {
          heading: 'Фулфілмент для e-commerce',
          text: 'Corcel пропонує повний аутсорсинг складської логістики для інтернет-магазинів та маркетплейсів:',
          bullets: [
            'Інтеграція з Rozetka, Prom, Amazon, Shopify та іншими платформами',
            'Збирання та пакування замовлень за стандартами якості',
            'Автоматична генерація накладних та ярликів для кур\'єрських служб',
            'Обробка повернень та обмінів товарів',
          ],
        },
        {
          heading: 'Спеціалізовані зони зберігання',
          bullets: [
            'Температурні зони (+2/+8°C та +15/+25°C) для продуктів харчування та фармацевтики',
            'Зони для небезпечних вантажів ADR з посиленою системою пожежогасіння',
            'Охороняємі комірки для цінних товарів і товарів з обмеженим доступом',
            'Зони для великогабаритних виробів та промислового обладнання',
          ],
        },
      ],
      closing: 'Corcel — ваш склад під ключ, де порядок — це наш стандарт.',
    },
  },
  ru: {
    auto: {
      intro: 'В современном мире успех компании напрямую зависит от скорости и точности поставок. Команда Corcel — это ваш стратегический партнер в сфере транспортной логистики, обеспечивающий бесперебойную доставку грузов любой сложности. Мы не просто перевозим товары — мы выстраиваем оптимальные цепочки поставок, которые экономят ваши ресурсы.',
      sections: [
        {
          heading: 'Почему выбирают Corcel?',
          text: 'Мы понимаем, что каждый бизнес уникален, поэтому предлагаем гибкие решения для самых разных задач. Наш опыт и технические возможности позволяют работать со всеми ключевыми сегментами грузоперевозок:',
          bullets: [
            'FTL (Full Truck Load) — для тех, кому важна максимальная скорость и полная загрузка транспорта. Весь объём автомобиля выделяется исключительно под ваш заказ, что гарантирует кратчайшие сроки доставки «от двери до двери».',
            'LTL (Less than Truck Load) — оптимальное решение для малого и среднего бизнеса. Перевозка сборных грузов позволяет платить только за то место, которое занимает ваш товар, значительно снижая логистические издержки.',
            'Рефрижераторные перевозки — строгий температурный контроль на всём пути следования. Идеально для продуктов питания, косметики, фармацевтики и других товаров, требующих особого режима хранения.',
            'ADR (Опасные грузы) — Corcel имеет все необходимые лицензии и специально оборудованный транспорт для перевозки опасных веществ с соблюдением международных протоколов безопасности.',
          ],
        },
        {
          heading: 'Наши преимущества — ваши возможности:',
          numbered: [
            'География без границ — мы осуществляем международные и внутренние перевозки, находя оптимальные маршруты даже в условиях высокой сложности.',
            'Прозрачность и контроль — вы всегда знаете, где находится ваш груз. Мы используем современные системы GPS-мониторинга и предоставляем регулярную отчётность.',
            'Комплексный подход — от оформления сопроводительной документации до страхования: мы берём все хлопоты на себя, позволяя вам сосредоточиться на развитии вашего продукта.',
            'Собственный автопарк — использование надёжной техники, соответствующей экологическим стандартам, минимизирует риски поломок и задержек.',
          ],
        },
      ],
      closing: 'Corcel — доставляем доверие в каждой миле.',
    },
    air: {
      intro: 'Когда время становится решающим фактором, авиационная логистика от Corcel — это ваш кратчайший путь к глобальным рынкам. Мы обеспечиваем доставку грузов в любую точку мира, где есть авиасообщение, гарантируя максимальную оперативность и сохранность вашего товара.',
      sections: [
        {
          heading: 'Глобальный охват и безупречный сервис',
          text: 'Corcel предлагает полный комплекс услуг по организации авиадоставки:',
          bullets: [
            'Весь мир — мы работаем с крупнейшими международными аэропортами и проверенными авиалиниями, обеспечивая импорт и экспорт товаров по всем популярным и редким направлениям.',
            'Срочные и ценные грузы — авиадоставка идеальна для электроники, медицинских препаратов, модных коллекций и высокотехнологичного оборудования, где критически важна скорость.',
            'Полное сопровождение — мы берём на себя бронирование грузовых ёмкостей, складскую обработку, страхование и оформление всех необходимых авианакладных.',
          ],
        },
        {
          heading: 'Умная доставка в Украину: комбинированный метод',
          text: 'Corcel использует отработанную схему мультимодальных перевозок: авиа до соседних хабов (Варшава, Франкфурт, Вена) + автодоставка в Украину. Это позволяет обходить ограничения и существенно сокращать сроки.',
        },
        {
          heading: 'Особые категории грузов',
          bullets: [
            'Фармацевтика и медоборудование (стандарты GDP)',
            'Электроника и полупроводники (антистатическая упаковка)',
            'Опасные и ограниченные к перевозке вещества (IATA DGR)',
            'Ценные грузы и произведения искусства (спецохрана, страхование)',
          ],
        },
      ],
      closing: 'Corcel — ваш глобальный партнёр в небе.',
    },
    sea: {
      intro: 'Морские перевозки — наиболее экономичный способ транспортировки больших объёмов грузов на дальние расстояния. Corcel организует полный цикл морской логистики: от букинга контейнера до доставки груза на ваш склад. Мы работаем с ведущими судоходными линиями и обеспечиваем конкурентные ставки фрахта по всем ключевым направлениям — Чёрное море, Средиземноморье, Азия, Америка.',
      sections: [
        {
          heading: 'FCL или LCL — выбор за вами',
          text: 'В зависимости от объёма груза Corcel предлагает два варианта контейнерных перевозок:',
          bullets: [
            'FCL (Full Container Load) — полный контейнер исключительно под ваш груз. Идеальное решение для крупных отправок: максимальная сохранность, минимальная стоимость за единицу объёма. Типы контейнеров: 20\', 40\', 40\'HC, рефрижераторные, open-top.',
            'LCL (Less than Container Load) — сборный контейнер для небольших грузов. Вы платите только за фактически занимаемый объём, что делает этот вариант оптимальным для регулярных небольших поставок.',
            'RO-RO (Roll-on/Roll-off) — специализированный сервис для транспортных средств, спецтехники и колёсного оборудования.',
          ],
        },
        {
          heading: 'Наши морские маршруты',
          text: 'Corcel обеспечивает регулярные отправки по следующим направлениям:',
          bullets: [
            'Чёрное море — Средиземноморье: Одесса / Черноморск → Стамбул, Пирей (Афины), Барселона, Генуя',
            'Азиатское направление: Шанхай, Гуанчжоу, Нинбо → Гамбург, Роттердам → Украина (через польские или румынские порты)',
            'Трансатлантика: Нью-Йорк, Майами, Хьюстон → Роттердам / Гамбург → Украина',
          ],
        },
        {
          heading: 'Дополнительные услуги',
          bullets: [
            'Букинг и отслеживание контейнера в режиме реального времени',
            'Портовая обработка и погрузочно-разгрузочные работы (THC)',
            'Оформление коносамента (B/L) и всей портовой документации',
            'Страхование груза на весь маршрут по условиям Гаага-Висби',
            'Таможенное оформление в порту назначения',
          ],
        },
      ],
      closing: 'Corcel — ваш надёжный мост между морями и континентами.',
    },
    rail: {
      intro: 'Железнодорожные перевозки — оптимальный выбор для транспортировки больших объёмов грузов на средние и дальние расстояния по доступной стоимости. Corcel организует отправки контейнерными поездами и вагонными лотами по маршрутам Украина — ЕС — Китай, обеспечивая полное документальное сопровождение и таможенное оформление на границе.',
      sections: [
        {
          heading: 'Железнодорожные решения Corcel',
          text: 'Мы предлагаем гибкие форматы железнодорожных перевозок под разные задачи:',
          bullets: [
            'Контейнерные поезда — отправки в 20\' и 40\'HC контейнерах по расписанию между Украиной, Польшей и Китаем. Сроки доставки значительно меньше морских и в 2–3 раза дешевле авиа.',
            'Платформенные отправки — перевозка крупногабаритного оборудования, спецтехники и автомобилей на железнодорожных платформах.',
            'Вагонные и повагонные лоты (CWL) — для насыпных, наливных и пакетированных грузов большого тоннажа.',
          ],
        },
        {
          heading: 'Мультимодальные схемы',
          text: 'Железная дорога — часто лишь часть маршрута. Corcel совмещает железнодорожную отправку с автодоставкой, обеспечивая сервис «от двери до двери»:',
          bullets: [
            'Авто + железная дорога: сбор груза по Украине → погрузка в поезд → автодоставка в городе назначения в ЕС',
            'Железная дорога + море: для грузов на транзитных маршрутах через несколько стран',
            'Транзит через Польшу, Беларусь и Казахстан в направлении Китая (Новый шёлковый путь)',
          ],
        },
        {
          heading: 'Преимущества железнодорожной логистики',
          numbered: [
            'Стабильное расписание — отправки по фиксированным датам, что позволяет планировать поставки заранее.',
            'Высокая грузоподъёмность — один поезд заменяет десятки фур.',
            'Меньшая зависимость от погодных условий по сравнению с морем и авиа.',
            'Экологичность — железная дорога оставляет значительно меньший углеродный след.',
          ],
        },
      ],
      closing: 'Corcel — железнодорожная точность в каждом маршруте.',
    },
    cust: {
      intro: 'Таможенное оформление — один из самых сложных и ответственных этапов международной логистики. Ошибка в документах может стоить вашему бизнесу времени и значительных денежных потерь. Команда таможенных брокеров Corcel с многолетним опытом берёт эту задачу под свой полный контроль — от классификации товаров до получения разрешительных документов.',
      sections: [
        {
          heading: 'Брокерские услуги полного цикла',
          text: 'Corcel выполняет все таможенные процедуры на Украине, в Польше и Испании:',
          bullets: [
            'Декларирование импорта — подготовка и подача ТД, расчёт таможенных платежей, уплата пошлины и НДС.',
            'Декларирование экспорта — оформление грузов на вывоз с Украины с возвратом НДС.',
            'Классификация товаров по УКТВЭД / HS Code — правильный код товара критически влияет на размер пошлины.',
            'Транзитное оформление — для грузов, проходящих через несколько таможенных зон.',
          ],
        },
        {
          heading: 'Разрешительные документы и лицензии',
          text: 'Отдельные категории товаров требуют специальных разрешений:',
          bullets: [
            'Санитарно-эпидемиологические заключения и фитосанитарные сертификаты для продуктов питания',
            'Лицензии Минэкономики для товаров двойного использования',
            'Сертификаты соответствия и технические регламенты для промышленного оборудования',
            'Разрешения для радиоэлектронных средств',
          ],
        },
        {
          heading: 'Почему стоит выбирать таможенных брокеров Corcel',
          numbered: [
            'Собственные представительства на Украине, в Польше и Испании — таможенное оформление в режиме реального времени без посредников.',
            'Электронное декларирование — подача таможенных деклараций в системе АСМТ 24/7.',
            'Полное юридическое сопровождение — защита ваших интересов при проверках ГТС.',
            'Консультации по таможенному законодательству — актуальные разъяснения по изменениям в законодательстве ЕС и Украины.',
          ],
        },
      ],
      closing: 'Corcel — таможенная чёткость для вашего спокойствия.',
    },
    wh: {
      intro: 'Современный склад — это не просто место хранения товара. Это центр управления вашей цепочкой поставок. Corcel предоставляет складские услуги класса А и В на Украине и в Польше, обеспечивая полный спектр операций: от приёмки груза до отправки конечному покупателю.',
      sections: [
        {
          heading: 'Полный комплекс складских услуг',
          bullets: [
            'Ответственное хранение с онлайн-инвентаризацией через WMS-систему в режиме 24/7.',
            'Приёмка, сортировка и маркировка товаров по спецификации заказчика.',
            'Кросс-докинг — перегрузка между транспортными средствами без долгосрочного хранения.',
            'Консолидация сборных грузов и подготовка к отправке в любом направлении.',
          ],
        },
        {
          heading: 'Фулфилмент для e-commerce',
          text: 'Corcel предлагает полный аутсорсинг складской логистики для интернет-магазинов и маркетплейсов:',
          bullets: [
            'Интеграция с Rozetka, Prom, Amazon, Shopify и другими платформами',
            'Сборка и упаковка заказов по стандартам качества',
            'Автоматическая генерация накладных и ярлыков для курьерских служб',
            'Обработка возвратов и обменов товаров',
          ],
        },
        {
          heading: 'Специализированные зоны хранения',
          bullets: [
            'Температурные зоны (+2/+8°C и +15/+25°C) для продуктов питания и фармацевтики',
            'Зоны для опасных грузов ADR с усиленной системой пожаротушения',
            'Охраняемые ячейки для ценных товаров и товаров с ограниченным доступом',
            'Зоны для крупногабаритных изделий и промышленного оборудования',
          ],
        },
      ],
      closing: 'Corcel — ваш склад под ключ, где порядок — это наш стандарт.',
    },
  },
  en: {
    auto: {
      intro: 'In today\'s world, a company\'s success directly depends on the speed and precision of its supply chain. Corcel is your strategic partner in transport logistics, ensuring uninterrupted delivery of cargo of any complexity. We don\'t just move goods — we build optimised supply chains that save your resources.',
      sections: [
        {
          heading: 'Why choose Corcel?',
          text: 'We understand that every business is unique, which is why we offer flexible solutions for the most diverse challenges:',
          bullets: [
            'FTL (Full Truck Load) — for those who need maximum speed and full truck capacity. The entire vehicle is dedicated to your order, guaranteeing the shortest door-to-door delivery times.',
            'LTL (Less than Truck Load) — the optimal solution for SMEs. Groupage shipments let you pay only for the space your cargo occupies, significantly reducing logistics costs.',
            'Refrigerated transport — strict temperature control throughout transit, ideal for food, cosmetics, pharmaceuticals and other temperature-sensitive goods.',
            'ADR (Dangerous goods) — Corcel holds all required licences and operates specially equipped vehicles for hazardous materials in compliance with international safety protocols.',
          ],
        },
        {
          heading: 'Our advantages — your opportunities:',
          numbered: [
            'Geography without limits — we handle international and domestic shipments, finding optimal routes even in highly complex situations.',
            'Transparency and control — you always know where your cargo is, thanks to real-time GPS tracking and regular status updates.',
            'End-to-end service — from paperwork to insurance, we handle everything so you can focus on growing your business.',
            'Own fleet — reliable, eco-standard vehicles that minimise breakdown and delay risks.',
          ],
        },
      ],
      closing: 'Corcel — delivering trust with every mile.',
    },
    sea: {
      intro: 'Sea freight is the most cost-effective way to ship large volumes of cargo over long distances. Corcel manages the full cycle of maritime logistics — from container booking to last-mile delivery to your warehouse. We partner with leading shipping lines to offer competitive freight rates on all major routes: Black Sea, Mediterranean, Asia, and the Americas.',
      sections: [
        {
          heading: 'FCL or LCL — your choice',
          text: 'Depending on cargo volume, Corcel offers two container shipping options:',
          bullets: [
            'FCL (Full Container Load) — a container dedicated entirely to your cargo. Best for large shipments: maximum security, lowest cost per cubic metre. Container types: 20\', 40\', 40\'HC, refrigerated, open-top.',
            'LCL (Less than Container Load) — groupage shipping for smaller cargo. You pay only for the space your goods occupy, making this ideal for regular smaller shipments.',
            'RO-RO (Roll-on/Roll-off) — specialised service for vehicles, heavy machinery and wheeled equipment.',
          ],
        },
        {
          heading: 'Our sea routes',
          text: 'Corcel provides regular sailings on the following lanes:',
          bullets: [
            'Black Sea — Mediterranean: Odesa / Chornomorsk → Istanbul, Piraeus (Athens), Barcelona, Genoa',
            'Asia lane: Shanghai, Guangzhou, Ningbo → Hamburg, Rotterdam → Ukraine (via Polish or Romanian ports)',
            'Transatlantic: New York, Miami, Houston → Rotterdam / Hamburg → Ukraine',
          ],
        },
        {
          heading: 'Additional services',
          bullets: [
            'Real-time container booking and tracking',
            'Port handling and stevedoring (THC)',
            'Bill of Lading (B/L) and full port documentation',
            'Cargo insurance for the entire route under Hague-Visby Rules',
            'Customs clearance at the port of destination',
          ],
        },
      ],
      closing: 'Corcel — your reliable bridge between seas and continents.',
    },
    rail: {
      intro: 'Rail freight is the optimal choice for moving large volumes of cargo over medium and long distances at competitive cost. Corcel arranges container train and wagon-lot shipments on Ukraine — EU — China corridors, providing full documentation and border customs clearance.',
      sections: [
        {
          heading: 'Rail solutions from Corcel',
          text: 'We offer flexible rail formats for different cargo needs:',
          bullets: [
            'Container trains — scheduled 20\' and 40\'HC container shipments between Ukraine, Poland and China. Transit times are far shorter than sea and 2–3× cheaper than air.',
            'Flatcar shipments — oversized equipment, heavy machinery and vehicles on dedicated rail platforms.',
            'Wagon and full-wagon lots (CWL) — for bulk, liquid and palletised cargo of high tonnage.',
          ],
        },
        {
          heading: 'Multimodal schemes',
          text: 'Rail is often just one leg of the journey. Corcel combines rail with truck delivery for true door-to-door service:',
          bullets: [
            'Truck + rail: cargo collection across Ukraine → train loading → truck delivery in the EU city of destination',
            'Rail + sea: for cargo on multi-country transit routes',
            'Transit via Poland, Belarus and Kazakhstan toward China (New Silk Road)',
          ],
        },
        {
          heading: 'Rail logistics advantages',
          numbered: [
            'Fixed schedule — departures on set dates, enabling precise supply chain planning.',
            'High capacity — one train replaces dozens of trucks.',
            'Lower weather dependency than sea or air.',
            'Eco-friendly — rail leaves a significantly smaller carbon footprint.',
          ],
        },
      ],
      closing: 'Corcel — rail precision on every route.',
    },
    cust: {
      intro: 'Customs clearance is one of the most complex and consequential steps in international logistics. A documentation error can cost your business time and significant money. Corcel\'s team of experienced customs brokers takes full control — from commodity classification to obtaining permits.',
      sections: [
        {
          heading: 'Full-cycle brokerage',
          text: 'Corcel handles all customs procedures in Ukraine, Poland and Spain:',
          bullets: [
            'Import declarations — preparation and submission of customs entries, calculation and payment of duties and VAT.',
            'Export declarations — clearance of outbound shipments from Ukraine, including VAT refund processing.',
            'Commodity classification under UKTZED / HS Code — the correct tariff code directly impacts duty rates.',
            'Transit declarations — for cargo moving through multiple customs territories.',
          ],
        },
        {
          heading: 'Permits and licences',
          text: 'Certain product categories require additional authorisations:',
          bullets: [
            'Sanitary and phytosanitary certificates for food products',
            'Ministry of Economy licences for dual-use goods',
            'Conformity certificates and technical regulations for industrial equipment',
            'Radio frequency authorisations for electronic devices',
          ],
        },
        {
          heading: 'Why choose Corcel customs brokers',
          numbered: [
            'Own offices in Ukraine, Poland and Spain — real-time clearance without intermediaries.',
            'Electronic declaration — filing via ASMT system available 24/7.',
            'Full legal support — representation of your interests during customs audits.',
            'Legal advisory — up-to-date guidance on changes in EU and Ukrainian customs law.',
          ],
        },
      ],
      closing: 'Corcel — customs clarity for your peace of mind.',
    },
    wh: {
      intro: 'A modern warehouse is more than a place to store goods — it is the command centre of your supply chain. Corcel provides Class A and B warehousing in Ukraine and Poland, covering the full operational spectrum from cargo intake to last-mile dispatch.',
      sections: [
        {
          heading: 'Full-service warehousing',
          bullets: [
            'Custody storage with real-time online inventory via WMS, available 24/7.',
            'Receiving, sorting and labelling to customer specifications.',
            'Cross-docking — transfer between transport modes without long-term storage.',
            'Groupage consolidation and outbound preparation to any destination.',
          ],
        },
        {
          heading: 'E-commerce fulfilment',
          text: 'Corcel offers complete outsourced warehouse logistics for online retailers and marketplaces:',
          bullets: [
            'Integration with Rozetka, Prom, Amazon, Shopify and other platforms',
            'Order picking and packing to quality standards',
            'Automatic generation of shipping labels and manifests for courier services',
            'Returns and exchanges handling',
          ],
        },
        {
          heading: 'Specialist storage zones',
          bullets: [
            'Temperature-controlled zones (+2/+8°C and +15/+25°C) for food and pharmaceuticals',
            'ADR dangerous goods zones with enhanced fire suppression systems',
            'Secure cages for high-value or restricted-access goods',
            'Oversize and heavy-industry storage areas',
          ],
        },
      ],
      closing: 'Corcel — turnkey warehousing where order is our standard.',
    },
  },
};

const DETAILS: Record<Slug, { color: string; tags: string[]; features: string[] }> = {
  auto: {
    color: 'dark',
    tags: ['FTL', 'LTL', 'Збірні', 'Reefer', 'ADR'],
    features: [
      'Власний автопарк: тентовані, рефрижератори, бортові напівпричепи',
      'Збірні (LTL) та повновантажні (FTL) відправлення',
      'Регулярні рейси Україна — ЄС тричі на тиждень',
      'GPS-трекінг та сповіщення на кожному етапі маршруту',
      'Перевезення негабаритних та небезпечних вантажів ADR',
      'Страхування вантажу на весь шлях',
    ],
  },
  air: {
    color: '',
    tags: ['Чартер', 'Express', 'Hand Carry', 'IATA DGR'],
    features: [
      'Доставка термінових вантажів за 2–5 днів по всьому світу',
      'Чартерні рейси під проєктні вантажі будь-якого обсягу',
      'Агентська мережа в 80+ аеропортах світу',
      'Контроль температурного режиму (GDP) для фармацевтики',
      'Відстеження рейсу в реальному часі',
      'Повне митне оформлення в аеропорту',
    ],
  },
  sea: {
    color: 'red',
    tags: ["20'/40'/HC", 'LCL', 'FCL', 'RO-RO'],
    features: [
      'FCL та LCL контейнерні відправлення з усіх українських портів',
      'Прямі контракти з провідними океанськими лініями',
      "Маршрути: Чорне море — Середземномор'я — Азія — Америка",
      'Буккінг та трекінг в єдиному особистому кабінеті',
      'Консолідація збірних вантажів LCL',
      'Страхування вантажу та оформлення коносамента',
    ],
  },
  rail: {
    color: '',
    tags: ['40HC', 'Платформи', 'Повагонні'],
    features: [
      'Контейнерні поїзди Україна — Польща — Китай',
      'Відправлення платформ, вагонів, цистерн',
      'Поєднання залізниці з автодоставкою (мультимодаль)',
      'Транзит через Польщу, Білорусь, Казахстан',
      'Оренда вагонів та платформ',
      'Митне оформлення на кордоні включено',
    ],
  },
  cust: {
    color: '',
    tags: ['ЄС', 'Брокер', 'Ліцензія'],
    features: [
      'Власні митні представництва в Україні, Польщі та Іспанії',
      'Брокерське оформлення імпорту та експорту',
      'Класифікація товарів за УКТЗЕД / HS Code',
      'Отримання дозвільних документів та ліцензій',
      'Повернення ПДВ при експорті',
      'Консультації з митного законодавства ЄС та України',
    ],
  },
  wh: {
    color: '',
    tags: ['Клас A/B', 'Фулфілмент', 'Крос-докінг'],
    features: [
      'Власні склади класу A/B в Україні та Польщі',
      'Відповідальне зберігання з інвентаризацією онлайн',
      'Крос-докінг та перевантаження між транспортними засобами',
      'Фулфілмент для e-commerce: збирання, пакування, відправлення',
      'Температурні зони для продуктів та фармацевтики',
      'WMS-система з доступом замовника 24/7',
    ],
  },
};

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!SLUGS.includes(slug as Slug)) notFound();

  const t = await getTranslations('svc');
  const detail = DETAILS[slug as Slug];
  const longContent = CONTENT[locale]?.[slug as Slug] ?? CONTENT['uk']?.[slug as Slug];
  const lp = locale === 'uk' ? '' : `/${locale}`;

  const title = t(`${slug}.t` as Parameters<typeof t>[0]);
  const desc  = t(`${slug}.d` as Parameters<typeof t>[0]);

  return (
    <>
      <Header />
      <main style={{ paddingTop: 80 }}>
        {/* Hero */}
        <section className={`svc-page-hero${detail.color ? ` svc-page-${detail.color}` : ''}`}>
          <div className="s-inner" style={{ paddingTop: 80, paddingBottom: 80 }}>
            <Link href={`${lp}/#services`} className="svc-back">← {t('eyebrow')}</Link>
            <h1 className="svc-page-title">{title}</h1>
            <p className="svc-page-sub">{desc}</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 24 }}>
              {detail.tags.map((tag) => (
                <span key={tag} className="svc-tag svc-page-tag">{tag}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Key features grid */}
        <section className="s">
          <div className="s-inner">
            <h2 className="s-title" style={{ marginBottom: 40, fontSize: 32 }}>Переваги та можливості</h2>
            <div className="svc-features">
              {detail.features.map((f, i) => (
                <div key={i} className="svc-feature">
                  <div className="svc-feature-ico">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                  </div>
                  <span>{f}</span>
                </div>
              ))}
            </div>

            {/* Long-form content */}
            {longContent && (
              <div className="svc-long">
                {longContent.intro && (
                  <p className="svc-long-intro">{longContent.intro}</p>
                )}
                {longContent.sections.map((sec, si) => (
                  <div key={si} className="svc-long-section">
                    {sec.heading && <h3 className="svc-long-h">{sec.heading}</h3>}
                    {sec.text && <p className="svc-long-p">{sec.text}</p>}
                    {sec.bullets && (
                      <ul className="svc-long-list">
                        {sec.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
                      </ul>
                    )}
                    {sec.numbered && (
                      <ol className="svc-long-list svc-long-ol">
                        {sec.numbered.map((n, ni) => <li key={ni}>{n}</li>)}
                      </ol>
                    )}
                  </div>
                ))}
                {longContent.closing && (
                  <p className="svc-long-closing">{longContent.closing}</p>
                )}
              </div>
            )}

            <div className="svc-page-cta">
              <a href={`${lp}/#contact`} className="btn btn-primary">
                <span>Замовити перевезення</span> <span className="arr">→</span>
              </a>
              <a href="tel:+380443333228" className="btn btn-outline btn-call">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>+38 044 333 32 28</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
