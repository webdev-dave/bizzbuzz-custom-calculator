import { useSelector, useDispatch  } from "react-redux";
import { handleFocus, removeUnnecessaryZeros } from "../../../utils/helpers/helperFunctions";
import { selectHandlingFees, updateHandlingFee, updateNetUnitCost } from "../../main/mainSlice";

const HandlingFee = ({handlingIndex, id}) => {
  const dispatch = useDispatch();
  const handlingFeesArr = useSelector(selectHandlingFees);
  const handlingFee = handlingFeesArr[handlingIndex].fee;
  const handleChange = (e) => {
    dispatch(updateHandlingFee({handlingIndex: handlingIndex, value: e.target.value}));
    dispatch(updateNetUnitCost({}));
  }
  return (
    <input
    className="handling-fees input-data"
    type="number"
    id={id}
    value={removeUnnecessaryZeros(handlingFee)}
    onChange={handleChange}
    onFocus={handleFocus}
    onWheel={(e) => e.target.blur()}
    tabIndex={20+handlingIndex}
  />
  );
};

export default HandlingFee;
