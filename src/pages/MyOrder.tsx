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

      <ul>
        {order.line_items.map((item) => (
          <li>
            <Link to={"/product/" + item.product_id}>{item.name}</Link>
          </li>
        ))}
      </ul>
      <p>Total: {order?.total}</p>
    </>
  );
};
