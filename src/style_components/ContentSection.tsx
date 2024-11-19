type ContentSectionProps = React.HTMLAttributes<HTMLElement>;

export const ContentSection = (
  props: ContentSectionProps & { className?: string }
) => {
  return (
    <>
      <section
        {...props}
        className={"my-10 flex flex-col justify-center" + " " + props.className}
      ></section>
    </>
  );
};
