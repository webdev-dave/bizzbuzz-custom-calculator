import { useSelector } from "react-redux";
import { formatToFourthDecimalPlace } from "../../../utils/helpers/helperFunctions";
import { selectAdditionalData } from "../../main/mainSlice";
import Big from "big.js";

const SetupFeeNUC = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const discountedSetupFeePerUnit = additionalDataArr[columnIndex].discountedSetupFeePerUnit;
  const unitCostPostEqpDiscount = additionalDataArr[columnIndex].discountedUnitCostPostEqp;
  const unitCostPostDiscountedSF = (discountedSetupFeePerUnit >= 0) && Number(Big(discountedSetupFeePerUnit).plus(unitCostPostEqpDiscount).toString());
  return (
    <div className="grid-child" id={id}>
      <p>
        {formatToFourthDecimalPlace(unitCostPostDiscountedSF)}
      </p>
    </div>
  );
};

export default SetupFeeNUC;
