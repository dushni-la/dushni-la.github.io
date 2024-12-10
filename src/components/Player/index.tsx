"use client";

import React from "react";
import { Card, CardBody, Image, Button, Slider } from "@nextui-org/react";
import {
  PiFastForward,
  PiPause,
  PiPlay,
  PiShuffle,
  PiSkipForward,
} from "react-icons/pi";
import { usePlayer } from "./PlayerContext";
import { formatTime } from "../utils";
import EpisodeMetadataHeader from "@/components/EpisodeMetadataHeader";

const Player = () => {
  const player = usePlayer();

  if (!player.currentEpisode) return null;

  return (
    <Card
      isBlurred
      className="border-none bg-background/10 dark:bg-foreground/10"
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
              <EpisodeMetadataHeader episode={player.currentEpisode} />
              <h1 className="dark:text-default-700 text-large font-medium leading-[20px] mt-2">
                {player.currentEpisode?.title}
              </h1>
            </div>
          </div>

          <div className="flex flex-1 flex-col">
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
                value={player.currentTime}
                maxValue={player.duration || 0}
                onChange={(value) => player.seek(value as number)}
              />
              <div className="flex justify-between -mt-1">
                <p className="text-small">{formatTime(player.currentTime)}</p>
                <p className="text-small text-foreground/50">
                  {formatTime(player.duration)}
                </p>
              </div>
            </div>

            <div className="flex w-full items-center justify-center">
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10 flex-col"
                radius="full"
                variant="light"
                onPress={() => player.seek(player.currentTime + 10)}
              >
                <p className="text-xs -mb-[3px]">10</p>
                <PiFastForward />
              </Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10 flex-col"
                radius="full"
                variant="light"
                onPress={() => player.seek(player.currentTime + 30)}
              >
                <p className="text-xs -mb-[3px]">30</p>
                <PiFastForward />
              </Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
                onPress={player.togglePlay}
              >
                {player.isPlaying ? <PiPause /> : <PiPlay />}
              </Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
              >
                <PiSkipForward />
              </Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
              >
                <PiShuffle />
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default Player;
