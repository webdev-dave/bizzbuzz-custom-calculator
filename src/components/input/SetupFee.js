import { useSelector, useDispatch } from "react-redux";
import {selectSetupFee, updateNetUnitCost, updateSetupFee, } from "../main/mainSlice"

const SetupFee = () => {
  const dispatch = useDispatch();
  const setupFee = useSelector(selectSetupFee);
  const handleChange = (e) => {
    dispatch(updateSetupFee({value: e.target.value}));
    dispatch(updateNetUnitCost({}));
  }
 
  return (
    <input
      className="setup-fee"
      type="number"
      value={setupFee}
      onChange={handleChange}
    />
  );
};

export default SetupFee;
