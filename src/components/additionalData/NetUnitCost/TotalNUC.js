import { useSelector } from "react-redux";
import { formatToFourthDecimalPlace } from "../../../utils/helpers/helperFunctions";
import { selectAdditionalData } from "../../main/mainSlice";
import Big from "big.js";

const TotalNUC = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const orderQty = additionalDataArr[columnIndex].quantity;
  const discountedSetupFeePerUnit = additionalDataArr[columnIndex].discountedSetupFeePerUnit;
  const handlingFeesPerUnit = additionalDataArr[columnIndex].handlingFeesPerUnit;
  const unitCostPostEqpDiscount = additionalDataArr[columnIndex].discountedUnitCostPostEqp;
  const unitCostPostDiscountedSF = (discountedSetupFeePerUnit >= 0) && Number(Big(discountedSetupFeePerUnit).plus(unitCostPostEqpDiscount).toString());
  const unitCostPostHF = (handlingFeesPerUnit >= 0) && Number(Big(unitCostPostDiscountedSF).plus(handlingFeesPerUnit).toString());
  //box
  const totalBoxCost = additionalDataArr[columnIndex].totalBoxCostWithFees;
  const boxCostPerUnit = totalBoxCost && Number(Big(totalBoxCost).div(orderQty).toString());
  const unitCostPostBoxCost = (boxCostPerUnit >= 0) && Number(Big(unitCostPostHF).plus(boxCostPerUnit).toFixed());


  return (
    <div className="grid-child" id={id}>                   
            <p>{formatToFourthDecimalPlace(unitCostPostBoxCost)}</p>
    </div>
  );
};

export default TotalNUC;