const Section = ({
  title,
  subtitle,
  titleH1,
  children,
}: React.PropsWithChildren & {
  title: string;
  titleH1?: boolean;
  subtitle: string;
}) => (
  <div className="p-2 md:p-10 flex flex-col gap-8 md:gap-16">
    <div className="flex flex-col gap-2 z-10">
      {titleH1 ? (
        <h1 className="text-4xl text-center">{title}</h1>
      ) : (
        <h2 className="text-4xl text-center">{title}</h2>
      )}
      <h4 className="text-xl text-center font-[alegreya]">{subtitle}</h4>
    </div>
    {children}
  </div>
);

export default Section;
