"use client";

import React from "react";
import NextLink from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
  Modal,
  useDisclosure,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { MdAdd } from "react-icons/md";
import PlatformLinks from "./PlatformLinks";
import { motion } from "motion/react";

const NavbarLink: React.FC<{
  currentPath: string;
  href: string;
  children: string;
}> = ({ currentPath, href, children }) => {
  const isActive =
    href === "/" ? currentPath === "/" : currentPath.includes(href);
  return (
    <NavbarItem>
      <Link
        className={`${isActive ? "text-foreground border-b-4 border-warning -mb-2" : "text-foreground"}`}
        href={href}
        as={NextLink}
        aria-current={isActive ? "page" : undefined}
      >
        {children}
      </Link>
    </NavbarItem>
  );
};

const MotionNavbar = motion.create(Navbar);

const Navigation = () => {
  const pathname = usePathname();
  console.log(pathname);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <MotionNavbar className="bg-transparent" layout>
        <NavbarBrand />
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarLink href="/" currentPath={pathname}>
            ГОЛОВНА
          </NavbarLink>
          <NavbarLink href="/episodes" currentPath={pathname}>
            ЕПІЗОДИ
          </NavbarLink>
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
          <NavbarItem>
            <Button color="warning" onPress={onOpen}>
              <MdAdd />
              Підписатись
            </Button>
          </NavbarItem>
        </NavbarContent>
      </MotionNavbar>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        classNames={{
          backdrop:
            "bg-gradient-to-t dark:from-zinc-900 dark:to-zinc-900/10 backdrop-blur-md",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Не пропусти наступний випуск
              </ModalHeader>
              <ModalBody>
                <PlatformLinks />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="flat" onPress={onClose}>
                  Закрити
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Navigation;
