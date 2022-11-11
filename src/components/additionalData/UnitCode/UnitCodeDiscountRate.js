import { useSelector } from "react-redux";
import { selectAdditionalData } from "../../main/mainSlice";
import Big from "big.js";

const UnitCodeDiscountRate = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const unitCodeDiscountRate = Number(
    Big(additionalDataArr[columnIndex].unitCodeDiscountRate).times(100).toString()
  );

  return (
    <div className="grid-child" id={id}>
      {/* unit code discount */}
      <p>{unitCodeDiscountRate}%</p>
    </div>
  );
};

export default UnitCodeDiscountRate;
