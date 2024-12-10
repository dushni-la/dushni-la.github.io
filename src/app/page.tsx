import Navigation from "@/components/Navigation";
import PlatformLinks from "@/components/PlatformLinks";
import { Feedback } from "@/components/types";
import { Button, Card, CardBody, Image } from "@nextui-org/react";
import FeedbackCard from "./FeedbackCard";
import { PiArrowRightFill } from "react-icons/pi";
import EpisodeItem from "@/components/EpisodeItem";
import { getEpisodes } from "./episodes/utils";
import PlayEpisodeButton from "./PlayEpisodeButton";
import Link from "next/link";

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

export default async function Home() {
  const episodes = await getEpisodes();

  const sorted = episodes.sort((a, b) => (+a.episode > +b.episode ? -1 : 1));

  return (
    <main className="flex-auto">
      <Navigation />
      <div className="p-10 flex flex-col gap-16">
        <Card className="mt-[10rem] w-[50rem] self-center relative overflow-visible">
          <Image
            alt="logo"
            src="/logo.png"
            isBlurred
            width={200}
            className="absolute w-[200px] h-[200px] top-[-128px] left-[50px] rounded-full overflow-hidden shadow-lg"
          />
          <Image
            isBlurred
            alt="Подкастер"
            src="/ancient_podcaster.png"
            className="absolute"
            style={{
              right: 0,
              bottom: -400,
            }}
            width="220"
          />
          <CardBody className="relative flex p-10 pt-[6rem] rounded-[1rem] bg-default-100 flex-row justify-between items-end gap-8 lg:border-x lg:border-default-200 dark:lg:border-[#25242c] bg-hero-pattern dark:bg-hero-pattern-dark">
            <div className="flex flex-col gap-1 flex-1">
              <p className="font-[alegreya] text-3xl">
                Подкаст про розуміння себе і світу.
              </p>
              <p>
                Занурюємося в психологію, філософію та критичне мислення, щоб
                побачити більше.
              </p>

              <div className="flex flex-col mt-8">
                <div className="flex flex-wrap gap-4">
                  <PlatformLinks hideLabels />
                </div>
              </div>

              <div className="flex flex-row mt-8 gap-4">
                <PlayEpisodeButton
                  color="warning"
                  variant="solid"
                  radius="full"
                  className="shadow-lg cursor-pointer"
                  episode={sorted[0]}
                  playTitle="Слухати свіжий епізод"
                  pauseTitle="Пауза"
                />
              </div>
            </div>
          </CardBody>
        </Card>
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl text-center">Свіжий епізод</h2>
          <h4 className="text-xl text-center font-[alegreya]">
            Свіжий ковток аналізу, щоб побачити звичне під іншим кутом.
          </h4>
        </div>
        <div className="w-[40rem] self-center flex flex-col gap-4">
          <EpisodeItem data={sorted[0]} />
          <Button
            fullWidth
            color="primary"
            variant="flat"
            className="shadow-lg cursor-pointer"
            as={Link}
            href="/episodes"
          >
            Всі епізоди
            <PiArrowRightFill />
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl text-center">Досягнення</h2>
          <h4 className="text-xl text-center font-[alegreya]">
            Перемоги, які надихають продовжувати копати глибше.
          </h4>
        </div>
        <div className="grid grid-cols-2 self-center items-center gap-8">
          <Card className="w-[20rem] h-[20rem]">
            <CardBody className="bg-default-100 p-4">
              <h2 className="text-8xl">280K</h2>
              <p>завантажень</p>
              <p>
                <small>і це лише аудіо-версія.</small>
              </p>
            </CardBody>
          </Card>
          <Card className="w-[20rem] h-[20rem]">
            <CardBody className="bg-default-100 p-4">
              <h2 className="text-8xl">{episodes.length}</h2>
              <p>випусків</p>
              <p>
                <small>та ще є кілька бонусних епізодів.</small>
              </p>
            </CardBody>
          </Card>
          <Card className="w-[20rem] h-[20rem]">
            <CardBody className="bg-default-100 p-4">
              <h2 className="text-8xl">№1</h2>
              <p>подкаст в Україні*</p>
              <p>
                <small>*був колись, але це не так важливо</small>
              </p>
            </CardBody>
          </Card>
          <Card className="w-[20rem] h-[20rem]">
            <CardBody className="bg-default-100 p-4">
              <h2 className="text-8xl">144</h2>
              <p>країни, де вмикався подкаст,</p>
              <p>
                <small>а також 7279 міст.</small>
              </p>
            </CardBody>
          </Card>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl text-center">Що кажуть слухачі</h2>
          <h4 className="text-xl text-center font-[alegreya]">
            Той, хто не втомлюється задавати собі запитання — і вам теж.
          </h4>
        </div>
        <div className="columns-3">
          {feedback.map((f) => (
            <FeedbackCard key={f.username} data={f} />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl text-center">Про автора</h2>
          <h4 className="text-xl text-center font-[alegreya]">
            Той, хто не втомлюється задавати собі запитання — і вам теж.
          </h4>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl text-center">Підтримуй</h2>
          <h4 className="text-xl text-center font-[alegreya]">
            Роби добро. Підтримай подкаст, який змушує думати.
          </h4>
        </div>
      </div>
    </main>
  );
}
