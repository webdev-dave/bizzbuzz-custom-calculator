import { useDispatch } from "react-redux";
import {
  resetAllValues,
  updateBoxData,
  updateNetUnitCost,
} from "../main/mainSlice";

const ResetButton = ({ id, columnIndex }) => {
  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(resetAllValues({}));
    dispatch(updateBoxData({}));
    dispatch(updateNetUnitCost({}));
  };

  return (
    <button className="reset-btn btn" onClick={handleClick}>
      Reset
    </button>
  );
};

export default ResetButton;
