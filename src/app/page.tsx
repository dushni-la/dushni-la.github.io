import PlatformLinks from "@/components/PlatformLinks";
import { Episode, Feedback } from "@/components/types";
import { Button, Card, CardBody, Image } from "@nextui-org/react";
import FeedbackCard from "@/components/FeedbackCard";
import { PiArrowRightFill } from "react-icons/pi";
import EpisodeItem from "@/components/EpisodeItem";
import { getEpisodes } from "./episodes/utils";
import PlayEpisodeButton from "@/components/PlayEpisodeButton";
import Link from "next/link";
import Section from "@/components/Section";
import type { Metadata } from "next";
import AboutSection from "@/components/AboutSection";

export const metadata: Metadata = {
  title: "Душніла — подкаст про філософію, психологію та самоаналіз.",
  description:
    "Душніла — подкаст для тих, хто хоче краще зрозуміти себе та світ навколо. Роздуми про життя, філософію, психологію та саморозвиток. Підписуйся та слухай!",
  alternates: {
    canonical: `https://dushni.la`,
  },
  openGraph: {
    type: "website",
    url: "https://dushni.la/",
    title: "Душніла — подкаст про філософію, психологію та самоаналіз.",
    description:
      "Душніла — подкаст для тих, хто хоче краще зрозуміти себе та світ навколо. Роздуми про життя, філософію, психологію та саморозвиток. Підписуйся та слухай!",
    images: [
      {
        url: "https://dushni.la/og_image.png",
        alt: "Обкладинка подкасту Душніла",
      },
    ],
  },
};

const feedback: Feedback[] = [
  {
    username: "Трохи більше ніж вдача",
    text: "Дуже близькі думки. Ніби саморефлексую під час прослуховування. Дякую!",
    platform: "apple",
    stars: 5,
    date: "09/23/2024",
  },
  {
    username: "lisa.zolot",
    text: "Подкаст сподобається людям, які не проти розглядати різні теми на молекулярному рівні(а інколи це необхідно, щоб помітити важливі деталі), щоб розібратися в ситуації, концепціях тощо. Дякую, Ігор!",
    platform: "apple",
    stars: 5,
    date: "06/04/2024",
  },
  {
    username: "De_parlam",
    text: "Мені подобається, як Ігор пояснює своїй аудиторії важкі концепції через власну призму, через свій досвід і свої думки. На власному прикладі пояснює стоїцизм і подає приклад українця, який приймає труднощі, рефлексує і йде далі. Також дуже гарна українська. Ще можна писати і писати. Щиро дякую за працю, один з моїх найулюбленіших подкастів.",
    platform: "apple",
    stars: 5,
    date: "03/22/2024",
  },
  {
    username: "Gindrik",
    text: "Я постійно відмовляюся і потім повертаюся до цього подкасту;) Спочатку мені здається, що він занадто субʼєктивний і дилетантський, але потім я слухаю наступні випуски, бо мені подобаються думки. І загалом, зараз вже прийшла до висновку, що це і добре, що він « субʼєктивний і дилетантський», він просто такий, який є і питання тільки в тому, чи цікаво тобі/резонують із тобою думки чи ні. Зі мною резонують, а ви пробуйте/слухайте.",
    platform: "apple",
    stars: 4,
    date: "12/06/2023",
  },
  {
    username: "Mariam Shurghaia",
    text: "Вперше сьогодні потрапила на цей подкаст. Мені сподобалась назва. Думаю, що я також душніла, просто ніхто мені про це не говорить 🤭 Дуже цікаво було послухати про свою «тінь». Варто мені подумати про це, згадати, що мене бісить в інших, точно щось цікаве зможу помітити. Дякую",
    platform: "apple",
    stars: 4,
    date: "10/13/2023",
  },
  {
    username: "Polkifrit",
    text: "Дуже влучно про мій стан на сьогодні в подкасті за 15 вересня, дуже цікаві речі розповідаєте 👍",
    platform: "apple",
    stars: 5,
    date: "09/20/2023",
  },
  {
    username: "#робозалежна",
    text: "Дуже цікаво розказуєте, дякую",
    platform: "apple",
    stars: 5,
    date: "08/05/2023",
  },
  {
    username: "Iryna123",
    text: "Дуже класно підібраний контент і мені подобається, що випуски не більше 40 хв, як раз для прогулянки:) теми розкриті дуже гарно, і супер коли даєте посилання на авторів і книги. Дякую за роботу!",
    platform: "apple",
    stars: 5,
    date: "07/08/2023",
  },
  {
    username: "тнп",
    text: "назва для подкасту підібрана влучно, як на мене. випуск «калібрація компасу» описує близький мені стан, тому допоміг зробити деякі висновки. дякую за роботу!",
    platform: "apple",
    stars: 5,
    date: "06/14/2023",
  },
  {
    username: "Julia___777",
    text: "Дуже цікаво про життєві питанні. Сподобається усім допитливим 👍",
    platform: "apple",
    stars: 5,
    date: "05/10/2023",
  },
  {
    username: "Zhuravel_Dimass",
    text: "Нарешті я знайшов подкаст для себе ! Дякую за роботу і надіюся що ще буде багато нових подкастів! Успіху",
    platform: "apple",
    stars: 5,
    date: "04/04/2023",
  },
  {
    username: "КатеринаКу",
    text: "Дуже подобається, дякую за працю 👏",
    platform: "apple",
    stars: 5,
    date: "12/30/22",
  },
  {
    username: "fowjdjiwjs",
    text: "Дуже «теплий» підкаст про важливі речі. Наче сидиш із другом на кухні і слухаєш його думки, про цьому ловиш інсайти. Рекомендую!",
    platform: "apple",
    stars: 5,
    date: "12/11/2022",
  },
  {
    username: "DmitryKrasun",
    text: "Неймовірної глибини подкаст. Ігор не здається і щоразу ставить дедалі глибші питання перед собою і поки що знаходить на них відповіді. Одне задоволення стежити за ним.",
    platform: "apple",
    stars: 5,
    date: "08/27/2022",
  },
];

const AchievementCard = ({
  idx,
  title,
  subtitle,
  comment,
}: {
  idx: number;
  title: string;
  subtitle: string;
  comment?: string;
}) => (
  <Card className="w-[10rem] h-[10rem] md:w-[20rem] md:h-[20rem] shadow-[0_0_60px_15px_#bdc5dc] dark:shadow-[#081115]">
    <Image
      classNames={{
        wrapper: "absolute left-0 right-0 bottom-0 top-0",
      }}
      alt=""
      src={`/topographic_pattern_${idx}.png`}
      style={{
        width: "20rem",
        height: "20rem",
      }}
    />
    <div
      className="absolute z-10"
      style={{
        inset: "0%",
        backdropFilter: "blur(20px)",
        mask: `linear-gradient(135deg, transparent, black 60%)`,
        filter: `hue-rotate(${(idx + 1) * 55}deg)`,
      }}
    />
    <CardBody className="p-4 z-10 text-white justify-end items-end">
      <h2 className="text-5xl md:text-8xl">{title}</h2>
      <p className="text-right">{subtitle}</p>
      {comment && <small className="text-right">{comment}</small>}
    </CardBody>
  </Card>
);

const HeroCard = ({ latest }: { latest: Episode }) => (
  <Card className="mt-[4rem] mb-[4rem] md:mb-0 md:mt-[10rem] w-full md:w-[50rem] self-center relative overflow-visible">
    <Image
      alt="logo"
      src="/logo.png"
      isBlurred
      classNames={{
        wrapper:
          "absolute w-[140px] h-[140px] md:w-[200px] md:h-[200px] top-[-70px] left-[calc(50%-70px)] md:top-[-128px] md:left-[50px] rounded-full overflow-hidden shadow-lg z-10",
      }}
    />
    <Image
      isBlurred
      alt="Подкастер"
      src="/ancient_podcaster.png"
      classNames={{
        wrapper:
          "absolute w-[120px] h-[120px] md:w-[220px] md:h-[220px] bottom-[-70px] right-[20px] md:bottom-[-58px] md:right-[-20px] z-10",
      }}
      width="220"
    />
    <CardBody className="relative flex p-10 pt-[6rem] pb-[4rem] md:pb-10 rounded-[1rem] bg-default-100 flex-row justify-between items-end gap-8 lg:border-x lg:border-default-200 dark:lg:border-[#25242c] bg-hero-pattern dark:bg-hero-pattern-dark">
      <div className="flex flex-col gap-1 flex-1">
        <h1 className="font-[alegreya] text-3xl">
          Подкаст про розуміння себе і світу.
        </h1>
        <p>
          Занурюємося в філософію, психологію та критичне мислення, щоб побачити
          більше.
        </p>

        <div className="flex flex-col mt-8">
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <PlatformLinks hideLabels />
          </div>
        </div>

        <div className="flex flex-col md:flex-row mt-8 gap-4">
          <PlayEpisodeButton
            color="warning"
            variant="solid"
            radius="full"
            className="shadow-lg cursor-pointer"
            episode={latest}
            playTitle="Слухати свіжий епізод"
            pauseTitle="Пауза"
          />
          <Button
            color="default"
            variant="solid"
            radius="full"
            className="shadow-lg cursor-pointer"
            as={Link}
            href="/episodes"
          >
            Знайти епізод по душі
            <PiArrowRightFill />
          </Button>
        </div>
      </div>
    </CardBody>
  </Card>
);

export default async function Home() {
  const episodes = await getEpisodes();

  const sorted = episodes.sort((a, b) => (+a.episode > +b.episode ? -1 : 1));

  const achievements = [
    {
      title: "280K",
      subtitle: "завантажень",
      comment: "і це лише аудіоверсія.",
    },
    {
      title: episodes.length.toString(),
      subtitle: "випусків",
      comment: "та ще є кілька бонусних епізодів.",
    },
    {
      title: "№1",
      subtitle: "подкаст в Україні*",
      comment: "*буває час від часу",
    },
    {
      title: "144",
      subtitle: "країни, де вмикався подкаст,",
      comment: "а також 7279 міст.",
    },
  ];

  return (
    <div className="p-4 md:p-10 flex flex-col gap-16 pb-0">
      <HeroCard latest={sorted[0]} />
      <Section
        title="Свіжий епізод"
        subtitle="Свіжий ковток аналізу, щоб побачити звичне під іншим кутом."
      >
        <div className="md:w-[40rem] self-center flex flex-col gap-4 relative">
          <div className="absolute top-[-2rem] left-[-2rem] right-[-2rem] bottom-[-2rem] bg-gradient-to-br from-cyan-200 to-warning blur-3xl z-0" />
          <EpisodeItem data={sorted[0]} />
          <Button
            fullWidth
            color="default"
            variant="solid"
            className="shadow-lg cursor-pointer"
            as={Link}
            href="/episodes"
          >
            Всі епізоди
            <PiArrowRightFill />
          </Button>
        </div>
      </Section>
      <Section
        title="Досягнення"
        subtitle="Перемоги, які надихають продовжувати копати глибше."
      >
        <div className="grid grid-cols-2 self-center items-center gap-8">
          {achievements.map((ach, idx) => (
            <AchievementCard key={idx} idx={idx} {...ach} />
          ))}
        </div>
      </Section>
      <Section
        title="Що кажуть слухачі"
        subtitle="Щирі враження від тих, хто любить думати."
      >
        <div className="columns-1 md:columns-2 lg:columns-3 lg:max-w-[80rem] self-center">
          {feedback.slice(6).map((f) => (
            <FeedbackCard key={f.username} data={f} />
          ))}
        </div>
      </Section>
      <AboutSection />
    </div>
  );
}
