import { useState } from "react";


const BoxQty = ({id}) => {
  const [currentQty, setCurrentQty] = useState("");
  return <input className="qty-pb" id={id} type="number" value={currentQty} onChange={(e)=>{setCurrentQty(e.target.value)}}  />;
};

export default BoxQty;