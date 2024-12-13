"use client";

import React from "react";
import NextLink from "next/link";
import {
  Navbar,
  NavbarContent,
  Button,
  ButtonGroup,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import SubscribeButton from "./SubscribeButton";

const MotionButton = motion.create(Button);

const NavbarLink: React.FC<{
  currentPath: string;
  href: string;
  children: string;
}> = ({ currentPath, href, children }) => {
  const isActive =
    href === "/" ? currentPath === "/" : currentPath.includes(href);
  return (
    <MotionButton
      color={isActive ? "warning" : "default"}
      href={href}
      as={NextLink}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </MotionButton>
  );
};

const MotionNavbar = motion.create(Navbar);

const Navigation = () => {
  const pathname = usePathname();

  // return (
  //   <Tabs
  //     aria-label="Options"
  //     selectedKey={pathname}
  //     variant="bordered"
  //     color="warning"
  //     classNames={{
  //       base: "fixed z-50 w-full justify-center",
  //       tabList: "bg-default-100/90 backdrop-blur-sm",
  //     }}
  //     onSelectionChange={(...args) => {
  //       console.log(args);
  //     }}
  //   >
  //     <Tab key="/" title="Головна" href="/" />
  //     <Tab key="/episodes" title="Випуски" href="/episodes" />
  //   </Tabs>
  // );

  return (
    <>
      <MotionNavbar className="bg-transparent">
        <NavbarContent className="flex gap-4 justify-start md:justify-center">
          <ButtonGroup>
            <NavbarLink href="/" currentPath={pathname}>
              ГОЛОВНА
            </NavbarLink>
            <NavbarLink href="/episodes" currentPath={pathname}>
              ЕПІЗОДИ
            </NavbarLink>
          </ButtonGroup>
          {/*
          <NavbarLink href="/blog" currentPath={pathname}>
            Блог
          </NavbarLink>
          <NavbarLink href="/feedback" currentPath={pathname}>
            Відгуки
          </NavbarLink>
          <NavbarLink href="/about" currentPath={pathname}>
            Про автора
          </NavbarLink>
            */}
        </NavbarContent>
        <NavbarContent justify="end">
          <SubscribeButton color="default" />
        </NavbarContent>
      </MotionNavbar>
    </>
  );
};

export default Navigation;
