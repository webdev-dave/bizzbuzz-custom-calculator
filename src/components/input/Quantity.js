import { useState } from "react";

const Quantity = ({ qty, id }) => {
  const [currentValue, setCurrentValue] = useState(qty);
  return (
    //outer div might be unnecessary 
    <div className="qty-sets qty">
      <input
        type="number"
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
        id={id}
        className="qty-input"
      />
    </div>
  );
};

export default Quantity;
