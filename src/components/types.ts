export interface Episode {
  guid: string;
  title: string;
  author: string;
  summary: string;
  description: string;
  pub_date: string;
  audio_url: string;
  duration: string;
  episode: string;
  image?: string;
  youtube_id?: string;
  telegram_message_id?: string;
  latest?: boolean;
  hot?: boolean;
}

export type Platform =
  | "apple"
  | "telegram"
  | "spotify"
  | "patreon"
  | "castbox"
  | "pocketcasts"
  | "youtube";

export interface Feedback {
  username: string;
  title?: string;
  text: string;
  platform: Platform;
  stars: 4 | 5;
  date?: string;
}
