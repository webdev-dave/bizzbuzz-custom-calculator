import { useSelector, useDispatch } from "react-redux";
import { formatToFourthDecimalPlace, handleFocus } from "../../utils/helpers/helperFunctions";
import { selectProfitPu, updateProfitPu } from "../main/mainSlice";

const ProfitPu = ({ id, columnIndex }) => {
  const dispatch = useDispatch();
  const profitPuArr = useSelector(selectProfitPu);
  const profitPu = profitPuArr[columnIndex];

  const handleChange = (e) => {

    dispatch(
      updateProfitPu({ columnIndex: columnIndex, value: e.target.value })
    );
  };
  return (
    <input
      className="result-data profit-pu"
      id={id}
      type="number"
      value={formatToFourthDecimalPlace(profitPu)}
      onChange={handleChange}
      onFocus={handleFocus}
      onWheel={(e) => e.target.blur()}
      tabIndex={80+columnIndex}
    />
  );
};

export default ProfitPu;
