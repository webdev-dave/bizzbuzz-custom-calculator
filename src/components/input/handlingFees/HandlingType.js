import { useSelector, useDispatch  } from "react-redux";
import { selectHandlingFees, updateHandlingType, updateNetUnitCost } from "../../main/mainSlice";

const HandlingType = ({handlingIndex, id}) => {
  const dispatch = useDispatch();
  const feeTypes = ["order", "box", "rush", "misc"];
  const handlingFeesArr = useSelector(selectHandlingFees);
  const handlingType = handlingFeesArr[handlingIndex].type;
  const handleChange = (e) => {
    dispatch(updateHandlingType({handlingIndex: handlingIndex, value: e.target.value}));
    dispatch(updateNetUnitCost({}));
  }
  return (
    <select
      className="handling-type input-data"
      id={id}
      value={handlingType}
      onChange={handleChange}
      tabIndex={20+handlingIndex}
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
