import { parseStringPromise } from "xml2js";
import path from "path";
import { Client, isFullPage } from "@notionhq/client";
import { mkdir, stat, readFile, access } from "node:fs/promises";

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// Function to fetch RSS feed from URL
async function fetchRSSFeed(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch RSS feed: ${response.statusText}`);
  }
  return await response.text();
}

// Function to check if a file exists
async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}
// Function to read and parse an existing JSON file
async function readJsonFile(filePath: string): Promise<any> {
  try {
    const content = await readFile(filePath, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error reading JSON file ${filePath}:`, error);
    return null;
  }
}

// Function to fetch Notion database and find matching pages
async function fetchNotionData(databaseId: string) {
  try {
    const pages = await notion.databases.query({
      database_id: databaseId,
    });

    // Process and return a map of episode IDs to their associated data
    const episodeMap = new Map();

    for (const page of pages.results.filter(isFullPage)) {
      // Extract the Buzzsprout ID from properties
      // Assuming there's a property for Buzzsprout ID in your Notion database
      const buzzsproutIdProp = page.properties["Buzzsprout ID"];
      const youtubeIdProp = page.properties["YouTube URL"];
      const telegramIdProp = page.properties["Telegram URL"];

      // Extract values based on property types
      let buzzsproutId = "";
      let youtubeId = "";
      let telegramId = "";

      // This will need adjustment based on your actual property types in Notion
      if (
        buzzsproutIdProp?.type === "rich_text" &&
        buzzsproutIdProp.rich_text.length > 0
      ) {
        buzzsproutId = buzzsproutIdProp.rich_text[0].plain_text;
      } else if (buzzsproutIdProp?.type === "number") {
        buzzsproutId = String(buzzsproutIdProp.number);
      }

      if (youtubeIdProp?.type === "url" && youtubeIdProp.url) {
        youtubeId = youtubeIdProp.url;
      }

      if (telegramIdProp?.type === "url" && telegramIdProp.url) {
        telegramId = telegramIdProp.url;
      } else if (telegramIdProp?.type === "number") {
        telegramId = String(telegramIdProp.number);
      }

      if (buzzsproutId) {
        episodeMap.set(buzzsproutId, {
          youtube_id: youtubeId.split("/")?.pop(),
          telegram_id: telegramId,
        });
      }
    }

    return episodeMap;
  } catch (error) {
    console.error("Error fetching Notion data:", error);
    return new Map();
  }
}

// Function to check if an existing file already has valid YouTube and Telegram IDs
async function hasValidIds(filePath: string): Promise<boolean> {
  if (!(await fileExists(filePath))) {
    return false;
  }

  const existingData = await readJsonFile(filePath);
  if (!existingData) {
    return false;
  }

  // Check if both IDs exist and are not empty
  return (
    existingData.youtube_id ||
    existingData.telegram_id ||
    existingData.youtube_id === "" ||
    existingData.telegram_id === ""
    // existingData.youtube_id.trim() !== "" &&
    // existingData.telegram_id.trim() !== ""
  );
}

// Function to parse RSS feed
async function parseRSS(
  rssUrl: string,
  outputDir: string,
  notionDatabaseId: string,
) {
  try {
    // Create output directory if it doesn't exist
    await mkdir(outputDir, { recursive: true });

    // Fetch RSS content in memory
    console.log(`Fetching RSS feed from ${rssUrl}...`);
    const rssContent = await fetchRSSFeed(rssUrl);

    // Parse XML to JavaScript object
    const parsed = await parseStringPromise(rssContent);

    // Fetch Notion data
    console.log(`Fetching data from Notion database ${notionDatabaseId}...`);
    const notionData = await fetchNotionData(notionDatabaseId);

    // Ensure the structure is as expected
    const items = parsed?.rss?.channel[0]?.item;
    if (!items) {
      throw new Error("No <item> elements found in the RSS feed.");
    }

    console.log(`Found ${items.length} episodes in RSS feed`);

    // Process each <item>
    const processedItems = [];
    let skippedCount = 0;
    let updatedCount = 0;

    for (const item of items) {
      const guid = item.guid[0]._.split("-").pop(); // Extract GUID suffix
      const outputFilePath = path.join(outputDir, `${guid}.json`);

      // Check if the file already exists with valid IDs
      if (await hasValidIds(outputFilePath)) {
        // Get existing file data
        const existingData = await readJsonFile(outputFilePath);
        processedItems.push(existingData);
        skippedCount++;
        console.log(
          `Skipped: ${outputFilePath} (already has YouTube and Telegram IDs)`,
        );
        continue;
      }

      // If we got here, either the file doesn't exist or it doesn't have valid IDs
      const title = item.title[0];
      const author = item["itunes:author"]?.[0] ?? "";
      const summary = item["itunes:summary"]?.[0] ?? "";
      const description = item.description?.[0] ?? "";
      const pubDate = item.pubDate?.[0];
      const enclosure = item.enclosure?.[0]?.["$"]?.url ?? "";
      const duration = item["itunes:duration"]?.[0] ?? "";
      const image = item["itunes:image"]?.[0]?.["$"]?.href ?? "";
      const episode = item["itunes:episode"]?.[0] ?? "";

      // Look up additional data from Notion
      const additionalData = notionData.get(guid) || {
        youtube_id: "",
        telegram_id: "",
      };

      // Construct JSON object
      const data = {
        guid,
        title,
        author,
        summary,
        description,
        pub_date: pubDate,
        audio_url: enclosure,
        duration,
        image,
        episode,
        youtube_id: additionalData.youtube_id,
        telegram_id: additionalData.telegram_id,
      };

      processedItems.push(data);

      // Write JSON file
      await Bun.write(outputFilePath, JSON.stringify(data, null, 2));
      updatedCount++;
      console.log(`Created/Updated: ${outputFilePath}`);
    }

    console.log(
      `Episodes processed: ${processedItems.length} (Updated: ${updatedCount}, Skipped: ${skippedCount})`,
    );

    return processedItems;
  } catch (error) {
    console.error("Error parsing RSS feed:", error);
    return [];
  }
}

// Main script
//
// parseRSS(rssFilePath, outputDir).then(() => {
//   console.log("RSS feed processing completed.");
// });

const rssUrl =
  process.env.RSS_URL || "https://feeds.buzzsprout.com/1879550.rss";
const outputDir = process.env.OUTPUT_DIR || "output";
const notionDatabaseId = process.env.NOTION_EPISODES_DATABASE_ID;

if (!notionDatabaseId) {
  console.error(
    "Error: NOTION_EPISODES_DATABASE_ID environment variable is required",
  );
  process.exit(1);
}

console.log("Starting RSS feed processing...");
const episodes = await parseRSS(rssUrl, outputDir, notionDatabaseId);
console.log(
  `RSS feed processing completed. Processed ${episodes.length} episodes.`,
);
