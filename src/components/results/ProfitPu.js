import { useState } from "react";


const ProfitPu = ({id, columnIndex}) => {

  const [currentValue, setCurrentValue] = useState(0);
  return (
    <input
    className="result-data profit-pu"
    id={id}
    type="number"
    value={currentValue}
    onChange={(e)=>{setCurrentValue(e.target.value)}}
  />
   
  );
};

export default ProfitPu;
