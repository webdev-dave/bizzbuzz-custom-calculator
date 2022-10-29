import { useSelector, useDispatch } from "react-redux";
import { setupCodes } from "../../assets/helpers/helperArrays";
import { selectSetupCode, updateNetUnitCost, updateSetupCode } from "../main/mainSlice";

const SetupCode = () => {
  const dispatch = useDispatch();
  const setupCode = useSelector(selectSetupCode);
  const handleChange = (e) => {
    dispatch(updateSetupCode({value: e.target.value}));
    dispatch(updateNetUnitCost({}));
  }
  return (
    <select
      className="setup-code "
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
