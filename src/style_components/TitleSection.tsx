type TitleSectionProps = React.HTMLAttributes<HTMLElement>;

export const TitleSection = (props: TitleSectionProps) => {
  return (
    <>
      <section className="flex justify-center">
        <h1 className="my-4 text-center" {...props}></h1>
      </section>
    </>
  );
};
