import { useState } from "react";


const TotalProfit = ({id, columnIndex}) => {

  const [currentValue, setCurrentValue] = useState(0);
  return (
    <input
    className="result-data total-profit"
    id={id}
    type="number"
    value={currentValue}
    onChange={(e)=>{setCurrentValue(e.target.value)}}
  />
   
  );
};

export default TotalProfit;
