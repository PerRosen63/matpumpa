import { NavLink, Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to={"/"}>Hem</NavLink>
            </li>
            <li>
              <NavLink to={"/products"}>Pumpor</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
      <footer></footer>
    </>
  );
};
