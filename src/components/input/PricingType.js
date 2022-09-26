import { useSelector, useDispatch } from "react-redux";
import { selectPricingType, updatePricingType } from "../main/mainSlice";

const PricingType = () => {
  const dispatch = useDispatch();
  const pricingType = useSelector(selectPricingType);

  const handleChange = (e) => {
    //- when pricing type changes from non EQP to EQP make sure all "results" values update accordingly (based on unit cost in col-0)
    //solution would be to call updateUnitCost and updateUnitCode (and resubmit the current unitCost and unitCode values) for each column (besides column 0)
    //this would recalculate all the results based on the state rules for updating UCost and UCode when pricingType is EQP
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
