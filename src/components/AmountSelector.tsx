import { useEffect, useState } from "react";

interface AmountSelectorProps {
  initialQuantity?: number;
  maxQuantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

export const AmountSelector: React.FC<AmountSelectorProps> = ({
  initialQuantity = 1,
  maxQuantity,
  onQuantityChange,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    //  if (quantity > maxQuantity) {
    setQuantity(initialQuantity);
    //  }
  }, [initialQuantity, maxQuantity]);

  const handleIncrease = () => {
    const newQuantity = Math.min(quantity + 1, maxQuantity);
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  const handleDecrease = () => {
    const newQuantity = Math.max(quantity - 1, 1);
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  return (
    <>
      <div className="text-xl flex flex-row gap-3 max-lg:justify-center align-middle">
        <button
          className="bg-yellow-custom text-black px-5 py-3"
          onClick={handleDecrease}
          disabled={quantity <= 1}
        >
          -
        </button>
        <span className="w-8 py-3 text-center">{quantity}</span>
        <button
          className="bg-yellow-custom text-black px-5 py-3"
          onClick={handleIncrease}
          disabled={quantity >= maxQuantity}
        >
          +
        </button>
      </div>
    </>
  );
};
