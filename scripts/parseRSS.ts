import { parseStringPromise } from "xml2js";
import path from "path";

// Function to parse RSS feed
async function parseRSS(rssFilePath: string, outputDir: string) {
  try {
    const file = Bun.file(rssFilePath);
    // Read RSS file
    const rssContent = await file.text();

    // Parse XML to JavaScript object
    const parsed = await parseStringPromise(rssContent);

    // Ensure the structure is as expected
    const items = parsed?.rss?.channel[0]?.item;
    if (!items) {
      throw new Error("No <item> elements found in the RSS feed.");
    }

    // Process each <item>
    for (const item of items) {
      const guid = item.guid[0]._.split("-").pop(); // Extract GUID suffix
      const title = item.title[0];
      const author = item["itunes:author"]?.[0] ?? "";
      const summary = item["itunes:summary"]?.[0] ?? "";
      const description = item.description?.[0] ?? "";
      const pubDate = item.pubDate?.[0];
      const enclosure = item.enclosure?.[0]?.["$"]?.url ?? "";
      const duration = item["itunes:duration"]?.[0] ?? "";
      const image = item["itunes:image"]?.[0]?.["$"]?.href ?? "";
      const episode = item["itunes:episode"]?.[0] ?? "";

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
      };

      // Write JSON file
      const outputFilePath = path.join(outputDir, `${guid}.json`);
      await Bun.write(outputFilePath, JSON.stringify(data, null, 2));
      console.log(`Created: ${outputFilePath}`);
    }
  } catch (error) {
    console.error("Error parsing RSS feed:", error);
  }
}

// Main script
const rssFilePath = "rss_feed.xml"; // Path to your RSS feed file
const outputDir = "output"; // Output directory for JSON files

parseRSS(rssFilePath, outputDir).then(() => {
  console.log("RSS feed processing completed.");
});
