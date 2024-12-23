"use client";

import React from "react";
import NextLink from "next/link";
import {
  Navbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
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
  onPress?: () => void;
}> = ({ currentPath, href, children, onPress }) => {
  const isActive =
    href === "/" ? currentPath === "/" : currentPath.includes(href);
  return (
    <MotionButton
      color={isActive ? "warning" : "default"}
      href={href}
      as={NextLink}
      aria-current={isActive ? "page" : undefined}
      onClick={() => onPress?.()}
    >
      {children}
    </MotionButton>
  );
};

const MotionNavbar = motion.create(Navbar);

const ROUTES = {
  "/": "ГОЛОВНА",
  "/episodes": "ЕПІЗОДИ",
  "/blog": "БЛОГ",
  "/about": "ПРО АВТОРА",
  // "/feedback": "ВІДГУКИ",
};

type Route = keyof typeof ROUTES;

const Navigation = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <>
      <MotionNavbar
        className="bg-transparent z-[9999]"
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent className="flex gap-4 justify-start md:justify-center">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden flex"
          />
          <ButtonGroup className="hidden md:flex">
            {Object.keys(ROUTES).map((href) => (
              <NavbarLink key={href} href={href} currentPath={pathname}>
                {ROUTES[href as Route]}
              </NavbarLink>
            ))}
          </ButtonGroup>
          {/*
          <NavbarLink href="/blog" currentPath={pathname}>
            Блог
          </NavbarLink>
          <NavbarLink href="/feedback" currentPath={pathname}>
            Відгуки
          </NavbarLink>
            */}
        </NavbarContent>
        <NavbarContent justify="end">
          <SubscribeButton color="default" autoOpen={true} />
        </NavbarContent>
        <NavbarMenu>
          {Object.keys(ROUTES).map((href) => (
            <NavbarLink
              key={href}
              href={href}
              currentPath={pathname}
              onPress={() => setIsMenuOpen(false)}
            >
              {ROUTES[href as Route]}
            </NavbarLink>
          ))}
        </NavbarMenu>
      </MotionNavbar>
    </>
  );
};

export default Navigation;
