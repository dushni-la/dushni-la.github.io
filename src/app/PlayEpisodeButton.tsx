"use client";

import { usePlayer } from "@/components/Player/PlayerContext";
import { Episode } from "@/components/types";
import { Button, ButtonProps } from "@nextui-org/react";
import React from "react";
import { PiPauseFill, PiPlayFill } from "react-icons/pi";

const PlayEpisodeButton = ({
  episode,
  playTitle,
  pauseTitle,
  ...buttonProps
}: {
  episode: Episode;
  playTitle: string;
  pauseTitle: string;
} & ButtonProps) => {
  const player = usePlayer();

  return (
    <Button
      onPress={
        player.currentEpisode?.guid === episode.guid
          ? () => player.togglePlay()
          : () => player.play(episode)
      }
      {...buttonProps}
    >
      {player.isPlaying && player.currentEpisode?.guid === episode.guid ? (
        <>
          <PiPauseFill />
          {pauseTitle}
        </>
      ) : (
        <>
          <PiPlayFill />
          {playTitle}
        </>
      )}
    </Button>
  );
};

export default PlayEpisodeButton;
