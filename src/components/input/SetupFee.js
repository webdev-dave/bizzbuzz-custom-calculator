import { useSelector, useDispatch } from "react-redux";
import { removeUnnecessaryZeros } from "../../utils/helpers/helperFunctions";
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
      value={removeUnnecessaryZeros(setupFee)}
      onChange={handleChange}
      onWheel={(e) => e.target.blur()}
    />
  );
};

export default SetupFee;
