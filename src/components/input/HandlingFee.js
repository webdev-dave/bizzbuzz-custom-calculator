import { useSelector, useDispatch  } from "react-redux";
import { selectHandling, updateHandlingFee, updateNetUnitCost } from "../main/mainSlice";

const HandlingFee = ({handlingIndex, id}) => {
  const dispatch = useDispatch();
  const handlingArr = useSelector(selectHandling);
  const handlingFee = handlingArr[handlingIndex].fee;
  const handleChange = (e) => {
    dispatch(updateHandlingFee({handlingIndex: handlingIndex, value: e.target.value}));
    dispatch(updateNetUnitCost({}));
  }
  return (
    <input
    className="handling-fees-input input-data"
    type="text"
    id={id}
    value={handlingFee}
    onChange={handleChange}
  />
  );
};

export default HandlingFee;
