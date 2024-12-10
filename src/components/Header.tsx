import { Card, CardBody, Image } from "@nextui-org/react";
import React from "react";
import PlatformLinks from "./PlatformLinks";
// import { motion } from "framer-motion";
// import { motion } from "motion/react";

const Header = () => {
  return (
    <Card as="header" className="fixed w-[28rem] top-4 left-4 bottom-4">
      <CardBody className="flex p-10 bg-default-100 items-center flex-col gap-8 lg:border-x lg:border-default-200 dark:lg:border-[#25242c] bg-hero-pattern dark:bg-hero-pattern-dark">
        <Image alt="logo" src="/logo.png" isBlurred width={200} />
        <p className="font-[alegreya] text-xl text-center">
          Подкаст для тих, хто хоче навчитися аналізувати себе і навколишній
          світ через досвід, аналіз, філософію і психологію.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <PlatformLinks />
        </div>
      </CardBody>
    </Card>
  );
};

export default Header;
