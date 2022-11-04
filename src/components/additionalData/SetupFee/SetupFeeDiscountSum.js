import { useSelector } from "react-redux";
import { formatToFourthDecimalPlace } from "../../../utils/helpers/helperFunctions";
import { selectAdditionalData } from "../../main/mainSlice";

const SetupFeeDiscountSum = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const setupFeeDiscountSum = additionalDataArr ?
    Number(additionalDataArr[columnIndex].setupFeeDiscountSum) : 0;

  return (
    <div className="grid-child" id={id}>
      <p>
        {formatToFourthDecimalPlace(setupFeeDiscountSum)}
      </p>
    </div>
  );
};

export default SetupFeeDiscountSum;
