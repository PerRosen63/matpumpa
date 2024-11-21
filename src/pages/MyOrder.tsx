import { Link, useParams } from "react-router-dom";
import { Order } from "../context/AppContext";
import { useEffect } from "react";
import { ContentSectionNarrow } from "@/style_components/ContentSectionNarrow";

interface OrderProps {
  order: Order;
  setShowOrderList: (show: boolean) => void;
}

export const MyOrder: React.FC<OrderProps> = ({ order, setShowOrderList }) => {
  const { id } = useParams<{ id: string }>();
  const orderId = parseInt(id!, 10);

  useEffect(() => {
    setShowOrderList(false);
  }, [setShowOrderList]);

  return (
    <>
      <ContentSectionNarrow>
        <div className="max-w-xl w-full mx-auto">
          <h4>Order nr: {orderId}</h4>
          <p className="py-3">
            <Link to={"/orders"}>Se alla dina ordrar</Link>
          </p>
          <ul>
            {order.line_items.map((item) => {
              const lastDotIndex = item.image.src.lastIndexOf(".");
              const modifiedSrc = `${item.image.src.slice(
                0,
                lastDotIndex
              )}-300x300${item.image.src.slice(lastDotIndex)}`;

              return (
                <li
                  className="flex flex-row gap-2 my-2 items-center justify-between"
                  key={item.product_id}
                >
                  <div>
                    <div>
                      <Link to={"/product/" + item.product_id}>
                        {item.name}
                        {item.variation_id > 0 && " kg"}
                      </Link>
                    </div>
                    <div>
                      <span>{`${item.price}:- x ${item.quantity}`}</span>
                    </div>
                    <div>
                      <span>{item.total}</span>
                    </div>
                  </div>
                  {
                    <div>
                      {item.product_id > 0 ? (
                        <img width="100" src={modifiedSrc} alt={item.name} />
                      ) : (
                        <img
                          width="100"
                          src="https://mfdm.se/woo/wp-content/uploads/woocommerce-placeholder-300x300.png"
                          alt="placeholder missing image"
                        />
                      )}
                    </div>
                  }{" "}
                </li>
              );
            })}
          </ul>{" "}
          <div>
            <p className="text-lg font-semibold">Total: {order?.total}</p>
          </div>
        </div>
      </ContentSectionNarrow>
    </>
  );
};
