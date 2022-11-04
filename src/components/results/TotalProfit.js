import { useSelector, useDispatch } from "react-redux";
import { formatToFourthDecimalPlace } from "../../utils/helpers/helperFunctions";
import { selectTotalProfit, updateTotalProfit } from "../main/mainSlice";

const TotalProfit = ({ id, columnIndex }) => {
  const dispatch = useDispatch();
  const totalProfitArr = useSelector(selectTotalProfit);
  const totalProfit = parseFloat(totalProfitArr[columnIndex]);

  const handleChange = (e) => {
    dispatch(
      updateTotalProfit({
        columnIndex: columnIndex,
        value: parseFloat(e.target.value),
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
      onWheel={(e) => e.target.blur()}
    />
  );
};

export default TotalProfit;
