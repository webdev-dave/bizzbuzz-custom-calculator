import { useSelector } from "react-redux";
import { selectAdditionalData } from "../../main/mainSlice";

const SetupFeeNUC = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const discountedSetupFeePerUnit = additionalDataArr[columnIndex].discountedSetupFeePerUnit;
  const unitCostPostEqpDiscount = additionalDataArr[columnIndex].discountedUnitCostPostEqp;
  const unitCostPostDiscountedSF = (discountedSetupFeePerUnit >= 0) ? (discountedSetupFeePerUnit + unitCostPostEqpDiscount) : 0;

  return (
    <div className="grid-child" id={id}>
      <p>
        {unitCostPostDiscountedSF.toFixed(2)}
      </p>
    </div>
  );
};

export default SetupFeeNUC;