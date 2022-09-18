import { useState } from "react";
import { useSelector } from "react-redux";
import { codes } from "../../assets/helpers/helperArrays";
import { selectIsEQP } from "../main/mainSlice";


const UnitCode = ({id, columnIndex}) => {

  const [currentCode, setCurrentCode] = useState(codes[2]);
  const isEQP = useSelector(selectIsEQP);
  return (
    <select
      className={`unit-code ${isEQP ? "max-span":""}`}
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
