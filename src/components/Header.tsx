import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <header>
        <div className="border flex flex-row max-w-screen-xl mx-auto p-5">
          <div>
            <img
              width="250"
              height="auto"
              src="https://mfdm.se/woo/wp-content/uploads/logga.svg"
              alt=""
            />
          </div>
          <div>
            <nav className="">
              <ul className=" flex flex-row [&>li]:px-4 font-sans small-caps text-2xl text-yellow-custom-link hover:[&>li]:text-yellow-custom">
                <li>
                  <NavLink to={"/"}>Hem</NavLink>
                </li>
                <li>
                  <NavLink to={"/about"}>Om pumpor</NavLink>
                </li>
                <li>
                  <NavLink to={"/growing"}>Odling & recept</NavLink>
                </li>
                <li>
                  <NavLink to={"/products"}>Köp här</NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};
