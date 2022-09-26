import { useState } from "react";
import { setupCodes } from "../../assets/helpers/helperArrays";

const SetupCodes = () => {
  const [currentCode, setCurrentCode] = useState(setupCodes[14]);
  return (
    <select
      className="setup-code"
      value={currentCode}
      id="unit-code-selector"
      onChange={(e) => setCurrentCode(e.target.value)}
    >
      {setupCodes.map((code) => (
        <option key={"setup-code-" + code} value={code}>{code}</option>
      ))}
    </select>
  );
};

export default SetupCodes;
