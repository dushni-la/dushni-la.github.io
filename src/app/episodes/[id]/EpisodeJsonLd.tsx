import { JsonLdDocument } from "jsonld";
import { getEpisode } from "../utils";
import { formatDate, formatTimeISO8601Duration } from "@/components/utils";

export default async function EpisodeJsonLd({ id }: { id: string }) {
  const episode = await getEpisode(id);

  const jsonLd: JsonLdDocument = {
    "@context": "https://schema.org/",
    "@type": "PodcastEpisode",
    url: `https://dushni.la/episodes/${id}`,
    name: `#${episode.episode}: ${episode.title}`,
    datePublished: formatDate(episode.pub_date),
    timeRequired: formatTimeISO8601Duration(+episode.duration),
    description: episode.summary.split("Support the show")[0],
    associatedMedia: {
      "@type": "MediaObject",
      contentUrl: episode.audio_url,
    },
    author: {
      "@type": "Person",
      givenName: "Ігор",
      familyName: "Кузьменко",
    },
    partOfSeries: {
      "@type": "PodcastSeries",
      name: "Душніла",
      url: "https://dushni.la",
    },
  };

  return (
    <section>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
