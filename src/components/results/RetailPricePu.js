import { useSelector, useDispatch } from "react-redux";
import { formatToFourthDecimalPlace } from "../../utils/helpers/helperFunctions";
import { selectRetailPricePu, updateRetailPricePu } from "../main/mainSlice";

const RetailPricePu = ({ id, columnIndex }) => {
  const dispatch = useDispatch();
  const retailPricePuArr = useSelector(selectRetailPricePu);
  const retailPricePu = Number(retailPricePuArr[columnIndex]);

  const handleChange = (e) => {
    dispatch(
      updateRetailPricePu({
        columnIndex: columnIndex,
        value: e.target.value,
    }));
  };
  return (
    <input
      className="result-data retail-price-pu"
      id={id}
      type="number"
      value={formatToFourthDecimalPlace(retailPricePu)}
      onChange={handleChange}
      onWheel={(e) => e.target.blur()}
      tabIndex={50+columnIndex}
    />
  );
};

export default RetailPricePu;
