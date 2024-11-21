type ContentSectionProps = React.HTMLAttributes<HTMLElement>;

export const ContentSection = (
  props: ContentSectionProps & { className?: string }
) => {
  return (
    <>
      <section
        {...props}
        className={
          "w-full my-5 md:my-10 flex flex-col justify-center" +
          " " +
          props.className
        }
      ></section>
    </>
  );
};
