import { useState } from "react";

const UnitPrice = () => {
  const [currentPrice, setCurrentPrice] = useState("");
  return (
    <div className="unit-price">
      <label htmlFor="unit-price-1"></label>
      <input type="number" id="unit-price-1" className="qty-input" value={currentPrice} onChange={(e)=>setCurrentPrice(e.target.value)} />
    </div>
  );
};

export default UnitPrice;
