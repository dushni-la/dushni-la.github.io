import { PropsWithChildren } from "react";

export default function PostLayout({ children }: PropsWithChildren) {
  return <div className="w-full lg:w-[40rem]">{children}</div>;
}
