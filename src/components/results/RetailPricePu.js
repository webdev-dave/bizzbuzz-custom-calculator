import { useSelector, useDispatch } from "react-redux";
import {
  selectQuantity,
  selectUnitCost,
  selectIsEQP,
  selectRetailPricePu,
  updateRetailPricePu,
} from "../main/mainSlice";

const RetailPricePu = ({ id, columnIndex }) => {
  const dispatch = useDispatch();
  const retailPricePuArr = useSelector(selectRetailPricePu);
  const retailPricePu = retailPricePuArr[columnIndex];

  const handleChange = (e) => {
    dispatch(
      updateRetailPricePu({
        columnIndex: columnIndex,
        value: e.target.value,
      })
    );
  };
  return (
    <input
      className="result-data retail-price-pu"
      id={id}
      type="number"
      value={retailPricePu}
      onChange={handleChange}
    />
  );
};

export default RetailPricePu;
