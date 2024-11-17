type ContentSectionProps = React.HTMLAttributes<HTMLElement>;

export const ContentSection = (
  props: ContentSectionProps & { className?: string }
) => {
  return (
    <>
      <section
        {...props}
        className={"flex flex-col justify-center " + props.className}
      ></section>
    </>
  );
};
