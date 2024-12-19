import Link from "next/link";
import { getPosts } from "./utils";
import type { Metadata } from "next";
import Section from "@/components/Section";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";
import { Post } from "@/components/types";
import { formatDate } from "@/components/utils";
import { PiArrowRight } from "react-icons/pi";

export const metadata: Metadata = {
  title:
    "Блог подкасту Душніла | Душніла — подкаст і блог про філософію, психологію та самоаналіз.",
  description:
    "Ознайомся з блогом подкасту Душніла. Психологія, філософія, самоаналіз та життєві історії.",
  alternates: {
    canonical: `https://dushni.la/blog`,
  },
  openGraph: {
    type: "website",
    url: "https://dushni.la/blog",
    title:
      "Блог подкасту Душніла | Душніла — подкаст і блог про філософію, психологію та самоаналіз.",
    description:
      "Ознайомся з блогом подкасту Душніла. Психологія, філософія, самоаналіз та життєві історії.",
    images: [
      {
        url: "https://dushni.la/og_image.png",
        alt: "Обкладинка подкасту Душніла",
      },
    ],
  },
};

const PostItem = ({ post }: { post: Post }) => {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="w-full md:w-[30rem] bg-background fg-foreground md:hover:scale-110">
        <CardHeader className="flex-col items-start pb-0">
          <div
            className="rounded-[0.65rem] h-[20rem] w-full bg-default-50 text-default-900 bg-cover bg-center flex flex-col justify-end text-white"
            style={{
              backgroundImage: `url(${post.cover})`,
            }}
          >
            <div className="p-4 rounded-[0.75rem] backdrop-blur-sm bg-zinc-900/20">
              <h1 className="text-3xl leading-1">{post.title}</h1>
              <small>
                {formatDate(
                  post.properties["Дата публікації"].date.start || "",
                )}
                , Ігор Кузьменко
              </small>
            </div>
          </div>
        </CardHeader>
        <CardBody className="px-4">
          <p className="text-lg leading-[1.75rem]">
            {post.properties.Опис.rich_text[0].plain_text}
          </p>
        </CardBody>
        <CardFooter>
          <Button fullWidth variant="solid" color="warning">
            Читати далі <PiArrowRight />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

const getPublishDate = (post: Post) =>
  new Date(post.properties["Дата публікації"].date.start || 0);

export default async function Blog() {
  const posts = await getPosts();

  const sortedPosts = posts.sort((a, b) => {
    return getPublishDate(b).getTime() - getPublishDate(a).getTime();
  });

  const latest = sortedPosts[0];
  const rest = sortedPosts.slice(0);

  return (
    <div className="flex flex-col gap-8 md:gap-16 w-full md:w-[61rem]">
      <div className="relative p-2 pt-6 md:p-4 lg:p-10 rounded-[1rem] shadow-lg bg-gradient-to-b from-yellow-500 dark:from-warning-100 to-yellow-900 dark:to-warning-900 text-white mt-4 self-center w-full md:w-[40rem] lg:w-[61rem]">
        <Section
          title="Новий допис"
          subtitle="Свіжі думки з пилу з жару, які ще не встигли охолонути."
        >
          <div className="flex flex-col gap-[4rem] items-center">
            <PostItem post={latest} />
          </div>
        </Section>
        <Image
          alt=""
          src="/column_0.png"
          classNames={{
            wrapper:
              "hidden md:block absolute right-[-30px] bottom-[-30px] rotate-[10deg] w-[160px]",
          }}
        />
        <Image
          alt=""
          src="/column_1.png"
          classNames={{
            wrapper:
              "hidden md:block absolute left-[-100px] top-[30px] rotate-[-10deg] w-[200px]",
          }}
        />
      </div>
      <Section
        title="Всі дописи"
        titleH1
        subtitle="Знання не мають терміну придатності. Тут зібрані всі дописи, які змушували думати, дивуватися та переглядати свої погляди. Не пропусти те, що може змінити твоє уявлення про світ."
      >
        <div className="p-2 md:p-4 lg:p-10 flex flex-1 flex-col gap-4 md:gap-[4rem] w-full md:w-[50rem] self-center items-center">
          {rest.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      </Section>
    </div>
  );
}
