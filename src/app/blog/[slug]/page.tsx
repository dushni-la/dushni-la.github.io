import Markdown from "react-markdown";
import { getPost, getPostFromCache, getPosts } from "../utils";
import TelegramComments from "@/app/episodes/[id]/TelegramComments";
import { Divider, Image } from "@nextui-org/react";
import { formatDate } from "@/components/utils";
import rehypeUnwrapImages from "rehype-unwrap-images";
import rehypeRaw from "rehype-raw";
import SharePanel from "@/components/SharePanel";
import PostJsonLd from "./PostJsonLd";
import { Metadata } from "next";
import { BASE_URL } from "@/constants";
import EpisodeItem from "@/components/EpisodeItem";
import { getEpisodeFromCache } from "@/app/episodes/utils";
import PostItem from "@/components/PostItem";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  const img = post.cover
    ? post.cover.startsWith("/")
      ? `${BASE_URL}${post.cover}`
      : post.cover
    : undefined;
  const description = post.properties.Опис.rich_text[0].plain_text;

  return {
    title: `${post.title} — Душніла: філософія, психологія, самоаналіз`,
    description,
    alternates: {
      canonical: `${BASE_URL}/blog/${slug}`,
    },
    openGraph: {
      title: `${post.title} — Душніла: філософія, психологія, самоаналіз`,
      description,
      type: "article",
      url: `${BASE_URL}/blog/${slug}`,
      images: [
        {
          url: img || "https://dushni.la/og_image.png",
          alt: `Обкладинка епізоду ${post.title}`,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: `${post.title} — Душніла: філософія, психологія, самоаналіз`,
      description,
      images: [
        {
          url: img || "https://dushni.la/og_image.png",
          alt: `Обкладинка епізоду ${post.title}`,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((p) => ({
    slug: p.slug,
  }));
}

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  const img = post.cover
    ? post.cover.startsWith("/")
      ? `${BASE_URL}${post.cover}`
      : post.cover
    : undefined;

  return (
    <>
      <div className="my-[0rem] lg:my-[4rem] p-8 lg:p-0">
        <div
          className="rounded-[1rem] p-2 md:p-4 lg:p-10 min-h-[25rem] md:min-h-[30rem] bg-default-50 text-default-900 -m-[2rem] md:m-0 lg:-mx-[10.5rem] bg-cover bg-center flex flex-col justify-end text-white"
          style={{
            backgroundImage: `url(${post.cover})`,
          }}
        >
          <div className="p-2 md:p-4 lg:p-8 rounded-[0.75rem] backdrop-blur-sm bg-zinc-900/20">
            <h1 className="text-4xl md:text-5xl leading-1">{post.title}</h1>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8">
              <small>
                {formatDate(
                  post.properties["Дата публікації"].date.start || "",
                )}
                , Ігор Кузьменко
              </small>
              <SharePanel
                url={`${BASE_URL}/blog/${slug}`}
                imageUrl={img || ""}
                title={`${post.title}`}
                text="Гадаю, вам сподобається цей допис."
                variant="solid"
                color="warning"
              />
            </div>
          </div>
        </div>
        <Markdown
          className="my-[4rem]"
          rehypePlugins={[rehypeUnwrapImages, rehypeRaw]}
          components={{
            p: (props) => (
              <p
                className="leading-[2rem] md:leading-[2.5rem] mb-3 text-lg md:text-xl"
                {...props}
              />
            ),
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            hr: ({ ref, ...props }) => (
              <Divider className="h-1 my-[2rem]" {...props} />
            ),
            h1: (props) => (
              <h1
                className="leading-[2rem] md:leading-[3rem] text-4xl mt-[2rem] mb-[0.75rem]"
                {...props}
              />
            ),
            h2: (props) => (
              <h2
                className="leading-[2rem] md:leading-[3rem] text-3xl mt-[2rem] mb-[0.75rem]"
                {...props}
              />
            ),
            h3: (props) => (
              <h3
                className="leading-[2rem] md:leading-[3rem] text-2xl mt-[2rem] mb-[0.75rem]"
                {...props}
              />
            ),
            h4: (props) => (
              <h4
                className="leading-[2rem] md:leading-[3rem] text-xl mt-[2rem] mb-[0.75rem]"
                {...props}
              />
            ),
            blockquote: ({ children }) => (
              <blockquote className="bg-primary-100 py-4 pb-2 px-8 rounded-[1rem] my-4">
                {children}
              </blockquote>
            ),
            ul: (props) => (
              <ul
                className="list-disc list-inside mb-3 ml-0 md:ml-2 lg:ml-4"
                {...props}
              />
            ),
            ol: (props) => (
              <ol
                className="list-decimal list-inside mb-3 ml-0 md:ml-2 lg:ml-4"
                {...props}
              />
            ),
            li: (props) => (
              <li
                className="leading-[1.5rem] md:leading-[2rem] mb-1 text-lg md:text-xl"
                {...props}
              />
            ),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            figure: (props: any) => {
              if (props["data-episode-id"]) {
                const episode = getEpisodeFromCache(props["data-episode-id"]);
                if (episode) {
                  return (
                    <div className="my-[3rem] w-full flex flex-col justify-center gap-2">
                      <EpisodeItem data={episode} />
                      <small>{props["data-caption"] || episode.title}</small>
                    </div>
                  );
                }
              }
              if (props["data-post-slug"]) {
                const post = getPostFromCache(props["data-post-slug"]);
                console.log(props["data-post-slug"]);
                if (post) {
                  return (
                    <div className="my-[3rem] w-full flex flex-col justify-center gap-2">
                      <PostItem post={post} />
                      <small>{props["data-caption"] || post.title}</small>
                    </div>
                  );
                }
              }
              return <figure {...props} />;
            },
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            img: ({ ref: _ref, onError: _onError, ...props }) => (
              <div className="my-[3rem] w-full flex justify-center">
                <div className="">
                  <Image
                    isBlurred
                    className="mb-2 max-h-[30rem]"
                    alt={props.alt || ""}
                    {...props}
                  />
                  <small>{props.alt}</small>
                </div>
              </div>
            ),
          }}
        >
          {post.content.parent}
        </Markdown>
        {post.related_episodes && (
          <div className="mb-8">
            <Divider />
            <h3 className="text-2xl mb-4">Для тих, хто хоче копнути глибше</h3>
            <div>
              {post.related_episodes.map((e) => (
                <div key={e.guid} className="mb-4">
                  <EpisodeItem data={e} />
                </div>
              ))}
            </div>
          </div>
        )}
        {post.properties.Telegram.url && (
          <>
            <Divider />
            <h3 className="text-2xl mb-4">Обговорення</h3>
            <TelegramComments id={post.properties.Telegram.url} />
          </>
        )}
        <Divider />
        <div className="flex flex-1 mt-4">
          <SharePanel
            url={`${BASE_URL}/blog/${slug}`}
            imageUrl={img || ""}
            title={`${post.title}`}
            text="Гадаю, вам сподобається цей допис."
            className="w-full"
            fullWidth
            size="lg"
          />
        </div>
      </div>
      <PostJsonLd slug={slug} />
    </>
  );
}
