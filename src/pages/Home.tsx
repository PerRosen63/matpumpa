import { FormNext } from "grommet-icons";
import { Button } from "../style_components/Button";
import { TitleSection } from "../style_components/TitleSection";
import { ContentSection } from "../style_components/ContentSection";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <TitleSection>matpumpa.se</TitleSection>
      <ContentSection>
        <p className="text-center max-w-3xl mx-auto md:mb-10">
          OBS! Detta är ett skolprojekt. Inga riktiga produkter finns att
          beställa. Man kan lägga ordrar anonymt och se sin order listas med
          övriga.
        </p>
        <div className="flex max-md:flex-wrap gap-4 mt-10">
          <div className="w-full md:w-1/3 md:order-1 md:mt-[-40px] md:mb-10 p-3 min-h-[60vh] flex justify-center items-center bg-start-2 bg-center bg-no-repeat bg-cover rounded-2xl">
            <div className="xl:w-2/3 p-4 bg-yellow-custom border-rounded flex flex-col items-center">
              <h2 className="text-clamp-h4 text-green-custom text-center leading-9 my-3">
                Köp matpumpa!
              </h2>
              <p className="text-green-custom mb-4 text-center">
                Beställ de godaste sorterna!
              </p>
              <Link to={"/products/"}>
                <Button disabled={false}>
                  Till webbshop
                  <FormNext
                    color="#fffcdf"
                    className="[&>path]:stroke-3"
                  ></FormNext>{" "}
                </Button>
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/3 p-3 min-h-[60vh] flex justify-center items-center bg-start-1 bg-center bg-no-repeat bg-cover rounded-2xl">
            <div className="xl:w-2/3 p-4 bg-yellow-custom border-rounded flex flex-col items-center">
              <h2 className="text-clamp-h4 text-green-custom text-center leading-9 my-3">
                Vad är matpumpa?
              </h2>
              <Link to={"/about/"}>
                <Button disabled={false}>
                  Läs mer
                  <FormNext
                    color="#fffcdf"
                    className="[&>path]:stroke-3"
                  ></FormNext>{" "}
                </Button>
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/3 md:order-2 p-3 min-h-[60vh] flex justify-center items-center bg-start-3 bg-center bg-no-repeat bg-cover rounded-2xl">
            <div className="xl:w-2/3 p-4 bg-yellow-custom border-rounded flex flex-col items-center">
              <h2 className="text-clamp-h4 text-green-custom text-center leading-9 my-3">
                Odlingstips & recept
              </h2>
              <Link to={"/growing/"}>
                <Button disabled={false}>
                  Läs mer
                  <FormNext
                    color="#fffcdf"
                    className="[&>path]:stroke-3"
                  ></FormNext>{" "}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </ContentSection>
    </>
  );
};
