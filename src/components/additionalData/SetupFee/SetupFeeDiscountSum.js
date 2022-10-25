import { useSelector } from "react-redux";
import { selectAdditionalData } from "../../main/mainSlice";

const SetupFeeDiscountSum = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const setupFeeDiscountSum =
    additionalDataArr[columnIndex].setupFeeDiscountSum;

  return (
    <div className="grid-child" id={id}>
      <p>
        {setupFeeDiscountSum && setupFeeDiscountSum.toFixed(2)}
      </p>
    </div>
  );
};

export default SetupFeeDiscountSum;
