import { Button, Image } from "@nextui-org/react";
import React from "react";
import {
  PiApplePodcastsLogoFill,
  PiSpeakerHighDuotone,
  PiSpotifyLogoFill,
  PiYoutubeLogoFill,
} from "react-icons/pi";

const Header = () => {
  return (
    <header className="fixed min-h-screen flex w-[28rem] p-10 bg-default-50 items-center flex-col gap-8 lg:border-x lg:border-default-200">
      <Image alt="logo" src="/logo.png" isBlurred width={200} />
      <p className="font-[alegreya] text-xl text-center">
        Подкаст для тих, хто хоче навчитися аналізувати себе і навколишній світ
        через досвід, аналіз, філософію і психологію.
      </p>

      <div className="flex flex-row items-center gap-2 w-full">
        <span className="text-sm text-default-700">
          <PiSpeakerHighDuotone />
        </span>
        Слухай
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        <Button
          radius="full"
          className="bg-gradient-to-tr from-default-50 to-default-200 shadow-lg"
        >
          <span className="text-[#9124ca] text-2xl">
            <PiApplePodcastsLogoFill />
          </span>
          Apple Podcasts
        </Button>
        <Button
          radius="full"
          className="bg-gradient-to-tr from-default-50 to-default-200 shadow-lg"
        >
          <span className="text-[#1DB954] text-2xl">
            <PiSpotifyLogoFill />
          </span>
          Spotify
        </Button>
        <Button
          radius="full"
          className="bg-gradient-to-tr from-default-50 to-default-200 shadow-lg"
        >
          <span className="text-[red] text-2xl">
            <PiYoutubeLogoFill />
          </span>
          YouTube
        </Button>
      </div>
    </header>
  );
};

export default Header;
