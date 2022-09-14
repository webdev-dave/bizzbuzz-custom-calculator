import { useState } from "react";


const RetailPricePu = ({id, columnIndex}) => {

  const [currentValue, setCurrentValue] = useState(0);
  return (
    <input
    className="result-data retail-price-pu"
    id={id}
    type="number"
    value={currentValue}
    onChange={(e)=>{setCurrentValue(e.target.value)}}
  />
   
  );
};

export default RetailPricePu;
