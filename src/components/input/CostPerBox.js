import { useSelector, useDispatch } from "react-redux";
import { selectBoxes, updateCostPerBox, updateNetUnitCost, updateBoxData } from "../main/mainSlice";


const CostPerBox = ({id, boxIndex}) => {
  const dispatch = useDispatch();
  const boxesArr = useSelector(selectBoxes);
  const costPerBox = boxesArr[boxIndex].costPB;
  const handleChange = (e) => {
    dispatch(updateCostPerBox({boxIndex: boxIndex, value: e.target.value }));
    dispatch(updateBoxData({boxIndex: boxIndex}));
    //update net unit cost based on total box data
    dispatch(updateNetUnitCost({}));
  }
  return <input className="cost-pb" id={id} type="number" value={costPerBox} onChange={handleChange}  />;
};

export default CostPerBox;