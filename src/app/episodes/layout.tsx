import Navigation from "@/components/Navigation";

export default function EpisodesLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <main className="flex-auto">
        <Navigation />
        <div className="flex justify-center w-full flex-1">{children}</div>
      </main>
    </>
  );
}
