import config from "../config.ts";
import { useContext, /* useEffect,  */ useState } from "react";
import AppContext from "../context/AppContext";

export const ProductOrderForm = () => {
  const {
    selectedProduct,
    loading,
    /* fetchProduct,  */ productVariations,
    updateProductStock,
  } = useContext(AppContext) ?? {
    selectedProduct: null,
    loading: true,
    // fetchProduct: () => {},
    productVariations: {},
    updateProductStock: () => {},
  };

  const [selectedVariationId, setSelectedVariationId] = useState<number | null>(
    null
  );

  const variations = selectedProduct
    ? productVariations[selectedProduct.id] || []
    : [];

  const handleVariationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedVariationId(parseInt(event.target.value, 10));
  };

  const handleAddToCart = async () => {
    if (!selectedProduct) return;

    const newStockQuantity = selectedProduct.stock_quantity
      ? selectedProduct.stock_quantity - 1
      : 0; // Or handle out-of-stock case differently

    try {
      const response = await fetch(
        `${config.baseUrl}/${selectedProduct.id}?consumer_key=${config.consumerKey}&consumer_secret=${config.consumerSecret}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            stock_quantity: newStockQuantity,
          }),
          /* body: JSON.stringify({
            stock_quantity: selectedProduct.stock_quantity
              ? selectedProduct.stock_quantity - 1
              : null,
          }), */
        }
      );
      if (response.ok) {
        updateProductStock(selectedProduct.id, newStockQuantity);
        // fetchProduct(selectedProduct.id);
        console.log("Stock updated!");
      } else {
        console.error("Failed stock update!");
      }
    } catch (error) {
      console.error("Error updating stock quantity:", error);
    }
  };

  /* useEffect(() => {
    if (variations.length > 0) {
      setSelectedVariationId(variations[0].id); // Select the first variation by default
    }
  }, [variations]); */

  return (
    <>
      {loading || !variations.length ? (
        <div>Loading variations...</div>
      ) : (
        <div>
          <select
            className="bg-green-custom"
            value={selectedVariationId || ""}
            onChange={handleVariationChange}
          >
            <option value="">Välj pumpa:</option>
            {variations.map(
              (variation) =>
                variation.stock_quantity > 0 && (
                  <option key={variation.id} value={variation.id}>
                    {variation.attributes?.map((attr) => `${attr.option} kg`)}{" "}
                    <span>({variation.stock_quantity})</span>
                  </option>
                )
            )}
          </select>

          <p>
            Pris:{" "}
            {selectedVariationId !== null &&
              variations.find((v) => v.id === selectedVariationId)?.price +
                `:-`}
          </p>
        </div>
      )}
      <div>
        <button
          className="bg-yellow-custom text-black p-5 m-5"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
        <strong>
          {selectedProduct?.stock_status === "instock"
            ? "I lager"
            : "Slut i lager"}
        </strong>
      </div>
    </>
  );
};
