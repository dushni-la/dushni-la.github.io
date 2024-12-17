const API_KEY = "";
const PODCAST_ID = "1879550";

const createRequest = (
  method: "GET" | "POST" | "PUT",
  subpath?: string,
  data?: unknown,
) =>
  fetch(`https://www.buzzsprout.com/api/${PODCAST_ID}/${subpath}.json`, {
    method,
    headers: {
      Authorization: `Token token=${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((e) => {
      console.log(e);
    });

async function fetchEpisodes() {
  const result = await createRequest("GET", "episodes");

  console.log(
    result
      .filter(
        (episode: { guid: string; custom_url: string }) =>
          episode.custom_url === "",
      )
      .map((episode: { guid: string; custom_url: string }) => episode.guid),
  );

  console.log("Updated");
}

fetchEpisodes();
