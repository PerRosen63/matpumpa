import { useContext } from "react";
import AppContext, { CartItem } from "../context/AppContext";
import { Variation } from "../context/AppContext";
import { AmountSelector } from "./AmountSelector";
import { useNavigate } from "react-router-dom";
import { FormRefresh, Trash } from "grommet-icons";
import { Button } from "@/style_components/Button";

export const ProductCart = () => {
  const {
    preliminaryCart,
    removeFromCart,
    clearCart,
    productVariations,
    updateCartItemQuantity,
    amountTotal,
  } = useContext(AppContext) ?? {
    preliminaryCart: [],
    removeFromCart: () => {},
    clearCart: () => {},
    productVariations: {} as { [productId: number]: Variation[] },
    updateCartItemQuantity: () => {},
    amountTotal: 0,
    createOrder: async () => {},
  };

  const context = useContext(AppContext); // Get the entire context object
  const navigate = useNavigate();

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

  const priceTotal = preliminaryCart.reduce((total, item) => {
    return total + getItemPrice(item) * item.quantity;
  }, 0);

  return (
    <>
      <ul className="flex flex-col">
        {preliminaryCart.map((item) => (
          <li
            className="even:bg-black/15 odd:bg-black/5 flex flex-row justify-between items-center p-2 [&>div]:p-1 [&>div]:whitespace-nowrap [&>div]:flex max-lg:flex-wrap"
            key={`${item.product.id}-${item.variationId || ""}`}
          >
            <div className="w-9/12 md:w-7/12 lg:2/12 text-lg font-sans">
              {item.product.name}
              {item.variationId &&
                ` - ${
                  productVariations[item.product.id]

                    .find((v) => v.id === item.variationId)
                    ?.attributes?.map((attr) => `${attr.option} kg`) || ""
                }
            `}{" "}
            </div>
            <div className="w-2/12 justify-end">
              à {getItemPrice(item)}
              {":-"}
            </div>
            <div className="w-1/12 justify-end">
              <span>x</span>
              {item.quantity}
            </div>
            <div className="w-full md:w-2/12 justify-end">
              Total: {getItemPrice(item) * item.quantity}
              :-
            </div>
            <div className="w-10/12 lg:w-4/12 md:justify-end [&>div>span]:text-base [&>div>button]:py-2 flex items-center">
              <span className="mr-2">Ändra: </span>
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
            <div className="w-2/12 lg:w-1/12 justify-end">
              <button
                className="size-11"
                onClick={() =>
                  removeFromCart(item.product.id, item.variationId)
                }
              >
                <Trash
                  aria-label="Ta bort"
                  color="plain"
                  size="2rem"
                  className="[&>path]:fill-yellow-custom-link [&>path]:stroke-yellow-custom-link"
                >
                  Ta bort
                </Trash>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="text-right mt-2">
        <span>Totalt antal: {amountTotal}</span>
      </div>
      <div className="text-right font-bold">
        <span>Order total: {priceTotal}:-</span>
      </div>

      {context ? ( // Conditional rendering based on context availability
        <>
          <div className="flex pt-5 flex-col items-center">
            <Button
              variant="secondary"
              onClick={async () => {
                navigate("/order-confirmation");
                await context.createOrder();
              }}
              disabled={preliminaryCart.length === 0}
            >
              Skicka order
            </Button>

            <button
              className="mt-3 disabled:opacity-40"
              onClick={clearCart}
              disabled={preliminaryCart.length === 0}
            >
              <FormRefresh
                color="plain"
                size="2rem"
                className="ml-[-0.6rem] [&>path]:stroke-yellow-custom-link"
              ></FormRefresh>
              Rensa
            </button>
          </div>
        </>
      ) : (
        <div>Vi har tekniska problem. Var god försök senare!</div>
      )}
    </>
  );
};
