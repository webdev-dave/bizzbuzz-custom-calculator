import { useState } from "react";
import { codes } from "../../assets/helpers/helperArrays";

const UnitCode = ({id, columnIndex, maxSpan}) => {

  const [currentCode, setCurrentCode] = useState(codes[2]);
  return (
    <select
      className={`unit-code ${maxSpan ? "max-span":""}`}
      value={currentCode}
      id={id}
      onChange={(e)=> setCurrentCode(e.target.value)}
    >
        {
            codes.map(code => (<option value={code} key={"unit-code-"+code}>{code}</option>))
        }
    </select>
  );
};

export default UnitCode;
