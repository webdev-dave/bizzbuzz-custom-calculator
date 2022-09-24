import { useSelector, useDispatch } from "react-redux";
import { selectProfitPu, updateProfitPu } from "../main/mainSlice";

const ProfitPu = ({ id, columnIndex }) => {
  const dispatch = useDispatch();
  const profitPuArr = useSelector(selectProfitPu);
  const profitPu = profitPuArr[columnIndex];

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
    />
  );
};

export default ProfitPu;
