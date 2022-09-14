import { useState } from "react";


const RetailTotal = ({id, columnIndex}) => {

  const [currentTotal, setCurrentTotal] = useState(0);
  return (
    <input
    className="result-data retail-total"
    id={id}
    type="number"
    value={currentTotal}
    onChange={(e)=>{setCurrentTotal(e.target.value)}}
  />
   
  );
};

export default RetailTotal;
