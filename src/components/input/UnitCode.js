import { useState } from "react";
import { codes } from "../../assets/helpers/helperArrays";

const UnitCode = () => {

  const [currentCode, setCurrentCode] = useState(codes[2]);
  return (
    <select
      className="unit-code"
      value={currentCode}
      id="unit-code-selector"
      onChange={(e)=> setCurrentCode(e.target.value)}
    >
        {
            codes.map(code => (<option key={"unit-code-"+code}>{code}</option>))
        }
    </select>
  );
};

export default UnitCode;
