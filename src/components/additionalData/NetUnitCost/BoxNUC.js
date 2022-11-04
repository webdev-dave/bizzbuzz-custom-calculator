import { useSelector } from "react-redux";
import { formatToFourthDecimalPlace } from "../../../utils/helpers/helperFunctions";
import { selectAdditionalData } from "../../main/mainSlice";

const BoxNUC = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const orderQty = additionalDataArr[columnIndex].quantity;
  const discountedSetupFeePerUnit = additionalDataArr[columnIndex].discountedSetupFeePerUnit;
  const handlingFeesPerUnit = additionalDataArr[columnIndex].handlingFeesPerUnit;
  const unitCostPostEqpDiscount = additionalDataArr[columnIndex].discountedUnitCostPostEqp;
  const unitCostPostDiscountedSF = (discountedSetupFeePerUnit >= 0) && (discountedSetupFeePerUnit + unitCostPostEqpDiscount);
  const unitCostPostHF = (handlingFeesPerUnit >= 0) && (unitCostPostDiscountedSF + handlingFeesPerUnit);
  //box
  const totalBoxCost = additionalDataArr[columnIndex].totalBoxCostWithFees;
  const boxCostPerUnit = totalBoxCost && Number(totalBoxCost / orderQty);
  const unitCostPostBoxCost = (boxCostPerUnit >= 0) ? Number(unitCostPostHF + boxCostPerUnit) : 0;

  return (
    <div className="grid-child" id={id}>
                    
            <p>{formatToFourthDecimalPlace(unitCostPostBoxCost)}</p>
    </div>
  );
};

export default BoxNUC;