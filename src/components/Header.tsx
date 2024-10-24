import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <header>
        <div className="border flex flex-row justify-between items-center max-w-screen-xl mx-auto p-5">
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
              <ul className=" flex flex-row [&>li>a]:px-4 font-sans small-caps text-2xl text-yellow-custom-link hover:[&>li>a]:text-yellow-custom hover:[&>li>:not(a.active)]:bg-black/20 [&>li>a.active]:text-yellow-custom [&>li>a.active]:bg-black/20">
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
