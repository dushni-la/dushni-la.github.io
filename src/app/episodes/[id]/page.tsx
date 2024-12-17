import { getEpisode, getEpisodes } from "../utils";
import EpisodeJsonLd from "./EpisodeJsonLd";
import EpisodeView from "./EpisodeView";
import Redirect from "@/app/latest/redirect";
import { getSlug } from "@/components/utils";

// SEO Metadata for the episode
export { generateMetadata } from "./generateMetadata";

export async function generateStaticParams() {
  const episodes = await getEpisodes();

  return episodes.map((e) => ({
    id: e.guid,
  }));
}

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ id: string; slug?: string }>;
}) {
  const { id } = await params;
  const episode = await getEpisode(id);

  return (
    <>
      <Redirect id={+id} slug={getSlug(episode.title)} />
      <EpisodeView episode={episode} />
      <EpisodeJsonLd id={id} />
    </>
  );
}
