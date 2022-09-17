import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPricingType, updatePricingType } from "./inputSlice";

const PricingType = () => {
  const dispatch = useDispatch();
  const storePricingType = useSelector(selectPricingType);
  const [currentSelection, setCurrentSelection] = useState(storePricingType);
  const handleChange = (e) => {
    dispatch(updatePricingType(e.target.value));
    setCurrentSelection(e.target.value);
  }
  return (
    <select
      className="pricing-type selector"
      value={currentSelection}
      onChange={handleChange}
    >
      <option>EQP</option>
      <option>EQP-1%</option>
      <option>EQP-2%</option>
      <option>EQP-3%</option>
      <option>EQP-5%</option>
      <option>Non-EQP</option>
    </select>
  );
};

export default PricingType;
