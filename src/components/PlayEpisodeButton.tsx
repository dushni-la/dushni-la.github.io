"use client";

import { usePlayer } from "@/components/Player/PlayerContext";
import { Episode } from "@/components/types";
import { Button, ButtonProps } from "@nextui-org/react";
import React from "react";
import { PiPauseFill, PiPlayFill } from "react-icons/pi";
import { useAnalytics } from "./AnalyticsProvider";

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
  const analytics = useAnalytics();

  const handleButtonPress = () => {
    if (player.currentEpisode?.guid === episode.guid) {
      analytics.trackEvent("Play Episode Button Pressed", 1, {
        episode: episode.guid,
        state: "play-pause",
      });
      player.togglePlay();
    } else {
      analytics.trackEvent("Play Episode Button Pressed", 1, {
        episode: episode.guid,
        state: "play",
      });
      player.play(episode);
    }
  };

  return (
    <Button onPress={handleButtonPress} {...buttonProps}>
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
