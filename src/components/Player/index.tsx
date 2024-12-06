"use client";

import React from "react";
import { Card, CardBody, Image, Button, Slider } from "@nextui-org/react";
import {
  PiPause,
  PiPlay,
  PiRepeatOnce,
  PiShuffle,
  PiSkipBack,
  PiSkipForward,
} from "react-icons/pi";
import { usePlayer } from "./PlayerContext";
import { formatTime } from "../utils";

const Player = () => {
  const player = usePlayer();

  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50"
      shadow="sm"
    >
      <CardBody>
        <div className="flex flex-row gap-4 items-start justify-center">
          <div className="relative">
            <Image
              alt="Album cover"
              className="object-cover"
              height={80}
              width={80}
              shadow="md"
              src={player.currentEpisode?.image || "./logo.png"}
            />
          </div>

          <div className="flex flex-1 flex-col">
            <div className="flex flex-auto justify-between items-start">
              <h1 className="text-large font-medium mt-2">
                {player.currentEpisode?.title}
              </h1>
            </div>

            <div className="flex flex-col mt-3 gap-1">
              <Slider
                aria-label="Music progress"
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
              <div className="flex justify-between">
                <p className="text-small">{formatTime(player.currentTime)}</p>
                <p className="text-small text-foreground/50">
                  {formatTime(player.duration)}
                </p>
              </div>
            </div>

            <div className="flex w-full items-center justify-center">
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
              >
                <PiRepeatOnce />
              </Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
              >
                <PiSkipBack />
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
