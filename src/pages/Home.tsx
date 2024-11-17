import { FormNext } from "grommet-icons";
import { Button } from "../style_components/Button";
import { TitleSection } from "../style_components/TitleSection";
import { ContentSection } from "../style_components/ContentSection";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <TitleSection>matpumpa.se</TitleSection>
      <ContentSection>
        <p className="text-center max-w-3xl mx-auto md:mb-10">
          Mauris sollicitudin fermentum libero. Vestibulum fringilla pede sit
          amet augue. Ut varius tincidunt libero. Vivamus elementum semper nisi.
          Quisque id odio.
        </p>
        <div className="flex max-md:flex-wrap gap-4 mt-10">
          <div className="w-full md:w-1/3 md:order-1 md:mt-[-40px] md:mb-10 p-3 min-h-[60vh] flex justify-center items-center bg-start-2 bg-center bg-no-repeat bg-cover rounded-2xl">
            <div className="xl:w-2/3 p-4 bg-yellow-custom border-rounded flex flex-col items-center">
              <h4 className="text-green-custom text-center leading-9 my-3">
                Köp matpumpa?
              </h4>
              <p className="text-green-custom mb-4 text-center">
                Beställ de godaste sorterna!
              </p>
              <Link to={"/products/"}>
                <Button className="">
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
              <h4 className="text-green-custom text-center leading-9 my-3">
                Vad är matpumpa?
              </h4>
              <Link to={"/about/"}>
                <Button className="">
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
              <h4 className="text-green-custom text-center leading-9 my-3">
                Odlingstips & recept
              </h4>
              <Link to={"/growing/"}>
                <Button className="">
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
