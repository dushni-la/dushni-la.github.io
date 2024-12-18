"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { PlayerProvider } from "./Player/PlayerContext";
import { useEffect } from "react";

function ForceThemeProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme, systemTheme, setTheme } = useTheme();

  useEffect(() => {
    if (systemTheme && systemTheme !== resolvedTheme) {
      setTheme(systemTheme);
    }
  }, [systemTheme, resolvedTheme, setTheme]);

  return children;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="light" enableSystem>
        <ForceThemeProvider>
          <PlayerProvider>{children}</PlayerProvider>
        </ForceThemeProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
