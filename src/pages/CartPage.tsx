import { ProductCart } from "../components/ProductCart";
import { TitleSection } from "../style_components/TitleSection";

export const CartPage = () => {
  return (
    <>
      <TitleSection>Varukorg</TitleSection>

      <section>
        <ProductCart></ProductCart>
      </section>
    </>
  );
};
