"use client";

import React from "react";
import { Image } from "@nextui-org/react";
import { Episode } from "@/components/types";
import SharePanel from "@/components/SharePanel";

import PlayEpisodeButton from "@/app/PlayEpisodeButton";

const sizeToPx = {
  sm: 80,
  md: 100,
  lg: 280,
};

const EpisodeCoverPlayer: React.FC<{
  episode: Episode;
  size: "sm" | "md" | "lg";
}> = ({ episode, size }) => {
  return (
    <div
      className={`flex ${size !== "lg" ? "flex-row md:flex-col" : "flex-col self-center"} gap-4`}
    >
      <div
        className="relative justify-center items-center rounded-lg shadow-lg"
        style={{
          height: sizeToPx[size],
          width: sizeToPx[size],
        }}
      >
        <div className="absolute left-0 top-0 right-0 bottom-0">
          <Image
            isBlurred
            alt={episode.title}
            className="object-cover"
            src={episode.image || "/logo.png"}
            height={sizeToPx[size]}
            width={sizeToPx[size]}
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 justify-end md:justify-between">
        <PlayEpisodeButton
          episode={episode}
          className="text-tiny"
          variant="flat"
          color="primary"
          radius="lg"
          size="sm"
          playTitle="Слухати"
          pauseTitle="Пауза"
        />
        <SharePanel />
      </div>
    </div>
  );
};

export default EpisodeCoverPlayer;
