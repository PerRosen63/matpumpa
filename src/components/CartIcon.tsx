import AppContext from "@/context/AppContext";
import { Basket } from "grommet-icons";
import { useContext } from "react";

export const CartIcon = () => {
  const { amountTotal } = useContext(AppContext) ?? { amountTotal: 0 };

  return (
    <>
      <div className="relative">
        <Basket
          aria-label="basket"
          color="plain"
          size="2rem"
          className="[&>path]:fill-yellow-custom-link [&>path]:stroke-yellow-custom-link"
        ></Basket>
        <p
          className={`text-base absolute top-0 ${
            amountTotal < 10 ? "pl-2" : "pl-1"
          } px-1.5 pt-0.5 left-2/3 block w-6 h-6 bg-orange-custom rounded-full`}
        >
          {amountTotal}
        </p>
      </div>
    </>
  );
};
