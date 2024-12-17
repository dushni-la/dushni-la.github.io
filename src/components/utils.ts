import slugify from "slugify";

export const formatTime = (seconds?: number | null): string => {
  // Ensure seconds is a valid number
  if (!seconds || seconds === null || isNaN(seconds) || seconds < 0) {
    return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  // Pad minutes and seconds with leading zeros if needed
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
};

export const formatTimeISO8601Duration = (seconds?: number | null): string => {
  // Ensure seconds is a valid number
  if (!seconds || seconds === null || isNaN(seconds) || seconds < 0) {
    return "PT0M";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  // Pad minutes and seconds with leading zeros if needed
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `PT${formattedMinutes}M${formattedSeconds}S`;
};

export function formatDate(input: string): string {
  const date = new Date(input);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getSlug(input: string): string {
  return slugify(input, {
    lower: true,
    strict: true,
    locale: "uk",
  });
}
