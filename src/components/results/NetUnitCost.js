import { useSelector } from "react-redux";
import { selectNetUnitCost } from "../main/mainSlice";

const NetUnitCost = ({ id, columnIndex }) => {
  const netUnitCostArr = useSelector(selectNetUnitCost);
  const netUnitCost = Number(netUnitCostArr[columnIndex]);


  return (
    <div id={id} className="result-data net-unit-cost">
      <p>{netUnitCost}</p>
    </div>
  );
};

export default NetUnitCost;
