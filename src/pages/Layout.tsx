import { Outlet /* , useLocation */ } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const Layout = () => {
  return (
    <>
      <div className="flex flex-col text-yellow-custom min-h-screen">
        <Header></Header>

        <main>
          <div className="flex flex-col max-w-screen-xl mx-auto max-[1330px]:px-4 mt-10 mb-16">
            <Outlet></Outlet>
          </div>
        </main>
        <Footer></Footer>
      </div>
    </>
  );
};
