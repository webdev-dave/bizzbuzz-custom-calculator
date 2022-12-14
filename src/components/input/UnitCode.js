
import { useSelector, useDispatch} from "react-redux";
import { unitCodes } from "../../utils/helpers/helperArrays";
import { selectUnitCode, updateNetUnitCost, updateUnitCode } from "../main/mainSlice";


const UnitCode = ({id, columnIndex}) => {

  const dispatch = useDispatch();
  const unitCode = useSelector(selectUnitCode);
 
  const handleChange = (e) => {
    e.preventDefault()
    dispatch(updateUnitCode({columnIndex: columnIndex, value: e.target.value}));
    dispatch(updateNetUnitCost({}));
  }
  return (
    <select
      className={`unit-code max-span`}
      type="text"
      value={unitCode}
      id={id}
      onChange={handleChange}
      tabIndex="10"
    >
        {
            unitCodes.map(code => (<option value={code} key={"unit-code-"+code}>{code}</option>))
        }
    </select>
  );
};

export default UnitCode;
