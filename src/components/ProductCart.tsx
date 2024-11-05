import { useContext } from "react";
import AppContext, { CartItem } from "../context/AppContext";
import { Variation } from "../context/AppContext";
import { AmountSelector } from "./AmountSelector";

export const ProductCart = () => {
  const {
    cart,
    removeFromCart,
    clearCart,
    productVariations,
    updateCartItemQuantity,
  } = useContext(AppContext) ?? {
    cart: [],
    removeFromCart: () => {},
    clearCart: () => {},
    productVariations: {} as { [productId: number]: Variation[] },
    updateCartItemQuantity: () => {},
  };

  const getItemPrice = (item: CartItem) => {
    if (item.variationId) {
      const variation = productVariations[item.product.id].find(
        (v) => v.id === item.variationId
      );
      return parseFloat(variation?.price || "0");
    } else {
      return parseFloat(item.product.price);
    }
  };

  const orderTotal = cart.reduce((total, item) => {
    return total + getItemPrice(item) * item.quantity;
  }, 0);

  return (
    <>
      <ul>
        {cart.map((item) => (
          <li
            className="flex flex-row gap-2"
            key={
              item.product.id.toString() +
              (item.variationId !== undefined ? `-${item.variationId}` : "")
            }
          >
            <div>
              {item.product.name}
              {item.variationId &&
                ` - ${
                  productVariations[item.product.id]

                    .find((v) => v.id === item.variationId)
                    ?.attributes?.map((attr) => `${attr.option} kg`) || ""
                }
            `}{" "}
            </div>

            <div>
              à {getItemPrice(item)}
              {":-"}
            </div>
            <div>x {item.quantity}</div>
            <div>
              Total: {getItemPrice(item) * item.quantity}
              :-
            </div>

            <div>
              Välj antal:
              <AmountSelector
                initialQuantity={item.quantity}
                maxQuantity={
                  item.variationId
                    ? productVariations[item.product.id].find(
                        (v) => v.id === item.variationId
                      )?.stock_quantity || 0
                    : item.product.stock_quantity || 0 // Assuming item.product has a quantity property
                }
                onQuantityChange={(newQuantity) => {
                  updateCartItemQuantity(
                    item.product.id,
                    item.variationId,
                    newQuantity
                  );
                }}
              />
            </div>

            <div>
              <button
                onClick={() =>
                  removeFromCart(item.product.id, item.variationId)
                }
              >
                Ta bort
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div>Order total: {orderTotal}:-</div>
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
