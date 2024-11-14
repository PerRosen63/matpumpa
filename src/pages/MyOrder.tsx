import { Link, useParams } from "react-router-dom";
import { Order } from "../context/AppContext";
import { useEffect } from "react";

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
      <h1>Order nr: {orderId}</h1>
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
              className="flex flex-row gap-2 items-center"
              key={item.product_id}
            >
              {
                <div>
                  <img width="100" src={modifiedSrc} alt="" />
                </div>
              }
              <Link to={"/product/" + item.product_id}>
                {item.name}
                {item.variation_id > 0 && " kg"}
              </Link>

              <p>{`${item.price}:- x ${item.quantity}`}</p>
              <p>{item.total}</p>
            </li>
          );
        })}
      </ul>
      <p>Total: {order?.total}</p>
    </>
  );
};
