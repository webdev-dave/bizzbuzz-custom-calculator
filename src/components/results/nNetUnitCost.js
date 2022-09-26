
import { useSelector, useDispatch } from "react-redux";
import { selectNetUnitCost, updateNetUnitCost } from "../main/mainSlice";

const NetUnitCost = ({ id, columnIndex }) => {
  const dispatch = useDispatch();
  const netUnitCostArr = useSelector(selectNetUnitCost);
  const netUnitCost = parseFloat(netUnitCostArr[columnIndex]);


  const handleChange = (e) => {
    dispatch(
        updateNetUnitCost({
        columnIndex: columnIndex,
        value: e.target.value,
      })
    );
  };
  return (
    <input
      className="result-data net-unit-cost"
      id={id}
      type="number"
      value={netUnitCost}
      onChange={handleChange}
    />
  );
};

export default NetUnitCost;
