import { useSelector, useDispatch } from "react-redux";
import { formatToFourthDecimalPlace, handleFocus } from "../../utils/helpers/helperFunctions";
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
    <div className="profit-margin result-data">
      <input
        id={id}
        type="number"
        value={formatToFourthDecimalPlace(profitMargin)}
        onChange={handleChange}
        onFocus={handleFocus}
        onWheel={(e) => e.target.blur()}
        tabIndex={70+columnIndex}
      />
      <p className="percentage-symbol">%</p>
    </div>
  );
};

export default ProfitMargin;
