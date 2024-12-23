import { getPosts } from "./utils";
import type { Metadata } from "next";
import Section from "@/components/Section";
import { Image } from "@nextui-org/react";
import PostItem from "@/components/PostItem";

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

export default async function Blog() {
  const posts = await getPosts();

  const latest = posts[0];
  const rest = posts.slice(0);

  return (
    <div className="flex flex-col gap-8 md:gap-16 w-full md:w-[61rem]">
      <div className=" relative p-2 pt-6 md:p-4 lg:p-10 rounded-[1rem] shadow-lg bg-gradient-to-b from-yellow-500 dark:from-warning-100 to-yellow-900 dark:to-warning-900 text-white mt-4 self-center w-full md:w-[40rem] lg:w-[61rem]">
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
        <div className="columns-1 lg:columns-2 self-center">
          {rest.map((post) => (
            <div key={post.id} className="mb-[1rem]">
              <PostItem post={post} />
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
