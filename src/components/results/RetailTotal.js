import { useSelector, useDispatch } from "react-redux";
import { selectQuantity } from "../input/inputSlice";
import { selectRetailTotal, updateRetailTotal } from "./resultsSlice";

const RetailTotal = ({ id, columnIndex }) => {
  const dispatch = useDispatch();

  const qtyArr = useSelector(selectQuantity);
  const retailTotalArr = useSelector(selectRetailTotal);
  const retailTotal = retailTotalArr[columnIndex];

  const handleChange = (e) => {
    dispatch(
      updateRetailTotal({
        columnIndex: columnIndex,
        value: e.target.value,
        qty: qtyArr[columnIndex],
      })
    );
  };
  return (
    <input
      className="result-data retail-total"
      id={id}
      type="number"
      value={retailTotal}
      onChange={handleChange}
    />
  );
};

export default RetailTotal;
