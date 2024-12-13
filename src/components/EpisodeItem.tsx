import EpisodeCoverPlayer from "@/components/EpisodeCoverPlayer";
import { Episode } from "@/components/types";
import NextLink from "next/link";
import React from "react";
import EpisodeMetadataHeader from "@/components/EpisodeMetadataHeader";
import { Button, Card, CardBody } from "@nextui-org/react";
import { PiArrowRight, PiReadCvLogoFill } from "react-icons/pi";

const EpisodeItem: React.FC<{ data: Episode }> = ({ data }) => {
  return (
    <Card isBlurred className="rounded-[0.75rem]">
      <CardBody className="bg-background flex flex-col md:flex-col md:flex-row gap-6 group p-6">
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
            className="text-tiny mt-4 md:self-end min-w-[100px]"
            variant="flat"
            color="primary"
            radius="lg"
            size="sm"
            as={NextLink}
            href={`/episodes/${data.guid}`}
          >
            <PiReadCvLogoFill />
            Деталі
            <PiArrowRight />
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default EpisodeItem;
