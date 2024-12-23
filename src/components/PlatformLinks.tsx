"use client";

import { Button } from "@nextui-org/react";
import PlatformIcon from "./PlatformIcon";
import { Platform } from "./types";
import { useAnalytics } from "./AnalyticsProvider";

const PLATFORM_NAMES: Record<Platform, string> = {
  apple: "Apple Podcasts",
  spotify: "Spotify",
  youtube: "YouTube",
  patreon: "Patreon",
  castbox: "CastBox",
  pocketcasts: "Pocket Casts",
  telegram: "Telegram",
  monobank: "Monobank",
};

const PLATFORM_LINKS: Record<Platform, string> = {
  apple: "https://podcasts.apple.com/ua/podcast/душніла/id1592740343?i=",
  spotify: "https://open.spotify.com/show/2MbpdcWZl19Fm6akAP89Sa",
  youtube:
    "https://www.youtube.com/playlist?list=PLraWTkDIObR4Spc5kY70gne7-bQync2wd",
  patreon: "https://patreon.com/dushnila",
  castbox:
    "https://castbox.fm/channel/%D0%94%D1%83%D1%88%D0%BD%D1%96%D0%BB%D0%B0-id4647098",
  pocketcasts:
    "https://play.pocketcasts.com/podcasts/share?id=ec9b4490-1b13-013a-d5bc-0acc26574db2",
  telegram: "https://t.me/dushnila_podcast",
  monobank: "https://send.monobank.ua/jar/8BYUJvieig",
};

interface Props {
  hideLabels?: boolean;
}

export const PlatformLink: React.FC<Props & { platform: Platform }> = ({
  hideLabels,
  platform: p,
}) => {
  const analytics = useAnalytics();
  return (
    <Button
      key={p}
      radius="full"
      className="bg-gradient-to-tr from-default-50 to-default-200 shadow-lg cursor-pointer"
      as={"a"}
      href={PLATFORM_LINKS[p]}
      target="_blank"
      isIconOnly={hideLabels}
      onPress={() =>
        analytics.trackEvent("Platform Link Pressed", 1, { platform: p })
      }
    >
      <PlatformIcon platform={p} size="2xl" />
      {!hideLabels && PLATFORM_NAMES[p]}
    </Button>
  );
};

const PlatformLinks: React.FC<Props> = ({ hideLabels }) => (
  <>
    {(Object.keys(PLATFORM_LINKS) as Platform[]).map((p) => (
      <PlatformLink platform={p} key={p} hideLabels={hideLabels} />
    ))}
  </>
);

export default PlatformLinks;
