import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Wave } from "../assets/Wave";
import { Hamburger } from "../assets/Hamburger";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header>
        <div className="relative">
          <Wave></Wave>

          <div className="relative flex flex-row justify-between items-center max-w-screen-xl mx-auto p-5">
            <div className="max-w-36 md:max-w-48">
              <NavLink to={"/"}>
                <img
                  width="250"
                  height="auto"
                  src="https://mfdm.se/woo/wp-content/uploads/logga.svg"
                  alt=""
                />
              </NavLink>
            </div>
            <div>
              <button
                onClick={toggleMenu}
                className="absolute right-3 top-3 z-10 md:hidden text-yellow-custom hover:text-white focus:text-white focus:outline-none"
              >
                <Hamburger isOpen={isOpen}></Hamburger>
              </button>
            </div>

            <div>
              <nav
                className={`max-md:absolute left-0 top-0 bg-green-custom max-md:w-full max-md:border-b-2 border-gray-700 ${
                  isOpen ? "block" : "max-md:hidden max-md:sr-only"
                }`}
              >
                <ul className="flex flex-col md:flex-row font-sans small-caps text-clamp-h6 text-yellow-custom-link">
                  <li className="py-2">
                    <NavLink
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        [
                          "block h-11 leading-[2.75rem] px-4 hover:text-yellow-custom hover:bg-black/20",
                          isActive ? "bg-black/20" : "bg-transparent",
                        ].join(" ")
                      }
                      to={"/"}
                    >
                      Hem
                    </NavLink>
                  </li>
                  <li className="py-2">
                    <NavLink
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        [
                          "block h-11 leading-[2.75rem] px-4 hover:text-yellow-custom hover:bg-black/20",
                          isActive ? "bg-black/20" : "bg-transparent",
                        ].join(" ")
                      }
                      to={"/about"}
                    >
                      Om pumpor
                    </NavLink>
                  </li>
                  <li className="py-2">
                    <NavLink
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        [
                          "block h-11 leading-[2.75rem] px-4 hover:text-yellow-custom hover:bg-black/20",
                          isActive ? "bg-black/20" : "bg-transparent",
                        ].join(" ")
                      }
                      to={"/growing"}
                    >
                      Odling & recept
                    </NavLink>
                  </li>
                  <li className="py-2">
                    <NavLink
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        [
                          "block h-11 leading-[2.75rem] px-4 hover:text-yellow-custom hover:bg-black/20",
                          isActive ? "bg-black/20" : "bg-transparent",
                        ].join(" ")
                      }
                      to={"/products"}
                    >
                      Köp här
                    </NavLink>
                  </li>
                  <li className="py-2">
                    <NavLink
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        [
                          "block h-11 leading-[2.75rem] px-4 hover:text-yellow-custom hover:bg-black/20",
                          isActive ? "bg-black/20" : "bg-transparent",
                        ].join(" ")
                      }
                      to={"/cart"}
                    >
                      Varukorg
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="h-1 bg-orange-custom"></div>
        <div className="hidden md:block">
          <div className="square h-5 my-1 border-t-2 border-green-custom "></div>
          <div className="square h-5 my-1 "></div>
          <div className="square h-5 "></div>
        </div>
      </header>
    </>
  );
};
