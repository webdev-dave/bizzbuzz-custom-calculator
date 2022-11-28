import { useSelector, useDispatch } from "react-redux";
import { formatToFourthDecimalPlace, handleFocus } from "../../utils/helpers/helperFunctions";
import { selectTotalProfit, updateTotalProfit } from "../main/mainSlice";

const TotalProfit = ({ id, columnIndex }) => {
  const dispatch = useDispatch();
  const totalProfitArr = useSelector(selectTotalProfit);
  const totalProfit = totalProfitArr[columnIndex];

  const handleChange = (e) => {
    dispatch(
      updateTotalProfit({
        columnIndex: columnIndex,
        value: e.target.value,
      })
    );
  };

  return (
    <input
      className="result-data total-profit"
      id={id}
      type="number"
      value={formatToFourthDecimalPlace(totalProfit)}
      onChange={handleChange}
      onFocus={handleFocus}
      onWheel={(e) => e.target.blur()}
      tabIndex={90+columnIndex}
    />
  );
};

export default TotalProfit;
