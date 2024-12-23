import Link from "next/link";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { Post } from "@/components/types";
import { formatDate } from "@/components/utils";
import { PiArrowRight } from "react-icons/pi";

const PostItem = ({ post }: { post: Post }) => {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="w-full bg-background fg-foreground md:hover:scale-110 md:hover:z-50">
        <CardHeader className="flex-col items-start pb-0">
          <div
            className="rounded-[0.65rem] h-[20rem] w-full bg-default-50 text-default-900 bg-cover bg-center flex flex-col justify-end text-white"
            style={{
              backgroundImage: `url(${post.cover})`,
            }}
          >
            <div className="p-4 rounded-[0.75rem] backdrop-blur-sm bg-zinc-900/20">
              <h1 className="text-3xl leading-1">{post.title}</h1>
              <small>
                {formatDate(
                  post.properties["Дата публікації"].date.start || "",
                )}
                , Ігор Кузьменко
              </small>
            </div>
          </div>
        </CardHeader>
        <CardBody className="px-4">
          <p className="text-lg leading-[1.75rem]">
            {post.properties.Опис.rich_text[0].plain_text}
          </p>
        </CardBody>
        <CardFooter>
          <Button fullWidth variant="solid" color="warning">
            Читати далі <PiArrowRight />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PostItem;
