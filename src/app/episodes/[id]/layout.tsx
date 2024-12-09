import { PropsWithChildren } from "react";

export default function EpisodeLayout({ children }: PropsWithChildren) {
  return <div className="max-w-[40rem]">{children}</div>;
}
