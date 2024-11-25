import { FormNext } from "grommet-icons";
import { Button } from "../style_components/Button";
import { TitleSection } from "../style_components/TitleSection";
import { ContentSectionNarrow } from "../style_components/ContentSectionNarrow";
import { Link } from "react-router-dom";
import { ContentSection } from "../style_components/ContentSection";
import { useEffect } from "react";

export const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <TitleSection>Om pumpor</TitleSection>
      <ContentSectionNarrow>
        <p className="text-center font-bold md:text-lg/6">
          Pumpasläktet tillhör familjen gurkväxter. De vanligaste arterna som
          används i matlagning är Curcubita pepo, Curcubita maxima och Curcubita
          moschata.
        </p>
        <div className="flex max-md:flex-col my-10 max-md:items-center justify-between gap-y-1">
          <Link to={"/product-category/curcubita-pepo/"}>
            <Button
              className="max-md:min-w-64 lg:min-w-64"
              variant="secondary"
              disabled={false}
            >
              <span className="">Curcubita Pepo</span>
              <FormNext
                color="#626a40"
                className="[&>path]:stroke-3"
              ></FormNext>
            </Button>
          </Link>
          <Link to={"/product-category/curcubita-maxima/"}>
            <Button
              className="max-md:min-w-64 lg:min-w-64"
              variant="secondary"
              disabled={false}
            >
              <span className="">Curcubita Maxima</span>
              <FormNext
                color="#626a40"
                className="[&>path]:stroke-3"
              ></FormNext>
            </Button>
          </Link>
          <Link to={"/product-category/curcubita-moschata/"}>
            <Button
              className="max-md:min-w-64 lg:min-w-64"
              variant="secondary"
              disabled={false}
            >
              <span className="">Curcubita Moschata</span>
              <FormNext
                color="#626a40"
                className="[&>path]:stroke-3"
              ></FormNext>
            </Button>
          </Link>
        </div>
        <div className="max-md:text-center">
          <h2 className="my-3">Kärt barn har många namn</h2>
          <p className="font-bold md:text-lg/6">
            Squash. Butternut. Zucchini. Vintersquash. Jättepumpa.
            Halloweenpumpa. Vad är vad, egentligen? Det beror lite på vem du
            frågar. Det råder en viss begreppsförvirring. Allt är dock pumpa.
            Här reder vi ut det hela!
          </p>
          <p>
            En squash/zucchini och en halloweenpumpa tillhör faktiskt samma art,
            Curcubita pepo. Förutom form och storlek så är den kanske viktigaste
            skillnaden att halloweenpumpan har ett tjockare skal och lämpar sig
            bättre för lagring. Därför kallas ibland de pumpasorter som vi på
            våra breddgrader pga frostrisken låter eftermogna inomhus under
            senhöst/vinter för vintersquash. Squashen/zucchinin skördas istället
            omogen under sommaren och skulle därför även kunna kallas
            sommarpumpa eller sommarsquash. Squash och pumpa är alltså samma
            sak, fast det finns sommar- och vintervarianter. Den första skördas
            omogen på sommaren. Den andra färdigväxt på hösten för konsumtion på
            vintern. Ja, ibland kan de, om de lagras svalt, kunna hålla sig till
            långt in på våren eller t o m midsommar.
          </p>
        </div>
      </ContentSectionNarrow>
      <ContentSection>
        <div className="flex max-md:flex-col gap-4">
          <div>
            <img
              className="border-rounded"
              src="https://mfdm.se/woo/wp-content/uploads/20241011_135547-600x450.jpg"
              alt="pumpkin"
            />
          </div>
          <div>
            <img
              className="border-rounded"
              src="https://mfdm.se/woo/wp-content/uploads/20240929_142516-600x450.jpg"
              alt="pumpkins"
            />
          </div>
          <div>
            <img
              className="border-rounded"
              src="https://mfdm.se/woo/wp-content/uploads/20241011_135027-600x450.jpg"
              alt="blue"
            />
          </div>
        </div>
      </ContentSection>
    </>
  );
};
