import { Client, isFullPage } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { join, extname } from "node:path";
import slugify from "slugify";
import { MdBlock } from "notion-to-md/build/types";
import { rm } from "node:fs/promises";

const databaseId = process.env.NOTION_DATABASE_ID as string;
const outputDir = "posts";
const outputImgDir = "public/blog";

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// passing notion client to the option
const n2m = new NotionToMarkdown({ notionClient: notion });

async function processBlocks(content: MdBlock[], slug: string) {
  for (const block of content) {
    if (block.type === "image") {
      // Step 1: Extract the image URL from the parent property
      const [alt, imageUrl] = extractImageUrl(block.parent);
      if (!imageUrl) continue;

      const localImage = await processImage(imageUrl, slug);

      // Step 5: Replace the parent path with the new relative path
      block.parent = `![${alt}](${localImage})`;
    }

    if (block.type === "video") {
      block.parent = convertToIframe(block.parent);
    }

    // Recursively process child blocks if they exist
    if (block.children.length > 0) {
      block.children = await processBlocks(block.children, slug);
    }
  }
  return content;
}

function convertToIframe(input: string): string {
  const regex =
    /\[(.+?)\]\((https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+))\)/;
  const match = input.match(regex);

  if (!match) {
    throw new Error("Invalid input format");
  }

  const alt = match[1]; // Extract the alt text
  const url = match[3]; // Extract the YouTube video ID

  return `
<div className="my-[3rem] w-full flex flex-col justify-center">
  <div className="relative overflow-hidden w-full pt-[56.25%] rounded-xl shadow-lg self-center mb-2">
    <iframe
      className="absolute top-0 left-0 right-0 bottom-0 w-full h-full"
      src="https://www.youtube.com/embed/${url}?"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  </div>
  <small>${alt}</small>
</div>
  `;
}

/**
 * Extracts the image URL from the markdown syntax inside the `parent` string.
 * Example: ![alt](https://example.com/image.png)
 */
function extractImageUrl(parent: string): (string | null)[] {
  const alt = parent.match(/^!\[(.*)\]\(/);
  const match = parent.match(/\((https?:\/\/[^\)]+)\)/);
  return match ? [alt ? alt[1] : "", match[1]] : [null, null];
}

/**
 * Extracts the file extension from the image URL.
 */
function getFileExtension(url: string): string {
  const urlPath = new URL(url).pathname;
  console.log(url, urlPath);
  return extname(urlPath).substring(1); // Remove the leading dot
}

/**
 * Downloads an image from the provided URL and saves it to the specified path.
 */
async function downloadImage(url: string, outputFilePath: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to download image from ${url}: ${response.statusText}`,
      );
    }

    const buffer = await response.arrayBuffer();

    await Bun.write(outputFilePath, buffer);
    console.log(`Image saved to: ${outputFilePath}`);
  } catch (error) {
    console.error(`Failed to download image from ${url}:`, error);
  }
}

function getFileName(imageUrl: string) {
  const fileName = imageUrl.split("?")[0].split("/").reverse()[0];
  const ext = getFileExtension(imageUrl);
  if (ext) {
    return fileName.split(".").slice(0, -1);
  }
  return fileName;
}

async function processImage(imageUrl: string, slug: string) {
  const fileName = getFileName(imageUrl);
  let ext = getFileExtension(imageUrl) || "jpg";
  if (ext === "") {
    if (imageUrl.includes("unsplash")) {
      const match = imageUrl.match(/fm=(\w+)/);
      ext = match?.[1] || "jpg";
    }
  }
  const localImagePath = `/public/blog/${slug}/${fileName}.${ext}`;
  const absoluteImagePath = join(process.cwd(), localImagePath);
  await downloadImage(imageUrl, absoluteImagePath);
  return localImagePath.replace("/public", "");
}

(async () => {
  await Promise.all(
    [outputDir, outputImgDir].map((dir) =>
      rm(dir, { recursive: true, force: true }),
    ),
  );

  console.log("Cleared previous blog data");

  const pages = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Опубліковано",
      checkbox: {
        equals: true,
      },
    },
    sorts: [{ property: "Редагувалось", direction: "descending" }],
  });

  const posts = await Promise.all(
    pages.results.filter(isFullPage).map(async (result) => {
      const mdblocks = await n2m.pageToMarkdown(result.id);

      const titleProp = result.properties["Назва"];

      let title = "";
      switch (titleProp.type) {
        case "title":
          title = titleProp.title[0].plain_text;
      }

      const slug = slugify(title, {
        lower: true,
        strict: true,
        locale: "uk",
      });

      let coverUrl: string | null = null;
      switch (result.cover?.type) {
        case "external": {
          coverUrl = await processImage(result.cover.external.url, slug);
          break;
        }
        case "file": {
          coverUrl = await processImage(result.cover.file.url, slug);
          break;
        }
      }

      const processedBlocks = await processBlocks(mdblocks, slug);

      const mdString = n2m.toMarkdownString(processedBlocks);

      const post = {
        ...result,
        cover: coverUrl,
        content: mdString,
        title,
        slug,
      };

      return post;
    }),
  );

  await Promise.all(
    posts.map(async (post) => {
      const outputFilePath = join(outputDir, `${post.slug}.json`);
      await Bun.write(outputFilePath, JSON.stringify(post, null, 2));
    }),
  );

  console.log("Fetched all posts");
})();
