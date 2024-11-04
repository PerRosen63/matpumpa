import { useContext } from "react";
import AppContext from "../context/AppContext";
import { Variation } from "../context/AppContext";

export const ProductCart = () => {
  const { cart, removeFromCart, clearCart, productVariations } = useContext(
    AppContext
  ) ?? {
    cart: [],
    removeFromCart: () => {},
    clearCart: () => {},
    productVariations: {} as { [productId: number]: Variation[] },
  };

  return (
    <>
      <ul>
        {cart.map((item) => (
          <li
            key={
              item.product.id.toString() +
              (item.variationId !== undefined ? `-${item.variationId}` : "")
            }
          >
            {item.product.name}
            {item.variationId &&
              ` - ${
                productVariations[item.product.id]

                  .find((v) => v.id === item.variationId)
                  ?.attributes?.map((attr) => `${attr.option} kg`) || ""
              }
            `}{" "}
            x {item.quantity}
            <button
              onClick={() => removeFromCart(item.product.id, item.variationId)}
            >
              Ta bort
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={clearCart}
        className="bg-yellow-custom text-black p-5 m-5"
      >
        Rensa
      </button>
      <button className="bg-yellow-custom text-black p-5 m-5">
        Skicka order
      </button>
    </>
  );
};
