import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Wave } from "../assets/Wave";
import { Hamburger } from "../assets/Hamburger";
import AppContext from "../context/AppContext";

import { CartIcon } from "./CartIcon";

export const Header = () => {
  const { amountTotal } = useContext(AppContext) ?? { amountTotal: 0 };
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const hamRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
    console.log("click");
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node) &&
        hamRef.current &&
        event.target !== hamRef.current
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header>
        <div className="relative">
          <Wave></Wave>

          <div className="relative flex flex-row justify-between items-center max-w-screen-xl mx-auto p-5 min-[1330px]:px-0">
            <div className="max-w-36 md:max-w-48">
              <NavLink to={"/"}>
                <img
                  width="250"
                  height="auto"
                  src="https://mfdm.se/woo/wp-content/uploads/logga.svg"
                  alt="logotype"
                />
              </NavLink>
            </div>
            <div>
              <button
                ref={hamRef}
                onClick={toggleMenu}
                className="fixed bg-green-custom shadow-md right-3 top-3 z-10 lg:hidden text-yellow-custom hover:text-white focus:text-white focus:outline-none"
              >
                <Hamburger isOpen={isOpen}></Hamburger>
              </button>
            </div>
            <div className="">
              <Link
                to={"/cart/"}
                className="lg:hidden absolute right-0 bottom-0 pr-5 pb-2 font-sans leading-[2.75rem] px-4"
              >
                <CartIcon></CartIcon>
              </Link>
            </div>

            <div>
              <nav
                ref={navRef}
                className={`w-full max-lg:fixed left-0 top-0 bg-green-custom max-md:w-full max-lg:shadow-md border-gray-700 max-lg:duration-[400ms] ease-in-out ${
                  isOpen
                    ? "max-lg:translate-y-0 max-lg:opacity-100"
                    : "max-lg:-translate-y-full max-lg:opacity-0"
                } ${isOpen ? "block" : ""}`}
              >
                <ul
                  className={`flex flex-col lg:flex-row font-sans small-caps text-clamp-h6 text-yellow-custom-link`}
                >
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
                      <span className="max-lg:hidden">
                        <CartIcon></CartIcon>
                      </span>
                      <span className="lg:hidden">
                        Varukorg: {amountTotal} st
                      </span>
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
