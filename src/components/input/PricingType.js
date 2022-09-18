import { useSelector, useDispatch } from "react-redux";
import { selectPricingType, updatePricingType } from "../main/mainSlice";

const PricingType = () => {
  const dispatch = useDispatch();
  const pricingType = useSelector(selectPricingType);

  const handleChange = (e) => {
    dispatch(updatePricingType({ value: e.target.value }));
  };
  return (
    <select
      className="pricing-type selector"
      value={pricingType}
      onChange={handleChange}
    >
      <option value={"EQP"}>EQP</option>
      <option value={"EQP-1%"}>EQP-1%</option>
      <option value={"EQP-2%"}>EQP-2%</option>
      <option value={"EQP-3%"}>EQP-3%</option>
      <option value={"EQP-5"}>EQP-5%</option>
      <option value={"Non-EQP"}>Non-EQP</option>
    </select>
  );
};

export default PricingType;
