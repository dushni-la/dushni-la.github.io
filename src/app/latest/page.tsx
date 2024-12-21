import Redirect from "./redirect";
import { getEpisodes } from "../episodes/utils";
import Head from "next/head";
import { getSlug } from "@/components/utils";

export default async function LatestRedirect() {
  const episodes = await getEpisodes();

  const sortedEpisodes = episodes.sort((a, b) => {
    return new Date(b.pub_date).getTime() - new Date(a.pub_date).getTime();
  });

  const latest = sortedEpisodes[0];

  const slug = getSlug(latest.title);

  return (
    <>
      <Head>
        <link
          rel="canonical"
          href={`https://dushni.la/episodes/${latest.guid}`}
          key="canonical"
        />
      </Head>
      <Redirect id={+latest.guid} slug={slug} />
    </>
  );
}
