type ContentSectionNarrowProps = React.HTMLAttributes<HTMLElement>;

export const ContentSectionNarrow = (
  props: ContentSectionNarrowProps & { className?: string }
) => {
  return (
    <>
      <section
        {...props}
        className={
          "w-full my-5 md:my-10 flex flex-col justify-center max-w-4xl mx-auto" +
          " " +
          props.className
        }
      ></section>
    </>
  );
};
