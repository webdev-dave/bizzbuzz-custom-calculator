import { useSelector } from "react-redux";
import { selectAdditionalData } from "../../main/mainSlice";
import Big from "big.js";

const SetupFeeDiscountRate = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const setupCodeDiscountRate = Number(
    Big(additionalDataArr[columnIndex].setupCodeDiscountRate).times(100).toString());

  return (
    <div className="grid-child" id={id}>
      <p>{setupCodeDiscountRate} %</p>
    </div>
  );
};

export default SetupFeeDiscountRate;
