import { useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import { unitCodes } from "../../assets/helpers/helperArrays";
import { selectIsEQP, selectUnitCode, updateUnitCode } from "../main/mainSlice";


const UnitCode = ({id, columnIndex}) => {

  const dispatch = useDispatch();
  const isEQP = useSelector(selectIsEQP);
  const currentCodeArr = useSelector(selectUnitCode);
  const unitCode = currentCodeArr[columnIndex];
 
  useEffect(()=>{
    dispatch(updateUnitCode({columnIndex: columnIndex, value: unitCode}))
  },[])


  const handleChange = (e) => {
    e.preventDefault()
    dispatch(updateUnitCode({columnIndex: columnIndex, value: e.target.value}));
  }
  return (
    <select
      className={`unit-code ${isEQP ? "max-span":""}`}
      type="text"
      value={unitCode}
      id={id}
      onChange={handleChange}
    >
        {
            unitCodes.map(code => (<option value={code} key={"unit-code-"+code}>{code}</option>))
        }
    </select>
  );
};

export default UnitCode;
