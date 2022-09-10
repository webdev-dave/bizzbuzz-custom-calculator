import { useState } from "react";

const Quantity = ({ value, id }) => {
    const [currentValue, setCurrentValue] = useState(value);
  return (
    <div class="qty-sets qty">
      <input type="checkbox" className="qty-checkbox" value="" />
      <input type="text" value={currentValue} onChange={(e)=> setCurrentValue(e.target.value)} id={id} classNameg="qty-input" />
    </div>
  );
};

export default Quantity;
