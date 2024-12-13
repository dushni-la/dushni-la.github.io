import { PropsWithChildren } from "react";

export default function EpisodeLayout({ children }: PropsWithChildren) {
  return <div className="w-full lg:w-[60rem]">{children}</div>;
}
