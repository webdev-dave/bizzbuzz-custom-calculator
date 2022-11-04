import { useSelector } from "react-redux";
import { formatToFourthDecimalPlace } from "../../../utils/helpers/helperFunctions";
import { selectAdditionalData } from "../../main/mainSlice";

const HandlingFeesNUC = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const discountedSetupFeePerUnit = additionalDataArr[columnIndex].discountedSetupFeePerUnit;
  const handlingFeesPerUnit = additionalDataArr[columnIndex].handlingFeesPerUnit;
  const unitCostPostEqpDiscount = additionalDataArr[columnIndex].discountedUnitCostPostEqp;
  const unitCostPostDiscountedSF = (discountedSetupFeePerUnit >= 0) && (discountedSetupFeePerUnit + unitCostPostEqpDiscount);
  const unitCostPostHF = (handlingFeesPerUnit >= 0) ? (unitCostPostDiscountedSF + handlingFeesPerUnit) : 0;

  return (
    <div className="grid-child" id={id}>
        <p>{formatToFourthDecimalPlace(unitCostPostHF)}</p>
    </div>
  );
};

export default HandlingFeesNUC;