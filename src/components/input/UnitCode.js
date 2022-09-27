import { useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import { unitCodes } from "../../assets/helpers/helperArrays";
import { selectIsEQP, selectUnitCode, updateNetUnitCost, updateUnitCode } from "../main/mainSlice";


const UnitCode = ({id, columnIndex}) => {

  const dispatch = useDispatch();
  //const isEQP = useSelector(selectIsEQP);
  const unitCode = useSelector(selectUnitCode);
 
  useEffect(()=>{
    dispatch(updateUnitCode({columnIndex: columnIndex, value: unitCode}));
    dispatch(updateNetUnitCost({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


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
    >
        {
            unitCodes.map(code => (<option value={code} key={"unit-code-"+code}>{code}</option>))
        }
    </select>
  );
};

export default UnitCode;
