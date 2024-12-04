import fs from "fs/promises";
import path from "path";
import { Metadata } from "next";

interface Episode {
  guid: string;
  title: string;
  author: string;
  summary: string;
  description: string;
  pub_date: string;
  audio_url: string;
  duration: string;
}

async function getEpisode(id: string): Promise<Episode> {
  const filePath = path.join(process.cwd(), "output", `${id}.json`);
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

// SEO Metadata for the episode
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const episode = await getEpisode(params.id);
  return {
    title: episode.title,
    description: episode.summary,
    openGraph: {
      title: episode.title,
      description: episode.summary,
      type: "article",
      url: `/episodes/${params.id}`,
    },
    twitter: {
      card: "summary",
      title: episode.title,
      description: episode.summary,
    },
  };
}

export default async function EpisodePage({ params }: { params: { id: string } }) {
  const episode = await getEpisode(params.id);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>{episode.title}</h1>
      <p>
        <strong>Author:</strong> {episode.author}
      </p>
      <p>
        <strong>Published:</strong> {new Date(episode.pub_date).toLocaleDateString()}
      </p>
      <p>
        <strong>Duration:</strong> {Math.floor(parseInt(episode.duration) / 60)} minutes
      </p>
      <p>
        <strong>Summary:</strong> {episode.summary}
      </p>
        <div dangerouslySetInnerHTML={{__html:episode.description}}>
        </div>
      <audio controls>
        <source src={episode.audio_url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

