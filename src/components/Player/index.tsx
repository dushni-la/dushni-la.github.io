"use client";

import React from "react";
import { Card, CardBody, Image, Button, Slider } from "@nextui-org/react";
import {
  PiFastForward,
  PiPause,
  PiPlay,
  PiRewind,
  PiSkipBack,
  PiSkipForward,
} from "react-icons/pi";
import { usePlayer } from "./PlayerContext";
import { formatTime } from "../utils";
import EpisodeMetadataHeader from "@/components/EpisodeMetadataHeader";
import { useAnalytics } from "../AnalyticsProvider";

const Player = () => {
  const player = usePlayer();

  const analytics = useAnalytics();

  if (!player.currentEpisode) return null;

  return (
    <Card
      isBlurred
      classNames={{
        base: "border-none bg-background/70 dark:bg-foreground/10 rounded-b-none md:rounded-lg",
      }}
      shadow="sm"
    >
      <CardBody>
        <div className="flex flex-col gap-4">
          <div className="flex w-full flex-1 flex-row gap-4">
            <div className="relative">
              <Image
                alt="Album cover"
                className="object-cover"
                height={80}
                width={80}
                shadow="md"
                src={player.currentEpisode?.image || "/logo.png"}
              />
            </div>
            <div className="flex flex-col flex-1 items-start gap-0">
              <div className="hidden md:block w-full">
                <EpisodeMetadataHeader episode={player.currentEpisode} />
              </div>
              <h1 className="dark:text-default-700 text-large font-medium leading-[20px] mt-2">
                {player.currentEpisode?.title}
              </h1>
              <div className="md:hidden block w-full mt-2">
                <ProgressSlider
                  time={player.currentTime}
                  duration={player.duration || 0}
                  onChange={player.seek}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col">
            <div className="hidden md:block w-full">
              <ProgressSlider
                time={player.currentTime}
                duration={player.duration || 0}
                onChange={player.seek}
              />
            </div>
            <div className="flex w-full items-center justify-center">
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
                onPress={() =>
                  analytics.trackEvent("Player Button Pressed", 1, {
                    button: "back",
                  })
                }
              >
                <PiSkipBack />
              </Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10 flex-col"
                radius="full"
                variant="light"
                onPress={() => {
                  player.seek(player.currentTime - 30);
                  analytics.trackEvent("Player Button Pressed", 1, {
                    button: "rewind-30",
                  });
                }}
              >
                <p className="text-xs -mb-[3px]">30</p>
                <PiRewind />
              </Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10 flex-col"
                radius="full"
                variant="light"
                onPress={() => {
                  player.seek(player.currentTime - 10);
                  analytics.trackEvent("Player Button Pressed", 1, {
                    button: "rewind-10",
                  });
                }}
              >
                <p className="text-xs -mb-[3px]">10</p>
                <PiRewind />
              </Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
                onPress={() => {
                  player.togglePlay();
                  analytics.trackEvent("Player Button Pressed", 1, {
                    button: "play-paused",
                  });
                }}
              >
                {player.isPlaying ? <PiPause /> : <PiPlay />}
              </Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10 flex-col"
                radius="full"
                variant="light"
                onPress={() => {
                  player.seek(player.currentTime + 10);
                  analytics.trackEvent("Player Button Pressed", 1, {
                    button: "fwd-10",
                  });
                }}
              >
                <p className="text-xs -mb-[3px]">10</p>
                <PiFastForward />
              </Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10 flex-col"
                radius="full"
                variant="light"
                onPress={() => {
                  player.seek(player.currentTime + 30);
                  analytics.trackEvent("Player Button Pressed", 1, {
                    button: "fwd-30",
                  });
                }}
              >
                <p className="text-xs -mb-[3px]">30</p>
                <PiFastForward />
              </Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
                onPress={() => {
                  analytics.trackEvent("Player Button Pressed", 1, {
                    button: "next",
                  });
                }}
              >
                <PiSkipForward />
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

const ProgressSlider = ({
  time,
  duration,
  onChange,
}: {
  time: number;
  duration: number;
  onChange: (v: number) => void;
}) => (
  <div className="flex flex-col -mt-2 gap-1">
    <Slider
      aria-label="Прогрес"
      classNames={{
        track: "bg-default-600/30",
        thumb: "w-2 h-2 after:w-2 after:h-2 after:bg-foreground",
      }}
      color="foreground"
      defaultValue={33}
      size="sm"
      value={time}
      maxValue={duration}
      onChange={(value) => onChange(value as number)}
    />
    <div className="flex justify-between -mt-1">
      <p className="text-small">{formatTime(time)}</p>
      <p className="text-small text-foreground/50">{formatTime(duration)}</p>
    </div>
  </div>
);

export default Player;
