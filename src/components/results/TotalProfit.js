import { useSelector, useDispatch } from "react-redux";
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
      value={totalProfit}
      onChange={handleChange}
    />
  );
};

export default TotalProfit;
