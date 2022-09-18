import { useSelector, useDispatch } from "react-redux";
import { selectProfitMargin, updateProfitMargin } from "../main/mainSlice";

const ProfitMargin = ({ id, columnIndex }) => {
  const dispatch = useDispatch();
  const profitMarginArr = useSelector(selectProfitMargin);

  const profitMargin = profitMarginArr[columnIndex];

  const handleChange = (e) => {
    dispatch(
      updateProfitMargin({ columnIndex: columnIndex, value: e.target.value })
    );
  };
  return (
    <form action="" className={`result-data profit-margin`}>
      <label htmlFor="profit-margin"></label>
      <input
        id={id}
        type="text"
        value={profitMargin}
        onChange={handleChange}
      />
      <p className="percentage-symbol">%</p>
    </form>
  );
};

export default ProfitMargin;
