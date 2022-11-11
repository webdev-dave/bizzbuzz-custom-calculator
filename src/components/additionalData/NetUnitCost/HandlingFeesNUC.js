import { useSelector } from "react-redux";
import { formatToFourthDecimalPlace } from "../../../utils/helpers/helperFunctions";
import { selectAdditionalData } from "../../main/mainSlice";
import Big from "big.js";

const HandlingFeesNUC = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const discountedSetupFeePerUnit = additionalDataArr[columnIndex].discountedSetupFeePerUnit;
  const handlingFeesPerUnit = additionalDataArr[columnIndex].handlingFeesPerUnit;
  const unitCostPostEqpDiscount = additionalDataArr[columnIndex].discountedUnitCostPostEqp;
  const unitCostPostDiscountedSF = (discountedSetupFeePerUnit >= 0) && Number(Big(discountedSetupFeePerUnit).plus(unitCostPostEqpDiscount).toString());
  const unitCostPostHF = (handlingFeesPerUnit >= 0) && Number(Big(unitCostPostDiscountedSF).plus(handlingFeesPerUnit).toString());

  return (
    <div className="grid-child" id={id}>
        <p>{formatToFourthDecimalPlace(unitCostPostHF)}</p>
    </div>
  );
};

export default HandlingFeesNUC;