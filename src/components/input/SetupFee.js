import { useSelector, useDispatch } from "react-redux";
import { handleFocus } from "../../utils/helpers/helperFunctions";
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
      className="setup-fee input-data"
      type="number"
      value={setupFee}
      onChange={handleChange}
      onFocus={handleFocus}
      onWheel={(e) => e.target.blur()}
      tabIndex="11"
    />
  );
};

export default SetupFee;
