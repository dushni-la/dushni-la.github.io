"use client";

import React from "react";
import { Card, Image, Button, CardBody } from "@nextui-org/react";
import { PiPauseFill, PiPlayFill } from "react-icons/pi";
import { Episode } from "@/components/types";
import { usePlayer } from "@/components/Player/PlayerContext";

const EpisodeCoverPlayer: React.FC<{ episode: Episode; size: number }> = ({
  episode,
  size,
}) => {
  const player = usePlayer();
  return (
    <Card
      isFooterBlurred
      radius="lg"
      className={`border-none`}
      style={{
        width: size,
        height: size,
      }}
    >
      <CardBody className="justify-center items-center group">
        <div className="absolute left-0 top-0 right-0 bottom-0">
          <Image
            alt="Woman listing to music"
            className="object-cover z-0"
            height={size}
            src={episode.image}
            width={size}
          />
        </div>
        <Button
          type="button"
          aria-label={`Грати випуск "${episode.title}"`}
          isIconOnly
          className="flex h-[4rem] w-[4rem] flex-shrink-0 opacity-0 group-hover:opacity-100 items-center justify-center rounded-full bg-slate-700 hover:bg-slate-900 focus:outline-none focus:ring focus:ring-slate-700 focus:ring-offset-4 text-white shadow-small"
          onPress={
            player.currentEpisode?.guid === episode.guid
              ? () => player.togglePlay()
              : () => player.play(episode)
          }
        >
          {player.isPlaying && player.currentEpisode?.guid === episode.guid ? (
            <PiPauseFill />
          ) : (
            <PiPlayFill />
          )}
        </Button>
      </CardBody>
      {/*
          <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <p className="text-tiny text-white/80">
              {Math.floor(parseInt(episode.duration) / 60)} хв
            </p>
            <Button
              className="text-tiny text-white bg-black/20"
              variant="flat"
              color="default"
              radius="lg"
              size="sm"
            >
              Слухати
            </Button>
          </CardFooter>
            */}
    </Card>
  );
};

export default EpisodeCoverPlayer;
