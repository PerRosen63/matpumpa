import { useState } from "react";
import { NavLink } from "react-router-dom";

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
        <div className="border relative flex flex-row justify-between items-center max-w-screen-xl mx-auto p-5">
          <div className="max-w-48">
            <img
              width="250"
              height="auto"
              src="https://mfdm.se/woo/wp-content/uploads/logga.svg"
              alt=""
            />
          </div>
          <div>
            <button
              onClick={toggleMenu}
              className="absolute right-3 top-3 z-10 md:hidden text-yellow-custom hover:text-white focus:text-white focus:outline-none"
            >
              <svg className="h-11 w-11 fill-current" viewBox="0 0 24 24">
                {isOpen ? (
                  <path
                    fillRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  />
                )}
              </svg>
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
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};
