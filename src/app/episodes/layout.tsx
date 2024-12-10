import Header from "@/components/Header";
import Navigation from "@/components/Navigation";

export default function EpisodesLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Header vertical />
      <main className="flex-auto ml-[30rem]">
        <Navigation />
        <div className="p-10 flex justify-center">{children}</div>
      </main>
    </>
  );
}
