"use client";

import Section from "@/components/Section";
import { ButtonGroup } from "@nextui-org/react";
import { PlatformLink } from "@/components/PlatformLinks";
import { usePlayer } from "./Player/PlayerContext";

const Footer = () => {
  const player = usePlayer();

  return (
    <footer
      className={`bg-primary-900 dark:bg-primary-50 text-white mt-[4rem] rounded-t-[1rem] w-full lg:w-[50rem] self-center p-4 shadow-lg ${player.currentEpisode ? "pb-[14rem]" : "pb-10"}`}
    >
      <Section
        title="Підтримай"
        subtitle="Роби добро. Підтримай подкаст, який змушує думати."
      >
        <ButtonGroup className="mb-10">
          <PlatformLink platform="patreon" />
          <PlatformLink platform="monobank" />
        </ButtonGroup>
        <small className="text-center">&ldquo;Душніла&rdquo; © 2024</small>
      </Section>
    </footer>
  );
};

export default Footer;
