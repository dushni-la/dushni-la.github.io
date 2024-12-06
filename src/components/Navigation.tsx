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

const Navigation = () => (
  <Navbar>
    <NavbarBrand />
    <NavbarContent className="hidden sm:flex gap-4" justify="center">
      <NavbarItem>
        <Link color="foreground" href="/" as={NextLink}>
          Головна
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link color="foreground" href="/" as={NextLink}>
          Статті
        </Link>
      </NavbarItem>
      <NavbarItem isActive>
        <Link href="/episodes" aria-current="page" as={NextLink}>
          Епізоди
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link color="foreground" href="#" as={NextLink}>
          Про автора
        </Link>
      </NavbarItem>
    </NavbarContent>
    <NavbarContent justify="end">
      <NavbarItem className="hidden lg:flex">
        <Link href="#">Login</Link>
      </NavbarItem>
      <NavbarItem>
        <Button as={Link} color="primary" href="#" variant="flat">
          Sign Up
        </Button>
      </NavbarItem>
    </NavbarContent>
  </Navbar>
);

export default Navigation;
