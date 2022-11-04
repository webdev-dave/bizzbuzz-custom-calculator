import { useSelector } from "react-redux";
import { formatToFourthDecimalPlace } from "../../utils/helpers/helperFunctions";
import { selectNetUnitCost } from "../main/mainSlice";

const NetUnitCost = ({ id, columnIndex }) => {
  const netUnitCostArr = useSelector(selectNetUnitCost);
  const netUnitCost = Number(netUnitCostArr[columnIndex]);

  return (
    <div id={id} className="result-data net-unit-cost">
      <p>{formatToFourthDecimalPlace(netUnitCost)}</p>
    </div>
  );
};

export default NetUnitCost;
