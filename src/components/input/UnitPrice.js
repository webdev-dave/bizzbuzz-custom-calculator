import { useState } from "react";

const UnitPrice = () => {
  const [currentPrice, setCurrentPrice] = useState("");
  return (
    <div className="unit-price">
      <label for="unit-price-1"></label>
      <input type="text" id="unit-price-1" className="qty-input" />
    </div>
  );
};

export default UnitPrice;
