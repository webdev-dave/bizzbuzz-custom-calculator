import { useSelector, useDispatch } from "react-redux";
import { selectTotalProfit, updateTotalProfit } from "../main/mainSlice";

const TotalProfit = ({ id, columnIndex }) => {
  const dispatch = useDispatch();
  const totalProfitArr = useSelector(selectTotalProfit);

  const totalProfit = totalProfitArr[columnIndex];

  const handleChange = (e) => {
    const newTotalProfit = e.target.value;
    dispatch(
      updateTotalProfit({ columnIndex: columnIndex, value: newTotalProfit })
    );
    //change everything accordingly
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

//total profit needs to change if qty changes
