import { useSelector, useDispatch  } from "react-redux";
import { selectHandling, updateHandlingType } from "../../main/mainSlice";

const HandlingType = ({handlingIndex, id}) => {
  const dispatch = useDispatch();
  const types = ["order", "box", "rush", "misc"];
  const handlingArr = useSelector(selectHandling);
  const handlingType = handlingArr[handlingIndex].type;
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
      {types.map((type) => {
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
