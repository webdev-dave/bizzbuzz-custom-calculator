import { useState } from "react";

const Quantity = ({ qty, id }) => {
  const [currentValue, setCurrentValue] = useState(qty);
  return (
    <div className="qty-sets qty">
      <input type="checkbox" className="qty-checkbox" />
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
