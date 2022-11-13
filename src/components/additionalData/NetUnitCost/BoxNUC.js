import { useSelector } from "react-redux";
import { formatToFourthDecimalPlace } from "../../../utils/helpers/helperFunctions";
import { selectAdditionalData } from "../../main/mainSlice";
import Big from "big.js";

const BoxNUC = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const orderQty = additionalDataArr[columnIndex].quantity;
  const discountedSetupFeePerUnit = additionalDataArr[columnIndex].discountedSetupFeePerUnit;
  const handlingFeesPerUnit = additionalDataArr[columnIndex].handlingFeesPerUnit;
  const unitCostPostEqpDiscount = additionalDataArr[columnIndex].discountedUnitCostPostEqp;
  const unitCostPostDiscountedSF = (discountedSetupFeePerUnit >= 0) && Number(Big(discountedSetupFeePerUnit).plus(unitCostPostEqpDiscount).toString());
  const unitCostPostHF = (handlingFeesPerUnit >= 0) && Number(Big(unitCostPostDiscountedSF).plus(handlingFeesPerUnit).toString());
  //box
  const totalBoxesCost = additionalDataArr[columnIndex].totalBoxesCostWithFees;
  const boxCostPerUnit = (totalBoxesCost && (orderQty > 0 || orderQty < 0))  ? Number(Big(totalBoxesCost).div(orderQty).toString()) : 0;
  const unitCostPostBoxCost = (boxCostPerUnit >= 0) && Number(Big(unitCostPostHF).plus(boxCostPerUnit).toFixed());

  return (
    <div className="grid-child" id={id}>
                    
            <p>{formatToFourthDecimalPlace(unitCostPostBoxCost)}</p>
    </div>
  );
};

export default BoxNUC;