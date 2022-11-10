import { useSelector, useDispatch } from "react-redux";
import {
  selectQuantities,
  updateBoxData,
  updateNetUnitCost,
  updateQuantity
} from "../../main/mainSlice";

const Quantity = ({ id, columnIndex }) => {
  const quantityArr = useSelector(selectQuantities);
  const quantity = quantityArr[columnIndex];

  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(updateQuantity({ columnIndex: columnIndex, value: e.target.value}));
    dispatch(updateBoxData({}));
    dispatch(updateNetUnitCost({}));
  };
  return (
    //outer div might be unnecessary
      <input
        type="number"
        value={quantity}
        id={id}
        className="qty-input input-data"
        onChange={handleChange}
        onWheel={(e) => e.target.blur()}
      />
 
  );
};

export default Quantity;
