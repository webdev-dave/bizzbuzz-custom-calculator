import { useSelector, useDispatch } from "react-redux";
import { selectBoxes, updateNetUnitCost, updateQtyPerBox } from "../main/mainSlice";

const QtyPerBox = ({ id, boxIndex}) => {
  const dispatch = useDispatch();
  const boxesArr = useSelector(selectBoxes);
  const qtyPerBox = boxesArr[boxIndex].qty;
  
  const handleChange = (e) => {
    dispatch(updateQtyPerBox({boxIndex: boxIndex, value: e.target.value}));
    dispatch(updateNetUnitCost({}));
  };

  return (
    <input
      className="qty-pb"
      id={id}
      type="number"
      value={qtyPerBox}
      onChange={handleChange}
    />
  );
};

export default QtyPerBox;
