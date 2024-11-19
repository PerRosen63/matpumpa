import { Link, NavLink } from "react-router-dom";
import { MailOption, MapLocation, Phone } from "grommet-icons";

export const Footer = () => {
  return (
    <>
      <footer className="bg-black/20">
        <section className="py-3 max-w-screen-xl mx-auto flex flex-col md:flex-row">
          <article className="my-5 px-5 flex flex-col md:flex-1 items-center md:items-start">
            <h4 className="mb-3">Kontakta oss!</h4>
            <div className="flex flex-col gap-y-1">
              <div>
                <Link className="flex flex-row items-center" to={"#"}>
                  <Phone
                    color="plain"
                    size="1rem"
                    className="[&>path]:fill-yellow-custom-link [&>path]:stroke-yellow-custom-link"
                  ></Phone>
                  <p className="mx-2 my-0">123-456 789</p>
                </Link>
              </div>
              <div>
                <Link className="flex flex-row items-center" to={"#"}>
                  <MapLocation
                    color="plain"
                    size="1rem"
                    className="[&>path]:stroke-yellow-custom-link"
                  ></MapLocation>
                  <p className="mx-2 my-0">Vägen 123, 123 45 Staden</p>
                </Link>
              </div>
              <div>
                <Link className="flex flex-row items-center" to={"#"}>
                  <MailOption
                    color="plain"
                    size="1rem"
                    className="[&>path]:stroke-yellow-custom-link"
                  ></MailOption>
                  <p className="mx-2 my-0">pumpa@matpumpa.se</p>
                </Link>
              </div>
            </div>
          </article>
          <article className="my-5 px-5 flex flex-col md:flex-1 md:order-2 items-center md:items-start">
            <h4 className="mb-3">Övrigt</h4>
            <nav>
              <div>
                <NavLink to={"/orders"}>Mina ordrar</NavLink>
              </div>
            </nav>
            <div>
              <Link to={"#"}>Köpvillkor</Link>
            </div>
            <div>
              <Link to={"#"}>Integritetspolicy</Link>
            </div>
          </article>
          <article className="my-5 px-5 flex flex-col md:max-lg:max-w-56 md:flex-1 md:order-1 items-center justify-center flex-wrap md:border-x">
            <NavLink to={"/"}>
              <img
                width="100"
                height="auto"
                src="https://mfdm.se/woo/wp-content/uploads/logga.svg"
                alt="logo"
              />
            </NavLink>
          </article>
        </section>
        <section className="py-1 w-full bg-black/20">
          <div className="max-w-screen-xl mx-auto">
            <p className="text-center m-3">
              © 2024 | matpumpa.se | All Rights Reserved.
            </p>
          </div>
        </section>
      </footer>
    </>
  );
};
