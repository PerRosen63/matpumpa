import { NavLink, Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <div className="text-yellow-custom">
        <header>
          <nav>
            <ul>
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
        </header>
        <main>
          <div className="border max-w-screen-xl mx-auto">
            <Outlet></Outlet>
          </div>
        </main>
        <footer></footer>
      </div>
    </>
  );
};
