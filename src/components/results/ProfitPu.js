import { useSelector, useDispatch } from "react-redux";
import { formatToFourthDecimalPlace } from "../../utils/helpers/helperFunctions";
import { selectProfitPu, updateProfitPu } from "../main/mainSlice";

const ProfitPu = ({ id, columnIndex }) => {
  const dispatch = useDispatch();
  const profitPuArr = useSelector(selectProfitPu);
  const profitPu = parseFloat(profitPuArr[columnIndex]);

  const handleChange = (e) => {

    dispatch(
      updateProfitPu({ columnIndex: columnIndex, value: parseFloat(e.target.value) })
    );
  };
  return (
    <input
      className="result-data profit-pu"
      id={id}
      type="number"
      value={formatToFourthDecimalPlace(profitPu)}
      onChange={handleChange}
      onWheel={(e) => e.target.blur()}
    />
  );
};

export default ProfitPu;
