import { useSelector, useDispatch } from "react-redux";
import { formatToFourthDecimalPlace, handleFocus } from "../../utils/helpers/helperFunctions";
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
      value={formatToFourthDecimalPlace(retailTotal)}
      onChange={handleChange}
      onFocus={handleFocus}
      onWheel={(e) => e.target.blur()}
      tabIndex={60+columnIndex}
    />
  );
};

export default RetailTotal;
