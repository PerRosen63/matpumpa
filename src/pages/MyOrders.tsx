import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { Order } from "../context/AppContext";

export const MyOrders = () => {
  const { fetchOrders = async () => {}, orders = [] } =
    useContext(AppContext) ?? {};

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getOrders = async () => {
      setIsLoading(true);
      await fetchOrders();
      setIsLoading(false);
    };

    getOrders();
  }, [fetchOrders]);

  return (
    <>
      <h1>Mina ordrar</h1>
      {isLoading ? (
        <div>Laddar ordrar...</div>
      ) : (
        <ul>
          {orders.map((order: Order) => (
            <li key={order.id}>
              <p>Order-id: {order.id}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
