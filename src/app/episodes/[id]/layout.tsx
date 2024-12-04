export default function EpisodeLayout({ children }: { children: React.ReactNode }) {
  return (
    <main style={{ maxWidth: "800px", margin: "0 auto" }}>
      {children}
    </main>
  );
}
