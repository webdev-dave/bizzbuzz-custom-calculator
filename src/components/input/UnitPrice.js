import { useState } from "react";

const UnitPrice = ({id, columnIndex, maxSpan}) => {
  const [currentPrice, setCurrentPrice] = useState("");
  return (
    <div className={`unit-price ${maxSpan ? "max-span" : ""}`}  id={id}>
      <label htmlFor="unit-price-1"></label>
      <input type="number" id="unit-price-1" value={currentPrice} onChange={(e)=>setCurrentPrice(e.target.value)} />
    </div>
  );
};

export default UnitPrice;
