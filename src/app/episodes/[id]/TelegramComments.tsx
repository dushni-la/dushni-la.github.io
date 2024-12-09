"use client";

import { semanticColors } from "@nextui-org/react";
import { useEffect, useState } from "react";

const TelegramComments: React.FC<{ id: number | string }> = ({ id }) => {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    if (document) {
      if (document.querySelector("html")?.classList.contains("dark")) {
        setIsDark(true);
      }
    }
  }, []);

  return (
    <iframe
      id="telegram-discussion"
      src={`https://t.me/dushnila_podcast/${id}?embed=1&discussion=1&comments_limit=5&dark=${isDark ? "1" : "0"}&color=${semanticColors.dark.default[500]}`}
      width="100%"
      height="0"
      frameBorder="0"
      scrolling="no"
      className="-mx-4"
      style={{
        overflow: "hidden",
        colorScheme: isDark ? "dark" : "light",
        border: "none",
        height: 500,
      }}
    />
  );
};

export default TelegramComments;
