import { Button, Image } from "@nextui-org/react";
import React from "react";
import {
  PiApplePodcastsLogoFill,
  PiPatreonLogoFill,
  PiSpotifyLogoFill,
  PiYoutubeLogoFill,
} from "react-icons/pi";
import { SiCastbox, SiPocketcasts } from "react-icons/si";

const Header = () => {
  return (
    <header className="fixed min-h-screen flex w-[28rem] p-10 bg-default-50 items-center flex-col gap-8 lg:border-x lg:border-default-200">
      <Image alt="logo" src="/logo.png" isBlurred width={200} />
      <p className="font-[alegreya] text-xl text-center">
        Подкаст для тих, хто хоче навчитися аналізувати себе і навколишній світ
        через досвід, аналіз, філософію і психологію.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <Button
          radius="full"
          className="bg-gradient-to-tr from-default-50 to-default-200 shadow-lg"
          as={"a"}
          href="https://podcasts.apple.com/ua/podcast/душніла/id1592740343?i="
          target="_blank"
        >
          <span className="text-[#9124ca] text-2xl">
            <PiApplePodcastsLogoFill />
          </span>
          Apple Podcasts
        </Button>
        <Button
          radius="full"
          className="bg-gradient-to-tr from-default-50 to-default-200 shadow-lg"
          as={"a"}
          href="https://open.spotify.com/show/2MbpdcWZl19Fm6akAP89Sa"
          target="_blank"
        >
          <span className="text-[#1DB954] text-2xl">
            <PiSpotifyLogoFill />
          </span>
          Spotify
        </Button>
        <Button
          radius="full"
          className="bg-gradient-to-tr from-default-50 to-default-200 shadow-lg"
          as={"a"}
          href="https://www.youtube.com/playlist?list=PLraWTkDIObR4Spc5kY70gne7-bQync2wd"
          target="_blank"
        >
          <span className="text-[red] text-2xl">
            <PiYoutubeLogoFill />
          </span>
          YouTube
        </Button>
        <Button
          radius="full"
          className="bg-gradient-to-tr from-default-50 to-default-200 shadow-lg"
          as={"a"}
          href="https://patreon.com/dushnila"
          target="_blank"
        >
          <span className="text-[black] text-2xl">
            <PiPatreonLogoFill />
          </span>
          Patreon
        </Button>
        <Button
          radius="full"
          className="bg-gradient-to-tr from-default-50 to-default-200 shadow-lg"
          as={"a"}
          href="https://castbox.fm/channel/%D0%94%D1%83%D1%88%D0%BD%D1%96%D0%BB%D0%B0-id4647098"
          target="_blank"
        >
          <span className="text-[#ff6222] text-2xl">
            <SiCastbox />
          </span>
          Castbox
        </Button>
        <Button
          radius="full"
          className="bg-gradient-to-tr from-default-50 to-default-200 shadow-lg"
          as={"a"}
          href="https://play.pocketcasts.com/podcasts/share?id=ec9b4490-1b13-013a-d5bc-0acc26574db2"
          target="_blank"
        >
          <span className="text-[#F43E37] text-2xl">
            <SiPocketcasts />
          </span>
          Pocket Casts
        </Button>
      </div>
    </header>
  );
};

export default Header;
