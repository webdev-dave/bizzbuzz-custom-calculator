import { useSelector, useDispatch } from "react-redux";
import {
  selectRetailPricePu,
  updateRetailPricePu,
} from "../results/resultsSlice";
import { selectQuantity, updateQuantity } from "./inputSlice";

const Quantity = ({ id, columnIndex }) => {
  const quantityArr = useSelector(selectQuantity);
  const retailPricePuArr = useSelector(selectRetailPricePu);
  const retailPricePu = retailPricePuArr[columnIndex];
  const quantity = quantityArr[columnIndex];

  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(
      updateQuantity({ value: e.target.value, columnIndex: columnIndex })
    );
    dispatch(
      updateRetailPricePu({
        columnIndex: columnIndex,
        value: retailPricePu,
        qty: e.target.value,
      })
    );
  };
  return (
    //outer div might be unnecessary
    <div className="qty-sets qty">
      <input
        type="number"
        value={quantity}
        onChange={handleChange}
        id={id}
        className="qty-input"
      />
    </div>
  );
};

export default Quantity;
