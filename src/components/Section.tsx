const Section = ({
  title,
  subtitle,
  children,
}: React.PropsWithChildren & { title: string; subtitle: string }) => (
  <div className="p-2 md:p-10 flex flex-col gap-8 md:gap-16">
    <div className="flex flex-col gap-2 z-10">
      <h2 className="text-4xl text-center">{title}</h2>
      <h4 className="text-xl text-center font-[alegreya]">{subtitle}</h4>
    </div>
    {children}
  </div>
);

export default Section;
