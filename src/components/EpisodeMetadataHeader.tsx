import { Episode } from "@/components/types";
import { Chip, Tooltip } from "@nextui-org/react";
import { BsFire } from "react-icons/bs";

export default function EpisodeMetadataHeader({
  episode,
}: {
  episode: Episode;
}) {
  return (
    <div className="flex justify-between w-full">
      <div className="flex flex-row gap-2 items-center">
        <p className="order-first font-mono text-xs text-default-700">
          {new Date(episode.pub_date).toLocaleDateString(["uk-ua"])}
        </p>
        {episode.latest && (
          <Chip
            color="warning"
            className="text-xs font-[hkGrotesque] px-1 -my-1"
          >
            NEW
          </Chip>
        )}
        {episode.hot && (
          <Tooltip content="Цей епізод дуже сподобався слухачам">
            <span className="text-danger-600 cursor-help">
              <BsFire />
            </span>
          </Tooltip>
        )}
      </div>
      <h3 className="text-xl font-[alegreya]">#{episode.episode}</h3>
    </div>
  );
}
