import { Feedback } from "@/components/types";
import { Card, CardBody } from "@nextui-org/react";
import { PiStarFill } from "react-icons/pi";
import PlatformIcon from "@/components/PlatformIcon";

const FeedbackCard: React.FC<{
  data: Feedback;
}> = ({ data }) => {
  return (
    <Card className="mb-4">
      <CardBody className="bg-default-50 flex flex-col gap-4 p-4">
        <div className="flex flex-row gap-4">
          <PlatformIcon platform={data.platform} size="2xl" />
          <p className="font-[alegreya] text-sm">{data.date}</p>
        </div>
        <p>{data.text}</p>
        <h4>{data.username}</h4>
        <div className="flex flex-row items-center gap-1">
          {new Array(data.stars).fill(1).map((_, idx) => (
            <PiStarFill className="text-warning" key={idx} />
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default FeedbackCard;
