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
  telegram_id?: string;
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
  | "youtube"
  | "monobank";

export interface Feedback {
  username: string;
  title?: string;
  text: string;
  platform: Platform;
  stars: 4 | 5;
  date?: string;
}

// Notion post structure

interface User {
  object: "user";
  id: string;
}

interface ParentDatabase {
  type: "database_id";
  database_id: string;
}

interface PropertyLastEditedTime {
  id: string;
  type: "last_edited_time";
  last_edited_time: string; // ISO date string
}

interface PropertyCheckbox {
  id: string;
  type: "checkbox";
  checkbox: boolean;
}

interface TextContent {
  content: string;
  link: string | null;
}

interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string; // could be more specific if there are known values for colors
}

interface Text {
  type: "text";
  text: TextContent;
  annotations: Annotations;
  plain_text: string;
  href: string | null;
}

interface PropertyTitle {
  id: string;
  type: "title";
  title: Text[];
}

interface PropertyUrl {
  id: string;
  type: "url";
  url: string;
}

interface PropertyText {
  id: string;
  type: "rich_text";
  rich_text: Text[];
}

interface Properties {
  Telegram: PropertyUrl;
  Назва: PropertyTitle;
  Опис: PropertyText;
  Опубліковано: PropertyCheckbox;
  Редагувалось: PropertyLastEditedTime;
}

interface Content {
  parent: string;
}

export interface Post {
  object: "page";
  id: string;
  created_time: string; // ISO date string
  last_edited_time: string; // ISO date string
  created_by: User;
  last_edited_by: User;
  cover: string | null;
  icon: null; // Assuming it's always null unless additional info is provided
  parent: ParentDatabase;
  archived: boolean;
  in_trash: boolean;
  properties: Properties;
  title: string;
  url: string;
  public_url: string | null;
  content: Content;
  slug: string;
}
