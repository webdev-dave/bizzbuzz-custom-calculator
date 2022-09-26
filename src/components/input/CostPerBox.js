import { useSelector, useDispatch } from "react-redux";
import { selectBoxes, updateCostPerBox, updateQtyPerBox, updateNetUnitCost } from "../main/mainSlice";


const CostPerBox = ({id, boxIndex}) => {
  const dispatch = useDispatch();
  const boxesArr = useSelector(selectBoxes);
  const costPerBox = boxesArr[boxIndex].cost;
  const qtyPerBox = boxesArr[boxIndex].qty;
  const handleChange = (e) => {
    dispatch(updateCostPerBox({boxIndex: boxIndex, value: e.target.value }));
    //makes sure to update box data when box price changes (box data only updates in updateQtyPerBox)
    dispatch(updateQtyPerBox({boxIndex: boxIndex, value: qtyPerBox}));
    //update net unit cost based on total box data
    dispatch(updateNetUnitCost({}));
  }
  return <input className="cost-pb" id={id} type="number" value={costPerBox} onChange={handleChange}  />;
};

export default CostPerBox;