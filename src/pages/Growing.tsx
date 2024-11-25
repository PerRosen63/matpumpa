import { useEffect } from "react";
import { TitleSection } from "../style_components/TitleSection";

export const Growing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <TitleSection>Odling & recept</TitleSection>
    </>
  );
};
