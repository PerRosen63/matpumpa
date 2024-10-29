import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const Layout = () => {
  return (
    <>
      <div className="text-yellow-custom">
        <Header></Header>

        <main>
          <div className="border max-w-screen-xl mx-auto">
            <Outlet></Outlet>
          </div>
        </main>
        <Footer></Footer>
      </div>
    </>
  );
};
