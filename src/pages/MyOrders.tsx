import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { Order } from "../context/AppContext";
import { Link, useLocation, useParams } from "react-router-dom";
import { MyOrder } from "./MyOrder";
import { TitleSection } from "../style_components/TitleSection";

export const MyOrders = () => {
  const {
    fetchOrders = async () => {},
    orders = [],
    // hasFetchedOrders,
  } = useContext(AppContext) ?? {};

  const [isLoading, setIsLoading] = useState(true);
  const [showOrderList, setShowOrderList] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const getOrders = async () => {
      //if (!hasFetchedOrders) {
      setIsLoading(true);
      await fetchOrders();
      setIsLoading(false);
      //}
    };

    getOrders();
  }, [fetchOrders /* , hasFetchedOrders */]);

  // Access the id from the URL parameters
  const { id } = useParams<{ id: string }>();
  const orderId = parseInt(id!, 10);

  const order = orders.find((order) => order.id === orderId);

  useEffect(() => {
    if (location.pathname.startsWith("/order/")) {
      setShowOrderList(false);
    } else if (location.pathname === "/orders") {
      setShowOrderList(true);
    }
  }, [location]);

  return (
    <>
      {isLoading ? (
        <div>Laddar...</div>
      ) : (
        <>
          {showOrderList && (
            <>
              <TitleSection>Mina ordrar</TitleSection>

              <ul>
                {orders.map((order: Order) => (
                  <li key={order.id}>
                    <Link
                      to={`/order/${order.id}`}
                      onClick={() => setShowOrderList(false)}
                    >
                      <p>Order-id: {order.id}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
          {!showOrderList && order && (
            <>
              <MyOrder order={order} setShowOrderList={setShowOrderList} />
              {/* <p>
                <Link to={"/orders"}>Se alla</Link>
              </p> */}
            </>
          )}
        </>
      )}
    </>
  );
};
