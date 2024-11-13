import { useParams } from "react-router-dom";
import { Order } from "../context/AppContext";

interface OrderProps {
  order: Order;
}

export const MyOrder: React.FC<OrderProps> = ({ order }) => {
  const { id } = useParams<{ id: string }>();
  const orderId = parseInt(id!, 10);

  return (
    <>
      <h1>Order nr: {orderId}</h1>
      <p>Total: {order?.total}</p>
    </>
  );
};
