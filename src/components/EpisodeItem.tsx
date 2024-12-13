import EpisodeCoverPlayer from "@/components/EpisodeCoverPlayer";
import { Episode } from "@/components/types";
import NextLink from "next/link";
import React from "react";
import EpisodeMetadataHeader from "@/components/EpisodeMetadataHeader";
import { Button, Card, CardBody } from "@nextui-org/react";
import { PiReadCvLogoFill } from "react-icons/pi";

const EpisodeItem: React.FC<{ data: Episode }> = ({ data }) => {
  return (
    <Card isBlurred className="rounded-[1.5rem]">
      <CardBody className="bg-background flex flex-col-reverse md:flex-col md:flex-row gap-6 group p-6">
        <EpisodeCoverPlayer episode={data} size="md" />
        <div className="flex flex-col flex-1 gap-2">
          <EpisodeMetadataHeader episode={data} />
          <NextLink
            href={`/episodes/${data.guid}`}
            className="text-foreground hover:text-primary-700"
          >
            <h3 className="dark:text-default-700 text-xl">{data.title}</h3>
          </NextLink>
          <p className="overflow-hidden text-foreground">
            {data.summary.split("Support the show")[0]}
          </p>
          <Button
            className="text-tiny mt-4"
            variant="flat"
            color="default"
            radius="lg"
            size="sm"
            as={NextLink}
            href={`/episodes/${data.guid}`}
          >
            <PiReadCvLogoFill />
            Деталі
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default EpisodeItem;
