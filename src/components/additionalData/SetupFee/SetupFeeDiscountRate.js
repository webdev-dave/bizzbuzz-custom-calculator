import { useSelector } from "react-redux";
import { selectAdditionalData } from "../../main/mainSlice";

const SetupFeeDiscountRate = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const setupCodeDiscountRate = Number(
    additionalDataArr[columnIndex].setupCodeDiscountRate * 100
  );

  return (
    <div className="grid-child" id={id}>
      <p>{setupCodeDiscountRate} %</p>
    </div>
  );
};

export default SetupFeeDiscountRate;
