type TitleSectionProps = React.HTMLAttributes<HTMLElement>;

export const TitleSection = (props: TitleSectionProps) => {
  return (
    <>
      <section className="flex justify-center">
        <h1 className="my-4" {...props}></h1>
      </section>
    </>
  );
};
