"use client";

import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
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

const SharePanel = () => (
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
      >
        <PiShareFat />
        Поділитись
      </Button>
    </PopoverTrigger>
    <PopoverContent className="bg-default-50">
      <div className="flex flex-col md:flex-row gap-4 p-2">
        <EmailShareButton url="localhost">
          <FaEnvelope className="text-2xl text-[#0866ff]" />
        </EmailShareButton>
        <FacebookShareButton url="localhost">
          <FaFacebook className="text-2xl text-[#0866ff]" />
        </FacebookShareButton>
        <PinterestShareButton url="localhost" media="arst" className="">
          <FaPinterest className="text-2xl text-[#e60122]" />
        </PinterestShareButton>
        <TelegramShareButton url="localhost" className="">
          <FaTelegram className="text-2xl text-[#24a9e9]" />
        </TelegramShareButton>
        <Link
          target="_blank"
          href="https://threads.net/intent/post?text=localhost"
        >
          <FaThreads className="text-2xl text-[#24a9e9]" />
        </Link>
        <PocketShareButton url="localhost" className="">
          <FaGetPocket className="text-2xl text-[#24a9e9]" />
        </PocketShareButton>
        <TwitterShareButton url="localhost" className="">
          <FaSquareXTwitter className="text-2xl text-[#24a9e9]" />
        </TwitterShareButton>
        <RedditShareButton url="localhost" className="">
          <FaReddit className="text-2xl text-[#24a9e9]" />
        </RedditShareButton>
        <WhatsappShareButton url="localhost" className="">
          <FaWhatsapp className="text-2xl text-[#24a9e9]" />
        </WhatsappShareButton>
        <ViberShareButton url="localhost" className="">
          <FaViber className="text-2xl text-[#24a9e9]" />
        </ViberShareButton>
      </div>
    </PopoverContent>
  </Popover>
);

export default SharePanel;
