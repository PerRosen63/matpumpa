import { useEffect } from "react";
import { ProductCart } from "../components/ProductCart";
import { TitleSection } from "../style_components/TitleSection";

export const CartPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <TitleSection>Varukorg</TitleSection>

      <section>
        <ProductCart></ProductCart>
      </section>
    </>
  );
};
