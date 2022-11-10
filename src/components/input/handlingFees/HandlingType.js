import { useSelector, useDispatch  } from "react-redux";
import { selectHandlingFees, updateHandlingType } from "../../main/mainSlice";

const HandlingType = ({handlingIndex, id}) => {
  const dispatch = useDispatch();
  const feeTypes = ["order", "box", "rush", "misc"];
  const handlingFeesArr = useSelector(selectHandlingFees);
  const handlingType = handlingFeesArr[handlingIndex].type;
  const handleChange = (e) => {
    dispatch(updateHandlingType({handlingIndex: handlingIndex, value: e.target.value}));
  }
  return (
    <select
      className="handling-type input-data"
      id={id}
      value={handlingType}
      onChange={handleChange}
    >
      {feeTypes.map((type) => {
        return (
          <option value={type} key={type}>
            {type}
          </option>
        );
      })}
    </select>
  );
};

export default HandlingType;
