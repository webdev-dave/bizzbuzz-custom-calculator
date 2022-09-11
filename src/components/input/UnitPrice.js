import { useState } from "react";

const UnitPrice = ({id}) => {
  const [currentPrice, setCurrentPrice] = useState("");
  return (
    <div className="unit-price" id={id}>
      <label htmlFor="unit-price-1"></label>
      <input type="number" id="unit-price-1" className="unit-price" value={currentPrice} onChange={(e)=>setCurrentPrice(e.target.value)} />
    </div>
  );
};

export default UnitPrice;
