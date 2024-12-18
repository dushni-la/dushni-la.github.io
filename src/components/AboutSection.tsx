import { Button, Card, CardBody, Image } from "@nextui-org/react";
import Link from "next/link";
import { PiArrowRightFill } from "react-icons/pi";
import SubscribeButton from "./SubscribeButton";
import Section from "./Section";

export default function AboutSection() {
  return (
    <Section
      title="Про автора"
      subtitle="Той, хто не втомлюється задавати собі запитання — і вам теж."
    >
      <div className="md:w-[40rem] self-center mt-[6rem]">
        <Card className="relative overflow-visible">
          <Image
            classNames={{
              wrapper:
                "absolute top-[-80px] left-[calc(50%-50px)] md:left-[unset] md:top-[-100px] md:right-[-10px] lg:right-[-50px] shadow-lg",
            }}
            alt="logo"
            src="https://avatars.githubusercontent.com/u/1727140?v=4"
            isBlurred
            width={200}
            className="w-[100px] h-[100px] md:w-[160px] md:h-[160px]"
          />
          <CardBody className="bg-default-50 p-10 gap-6 rounded-[1rem]">
            <h2>
              👋 Привіт! Я Ігор Кузьменко, автор подкасту &quot;Душніла&quot;.
            </h2>
            <p>
              Я той, хто вірить, що глибокі питання формують сильних людей. Мій
              шлях — це постійний пошук сенсу в сучасному хаосі: через
              філософію, психологію, стоїцизм та досвід реального життя.
            </p>

            <p>
              Чому &quot;Душніла&quot;? Бо я переконаний, що втомитися від
              поверхневого — це нормально. Мої роздуми — це спроба допомогти вам
              побачити зв&apos;язки там, де їх важко знайти, і дати новий ракурс
              для вашого особистого зростання.
            </p>

            <p>
              Кожен епізод — це частина моєї подорожі, але й, можливо, ключ до
              ваших власних відкриттів. Мене надихає ваша підтримка, ваші
              відгуки і те, що ми разом створюємо ком&apos;юніті, яке не боїться
              запитувати &quot;Чому?&quot;.
            </p>

            <h3 className="text-center mb-4">
              Людина, яка питає, — це&nbsp;людина,&nbsp;яка&nbsp;живе.
              <br />
              Запрошую вас приєднатися до&nbsp;цієї&nbsp;подорожі!
            </h3>
            <SubscribeButton radius="full" />
            <Button
              fullWidth
              color="primary"
              variant="flat"
              radius="full"
              as={Link}
              href="/episodes"
            >
              Знайти епізод по душі
              <PiArrowRightFill />
            </Button>
          </CardBody>
        </Card>
      </div>
    </Section>
  );
}
