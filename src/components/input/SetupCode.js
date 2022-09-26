import { useSelector, useDispatch } from "react-redux";
import { setupCodes } from "../../assets/helpers/helperArrays";
import { selectSetupCode, selectSetupFee, updateSetupCode, updateSetupFee } from "../main/mainSlice";

const SetupCode = () => {
  const dispatch = useDispatch();
  const setupCode = useSelector(selectSetupCode);
  const setupFee = useSelector(selectSetupFee);
  const handleChange = (e) => {
    dispatch(updateSetupCode({value: e.target.value}));
    //this is to update netUnitCost based on the newly discounted setupFee 
    dispatch(updateSetupFee({value: setupFee}));
  }
  return (
    <select
      className="setup-code"
      value={setupCode}
      id="unit-code-selector"
      onChange={handleChange}
    >
      {setupCodes.map((code) => (
        <option key={"setup-code-" + code} value={code}>{code}</option>
      ))}
    </select>
  );
};

export default SetupCode;
