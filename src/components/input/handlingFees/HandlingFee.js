import { useSelector, useDispatch  } from "react-redux";
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
    value={handlingFee}
    onChange={handleChange}
    onWheel={(e) => e.target.blur()}
  />
  );
};

export default HandlingFee;
