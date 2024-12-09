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
} from "@nextui-org/react";
import { usePathname } from "next/navigation";

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

const Navigation = () => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <Navbar>
      <NavbarBrand />
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarLink href="/" currentPath={pathname}>
          Головна
        </NavbarLink>
        <NavbarLink href="/episodes" currentPath={pathname}>
          Випуски
        </NavbarLink>
        <NavbarLink href="/blog" currentPath={pathname}>
          Блог
        </NavbarLink>
        <NavbarLink href="/feedback" currentPath={pathname}>
          Відгуки
        </NavbarLink>
        <NavbarLink href="/about" currentPath={pathname}>
          Про автора
        </NavbarLink>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="warning" href="#" variant="flat">
            Підписатись
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Navigation;
