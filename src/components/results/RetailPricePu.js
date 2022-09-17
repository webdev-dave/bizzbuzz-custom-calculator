import { useSelector, useDispatch } from "react-redux";
import { selectQuantity } from "../input/inputSlice";
import { selectRetailPricePu, updateRetailPricePu } from "./resultsSlice";

const RetailPricePu = ({ id, columnIndex }) => {
  const dispatch = useDispatch();
  const qtyArr = useSelector(selectQuantity);
  const storeValue = useSelector(selectRetailPricePu);
  const retailPricePu = storeValue[columnIndex];

  const onChange = (e) => {
    dispatch(
      updateRetailPricePu({
        columnIndex: columnIndex,
        value: e.target.value,
        qty: qtyArr[columnIndex],
      })
    );
  };
  return (
    <input
      className="result-data retail-price-pu"
      id={id}
      type="number"
      value={retailPricePu}
      onChange={onChange}
    />
  );
};

export default RetailPricePu;
