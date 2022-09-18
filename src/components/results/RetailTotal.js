import { useSelector, useDispatch } from "react-redux";
import { selectRetailTotal, updateRetailTotal } from "../main/mainSlice";

const RetailTotal = ({ id, columnIndex }) => {
  const dispatch = useDispatch();
  const retailTotalArr = useSelector(selectRetailTotal);
  const retailTotal = retailTotalArr[columnIndex];

  const handleChange = (e) => {
    dispatch(
      updateRetailTotal({
        columnIndex: columnIndex,
        value: e.target.value,
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
