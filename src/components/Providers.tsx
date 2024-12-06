"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { PlayerProvider } from "./Player/PlayerContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="light">
        <PlayerProvider>{children}</PlayerProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
