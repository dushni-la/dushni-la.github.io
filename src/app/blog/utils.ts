import { Post } from "@/components/types";
import { readdir, readFile } from "node:fs/promises";
import { join } from "path";

const DIR = "posts";

export async function getPost(slug: string): Promise<Post> {
  const filePath = join(process.cwd(), DIR, `${slug}.json`);
  const data = await readFile(filePath, "utf-8");
  return JSON.parse(data);
}

export async function getPosts(): Promise<Post[]> {
  const folder = await readdir(join(process.cwd(), DIR));

  const posts = await Promise.all(
    folder.map(async (filename) => await getPost(filename.split(".")[0])),
  );

  return posts;
}
