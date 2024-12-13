import {
  PiApplePodcastsLogoFill,
  PiPatreonLogoFill,
  PiSpotifyLogoFill,
  PiTipJarFill,
  PiYoutubeLogoFill,
} from "react-icons/pi";
import { SiCastbox, SiPocketcasts, SiTelegram } from "react-icons/si";
import { Platform } from "./types";

interface Props {
  platform: Platform;
  size: string;
}

const PLATFORM_TO_COLOR: Record<Props["platform"], string> = {
  apple: "#9124ca",
  spotify: "#1DB954",
  patreon: "black",
  telegram: "#24a9e9",
  castbox: "#ff6222",
  pocketcasts: "#F43E37",
  youtube: "red",
  monobank: "#ffde58",
};

const PLATFORM_TO_ICON: Record<Props["platform"], React.ReactNode> = {
  apple: <PiApplePodcastsLogoFill />,
  patreon: <PiPatreonLogoFill />,
  spotify: <PiSpotifyLogoFill />,
  telegram: <SiTelegram />,
  castbox: <SiCastbox />,
  pocketcasts: <SiPocketcasts />,
  youtube: <PiYoutubeLogoFill />,
  monobank: <PiTipJarFill />,
};

const PlatformIcon: React.FC<Props> = ({ platform, size }) => (
  <span
    className={`text-${size}`}
    style={{
      color: PLATFORM_TO_COLOR[platform],
    }}
  >
    {PLATFORM_TO_ICON[platform]}
  </span>
);

export default PlatformIcon;
