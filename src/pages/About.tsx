import { FormNext } from "grommet-icons";
import { Button } from "../style_components/Button";
import { TitleSection } from "../style_components/TitleSection";

export const About = () => {
  return (
    <>
      <TitleSection>Om pumpor</TitleSection>
      <Button variant="secondary">
        <span className="">Curcubita Pepo</span>
        <FormNext color="#626a40" className="[&>path]:stroke-3"></FormNext>
      </Button>
    </>
  );
};
