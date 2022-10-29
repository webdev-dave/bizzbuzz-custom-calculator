import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";


const TestForm = ({ id, columnIndex }) => {

  const [numState, setNumState] = useState(0);

  const handleChange = (e) => {
    setNumState(e.target.value);
  };
  return (
    //outer div might be unnecessary
   
      <input
        type="number"
        value={numState}
        className="qty-input input-data"
        onChange={handleChange}
      />
 
  );
};

export default TestForm;