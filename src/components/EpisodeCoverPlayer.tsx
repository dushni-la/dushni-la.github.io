"use client";

import React from "react";
import { Card, Image, CardBody } from "@nextui-org/react";
import { Episode } from "@/components/types";
import SharePanel from "@/components/SharePanel";

import { motion } from "motion/react";
import PlayEpisodeButton from "@/app/PlayEpisodeButton";

const sizeToPx = {
  sm: 80,
  md: 100,
  lg: 280,
};

const MotionCard = motion.create(Card);

const EpisodeCoverPlayer: React.FC<{
  episode: Episode;
  size: "sm" | "md" | "lg";
}> = ({ episode, size }) => {
  return (
    <div
      className={`flex ${size !== "lg" ? "flex-row md:flex-col" : "flex-col self-center"} gap-4`}
    >
      <MotionCard
        isFooterBlurred
        radius="lg"
        shadow="md"
        isBlurred
        className={`border-none`}
        style={{
          width: sizeToPx[size],
          height: sizeToPx[size],
        }}
      >
        <CardBody className="justify-center items-center group">
          <div className="absolute left-0 top-0 right-0 bottom-0">
            <Image
              alt={episode.title}
              className="object-cover z-0"
              height={sizeToPx[size]}
              src={episode.image || "/logo.png"}
              width={sizeToPx[size]}
            />
          </div>
        </CardBody>
      </MotionCard>
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
