import { useState } from "react";


const BoxCost = ({id}) => {
  const [currentCost, setCurrentCost] = useState("");
  return <input className="cost-pb" id={id} type="number" value={currentCost} onChange={(e)=>{setCurrentCost(e.target.value)}}  />;
};

export default BoxCost;