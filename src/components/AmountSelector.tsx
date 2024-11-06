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
      <div className="flex flex-row gap-2">
        <button
          className="bg-yellow-custom text-black p-2"
          onClick={handleDecrease}
          disabled={quantity <= 1}
        >
          -
        </button>
        <span className="p-2">{quantity}</span>
        <button
          className="bg-yellow-custom text-black p-2"
          onClick={handleIncrease}
          disabled={quantity >= maxQuantity}
        >
          +
        </button>
      </div>
    </>
  );
};
