import { Header } from "@/components/Header";
import { useEffect } from "react";

export const NotFound = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header></Header>
      <h4 className="text-center text-yellow-custom mt-12">
        Sidan eller produkten saknas!
      </h4>
    </>
  );
};
