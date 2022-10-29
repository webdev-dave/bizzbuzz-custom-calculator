import { useSelector, useDispatch } from "react-redux";
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
      value={profitPu}
      onChange={handleChange}
      onWheel={(e) => e.target.blur()}
    />
  );
};

export default ProfitPu;
