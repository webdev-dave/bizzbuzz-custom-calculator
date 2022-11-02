import { useSelector, useDispatch } from "react-redux";
import { formatToFourthDecimalPlace } from "../../assets/helpers/helperFunctions";
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
    <div className="profit-margin">
      <input
        id={id}
        type="number"
        value={formatToFourthDecimalPlace(profitMargin)}
        onChange={handleChange}
        onWheel={(e) => e.target.blur()}
      />
      <p className="percentage-symbol">%</p>
    </div>
  );
};

export default ProfitMargin;
