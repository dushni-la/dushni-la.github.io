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
