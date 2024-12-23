"use client";

import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  ButtonProps,
} from "@nextui-org/react";
import Link from "next/link";
import {
  FaEnvelope,
  FaFacebook,
  FaGetPocket,
  FaPinterest,
  FaReddit,
  FaTelegram,
  FaViber,
  FaWhatsapp,
} from "react-icons/fa";
import { FaSquareXTwitter, FaThreads } from "react-icons/fa6";
import { PiShareFat } from "react-icons/pi";
import {
  EmailShareButton,
  FacebookShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  ViberShareButton,
  WhatsappShareButton,
} from "react-share";
import { useAnalytics } from "./AnalyticsProvider";

const SharePanel = ({
  url,
  imageUrl,
  title,
  text,
  ...buttonProps
}: {
  url: string;
  imageUrl: string;
  title?: string;
  text?: string;
} & ButtonProps) => {
  const getUrlWithUtm = (p: string) =>
    `${url}?utm_source=social&utm_medium=${p}&utm_campaign=share`;

  const analytics = useAnalytics();

  return (
    <Popover
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              opacity: {
                duration: 0.15,
              },
            },
          },
          exit: {
            y: "10%",
            opacity: 0,
            transition: {
              opacity: {
                duration: 0.1,
              },
            },
          },
        },
      }}
      offset={10}
      placement="top-end"
    >
      <PopoverTrigger>
        <Button
          className="text-tiny"
          variant="flat"
          color="primary"
          radius="lg"
          size="sm"
          onPress={() => analytics.trackEvent("Share List Opened")}
          {...buttonProps}
        >
          <PiShareFat />
          Поділитись
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-zinc-50">
        <div className="flex flex-col md:flex-row gap-4 p-2">
          <EmailShareButton
            url={getUrlWithUtm("email")}
            subject={title}
            body={text}
            className="pirsch-event=Share+Pressed pirsch-meta-platform=email"
          >
            <FaEnvelope className="text-2xl text-[#0866ff]" />
          </EmailShareButton>
          <FacebookShareButton url={getUrlWithUtm("facebook")}>
            <FaFacebook className="text-2xl text-[#0866ff]" />
          </FacebookShareButton>
          <PinterestShareButton
            url={getUrlWithUtm("pinterest")}
            media={imageUrl}
            className="pirsch-event=Share+Pressed pirsch-meta-platform=pinterest"
          >
            <FaPinterest className="text-2xl text-[#e60122]" />
          </PinterestShareButton>
          <TelegramShareButton
            url={getUrlWithUtm("telegram")}
            title={title}
            className="pirsch-event=Share+Pressed pirsch-meta-platform=telegram"
          >
            <FaTelegram className="text-2xl text-[#24a9e9]" />
          </TelegramShareButton>
          <Link
            target="_blank"
            href={`https://threads.net/intent/post?text=${text} ${title}: ${getUrlWithUtm("threads")}`}
            className="pirsch-event=Share+Pressed pirsch-meta-platform=threads"
          >
            <FaThreads className="text-2xl text-[black]" />
          </Link>
          <PocketShareButton
            url={getUrlWithUtm("pocket")}
            title={title}
            className="pirsch-event=Share+Pressed pirsch-meta-platform=pocket"
          >
            <FaGetPocket className="text-2xl text-[#f50157]" />
          </PocketShareButton>
          <TwitterShareButton
            url={getUrlWithUtm("twitter")}
            title={title}
            hashtags={["філософія", "подкаст", "душніла"]}
            className="pirsch-event=Share+Pressed pirsch-meta-platform=twitter"
          >
            <FaSquareXTwitter className="text-2xl text-[black]" />
          </TwitterShareButton>
          <RedditShareButton
            url={getUrlWithUtm("reddit")}
            title={title}
            className="pirsch-event=Share+Pressed pirsch-meta-platform=reddit"
          >
            <FaReddit className="text-2xl text-[#fa3b0a]" />
          </RedditShareButton>
          <WhatsappShareButton
            url={getUrlWithUtm("whatsapp")}
            title={text}
            className="pirsch-event=Share+Pressed pirsch-meta-platform=whatsapp"
          >
            <FaWhatsapp className="text-2xl text-[#4dc159]" />
          </WhatsappShareButton>
          <ViberShareButton
            url={getUrlWithUtm("viber")}
            title={text}
            className="pirsch-event=Share+Pressed pirsch-meta-platform=viber"
          >
            <FaViber className="text-2xl text-[#6f5ceb]" />
          </ViberShareButton>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SharePanel;
