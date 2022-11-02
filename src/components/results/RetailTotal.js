import { useSelector, useDispatch } from "react-redux";
import { formatToFourthDecimalPlace } from "../../assets/helpers/helperFunctions";
import { selectRetailTotal, updateRetailTotal } from "../main/mainSlice";

const RetailTotal = ({ id, columnIndex }) => {
  const dispatch = useDispatch();
  const retailTotalArr = useSelector(selectRetailTotal);
  const retailTotal = parseFloat(retailTotalArr[columnIndex]);

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
      value={formatToFourthDecimalPlace(retailTotal)}
      onChange={handleChange}
      onWheel={(e) => e.target.blur()}
    />
  );
};

export default RetailTotal;
