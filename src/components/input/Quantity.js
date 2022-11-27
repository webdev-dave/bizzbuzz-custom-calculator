import { useSelector, useDispatch } from "react-redux";
import { handleFocus, removeUnnecessaryZeros } from "../../utils/helpers/helperFunctions";
import {
  selectQuantities,
  updateBoxData,
  updateNetUnitCost,
  updateQuantity,
} from "../main/mainSlice";

const Quantity = ({ id, columnIndex }) => {
  const quantitiesArr = useSelector(selectQuantities);
  const quantity = quantitiesArr[columnIndex];
  

  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(
      updateQuantity({ columnIndex: columnIndex, value: e.target.value })
    );
    dispatch(updateBoxData({}));
    dispatch(updateNetUnitCost({}));
  };
  return (
    <input
      type="number"
      value={removeUnnecessaryZeros(quantity)}
      id={id}
      className="qty-input input-data"
      onChange={handleChange}
      onFocus={handleFocus}
      onWheel={(e) => e.target.blur()}
      tabIndex={`${2 + columnIndex}`}
    />
  );
};

export default Quantity;
