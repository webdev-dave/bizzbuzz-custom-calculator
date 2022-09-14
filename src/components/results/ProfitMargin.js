import { useState } from "react";

const ProfitMargin = ({ id, columnIndex }) => {
  const [currentMargin, setCurrentMargin] = useState(40);
  const [isSelected, setIsSelected] = useState(false);
  const handleChange = (e) => {
    const newMargin = e.target.value;
    if (newMargin >= 0 && newMargin <= 100) {
      setCurrentMargin(newMargin);
    }
  };
  return (
    <form
      action=""
      className={`result-data profit-margin ${isSelected ? "selected" : ""}`}
      onClick={()=>{isSelected ? setIsSelected(false) : setIsSelected(true)}}
    >
      <label htmlFor="profit-margin"></label>
      <input
        id={id}
        type="number"
        value={currentMargin}
        onChange={handleChange}
      />
      <p className="percentage-symbol">%</p>
    </form>
  );
};

export default ProfitMargin;
