import slugify from "slugify";
import { getEpisode, getEpisodes } from "../../utils";
import EpisodeJsonLd from "../EpisodeJsonLd";
import EpisodeView from "../EpisodeView";

// SEO Metadata for the episode
export { generateMetadata } from "../generateMetadata";

export async function generateStaticParams() {
  const episodes = await getEpisodes();

  return episodes.map((e) => ({
    id: e.guid,
    slug: slugify(e.title, {
      lower: true,
      strict: true,
      locale: "uk",
    }),
  }));
}

export default async function EpisodeWithSlugPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const episode = await getEpisode(id);

  return (
    <>
      <EpisodeView episode={episode} />
      <EpisodeJsonLd id={id} />
    </>
  );
}
