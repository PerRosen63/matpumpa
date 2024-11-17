import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const Layout = () => {
  return (
    <>
      <div className="text-yellow-custom">
        <Header></Header>

        <main>
          <div className="max-w-screen-xl mx-auto max-[1330px]:px-4 mt-10 mb-16">
            <Outlet></Outlet>
          </div>
        </main>
        <Footer></Footer>
      </div>
    </>
  );
};
