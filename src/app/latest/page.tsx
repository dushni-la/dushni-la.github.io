import { readdir } from "node:fs/promises";
import path from "node:path";
import Redirect from "./redirect";

export default async function LatestRedirect() {
  const folder = await readdir(path.join(process.cwd(), "output"));

  const episode = (
    await Promise.all(folder.map(async (id) => +id.split(".")[0]))
  ).sort()[0];

  return <Redirect id={episode} />;
}
