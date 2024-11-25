import { Link, NavLink } from "react-router-dom";
import { Ascend, MailOption, MapLocation, Phone } from "grommet-icons";
import { useEffect, useState } from "react";

export const Footer = () => {
  // Scroll to top appears on scroll
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 700) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <footer className="mt-auto bg-black/20">
        <section className="py-3 max-w-screen-xl mx-auto flex flex-col md:flex-row">
          <article className="my-5 px-5 flex flex-col md:flex-1 items-center md:items-start">
            <h4 className="mb-3">Kontakta oss!</h4>
            <div className="flex flex-col gap-y-1 max-md:items-center">
              <div>
                <Link className="flex flex-row items-center" to={"#"}>
                  <Phone
                    aria-label="phone"
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
                    aria-label="map-location"
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
                    aria-label="mail-option"
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
              <Link to={"/"}>Köpvillkor</Link>
            </div>
            <div>
              <Link to={"/"}>Integritetspolicy</Link>
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
        <div className="relative">
          {showScrollToTop && (
            <button
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: "smooth", // Add smooth behavior
                })
              }
              className="fixed bottom-3 right-3 p-2 bg-green-custom/70"
            >
              <Ascend
                color="plain"
                size="2rem"
                className="[&>path]:fill-yellow-custom-link [&>path]:stroke-yellow-custom-link"
              ></Ascend>
            </button>
          )}
        </div>
      </footer>
    </>
  );
};
