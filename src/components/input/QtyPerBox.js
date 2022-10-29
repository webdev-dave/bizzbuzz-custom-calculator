import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectBoxes, updateBoxData, updateNetUnitCost, updateQtyPerBox } from "../main/mainSlice";

const QtyPerBox = ({ id, boxIndex}) => {
  const dispatch = useDispatch();
  const boxesArr = useSelector(selectBoxes);
  const qtyPerBox = boxesArr[boxIndex].qtyPB;

  useEffect(()=>{
    dispatch(updateBoxData({boxIndex: boxIndex}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  const handleChange = (e) => {
    dispatch(updateQtyPerBox({boxIndex: boxIndex, value: e.target.value}));
    dispatch(updateBoxData({boxIndex: boxIndex}));
    dispatch(updateNetUnitCost({}));
  };

  return (
    <input
      className="qty-pb input-data"
      id={id}
      type="number"
      value={qtyPerBox}
      onChange={handleChange}
    />
  );
};

export default QtyPerBox;
