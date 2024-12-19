import { Client, isFullPage } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { join, extname } from "node:path";
import slugify from "slugify";
import { MdBlock } from "notion-to-md/build/types";

const databaseId = process.env.NOTION_DATABASE_ID as string;
const outputDir = "posts";

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

      // Step 2: Get the file extension from the image URL
      const fileExtension = getFileExtension(imageUrl);

      // Step 3: Generate the local path for the image
      const localImagePath = `/public/blog/${slug}/${block.blockId}.${fileExtension}`;
      const absoluteImagePath = join(process.cwd(), localImagePath);

      // Step 4: Download the image and save it locally
      await downloadImage(imageUrl, absoluteImagePath);

      // Step 5: Replace the parent path with the new relative path
      block.parent = `![${alt}](${localImagePath.replace("/public", "")})`;
    }

    // Recursively process child blocks if they exist
    if (block.children.length > 0) {
      block.children = await processBlocks(block.children, slug);
    }
  }
  return content;
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

(async () => {
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
          coverUrl = result.cover.external.url;
          break;
        }
        case "file": {
          const imageUrl = result.cover.file.url;
          const ext = getFileExtension(result.cover.file.url);
          const localImagePath = `/public/blog/${slug}/cover.${ext}`;
          const absoluteImagePath = join(process.cwd(), localImagePath);
          await downloadImage(imageUrl, absoluteImagePath);
          coverUrl = localImagePath.replace("/public", "");
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
