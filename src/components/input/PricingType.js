import { useState } from "react";

const PricingType = () => {
  const [currentSelection, setCurrentSelection] = useState("EQP");
  return (
    <select
      className="pricing-type"
      id="pricing-type-selector"
      value={currentSelection}
      onChange={(e) => setCurrentSelection(e.target.value)}
    >
      <option>EQP</option>
      <option>EQP-1%</option>
      <option>EQP-2%</option>
      <option>EQP-3%</option>
      <option>EQP-5%</option>
      <option>Non EQP</option>
    </select>
  );
};

export default PricingType;
