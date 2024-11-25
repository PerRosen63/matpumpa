import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";

export const OrderConfirmation = () => {
  const { orderId } = useContext(AppContext)!;

  const [orderStatus, setOrderStatus] = useState<
    "sending" | "success" | "error"
  >("sending");

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (orderId) {
      setOrderStatus("success");

      // Redirect after a delay (optional)
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }
  }, [orderId, navigate]);

  return (
    <>
      <div className="container mx-auto mt-10 text-center">
        {orderStatus === "sending" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Skickar order...</h2>
            <div className="loader"></div>{" "}
          </div>
        )}

        {orderStatus === "success" && (
          <div>
            <h2 className="text-3xl font-bold text-green-500 mb-4">
              Tack för din beställning!
            </h2>
            <p>Du kommer att omdirigeras till startsidan om 5 sekunder.</p>
          </div>
        )}

        {orderStatus === "error" && (
          <div>
            <h2 className="text-3xl font-bold text-red-500 mb-4">
              Oj, något gick fel!
            </h2>
            <p>Var god försök igen senare.</p>
          </div>
        )}
      </div>
    </>
  );
};
