import { useSelector, useDispatch } from "react-redux";
import { handleFocus } from "../../../utils/helpers/helperFunctions";
import {
  selectBoxes,
  updateCostPerBox,
  updateNetUnitCost,
  updateBoxData,
} from "../../main/mainSlice";

const CostPerBox = ({ id, boxIndex }) => {
  const dispatch = useDispatch();
  const boxesArr = useSelector(selectBoxes);
  const costPerBox = boxesArr[boxIndex].costPB;
  const handleChange = (e) => {
    dispatch(updateCostPerBox({ boxIndex: boxIndex, value: e.target.value }));
    dispatch(updateBoxData({ boxIndex: boxIndex }));
    //update net unit cost based on total box data
    dispatch(updateNetUnitCost({}));
  };
  return (
    <input
      className="cost-pb input-data"
      id={id}
      type="number"
      value={costPerBox}
      onChange={handleChange}
      onFocus={handleFocus}
      onWheel={(e) => e.target.blur()}
      tabIndex={13+boxIndex}
    />
  );
};

export default CostPerBox;
