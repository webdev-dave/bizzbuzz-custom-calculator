import { useSelector } from "react-redux";
import { formatToFourthDecimalPlace } from "../../../assets/helpers/helperFunctions";
import { selectAdditionalData } from "../../main/mainSlice";

const SetupFeeNUC = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const discountedSetupFeePerUnit = additionalDataArr[columnIndex].discountedSetupFeePerUnit;
  const unitCostPostEqpDiscount = additionalDataArr[columnIndex].discountedUnitCostPostEqp;
  const unitCostPostDiscountedSF = (discountedSetupFeePerUnit >= 0) ? (discountedSetupFeePerUnit + unitCostPostEqpDiscount) : 0;

  return (
    <div className="grid-child" id={id}>
      <p>
        {formatToFourthDecimalPlace(unitCostPostDiscountedSF)}
      </p>
    </div>
  );
};

export default SetupFeeNUC;
