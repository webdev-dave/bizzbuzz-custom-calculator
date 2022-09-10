import { useState } from "react";
import { codes } from "../../assets/helpers/helperArrays";

const SetupCodes = () => {
  const [currentCode, setCurrentCode] = useState(codes[14]);
  return (
    <select
      className="setup-code"
      value={currentCode}
      id="unit-code-selector"
      onChange={(e) => setCurrentCode(e.target.value)}
    >
      {codes.map((code) => (
        <option key={"setup-code-" + code} value={code}>{code}</option>
      ))}
    </select>
  );
};

export default SetupCodes;
