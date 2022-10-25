import { useSelector } from "react-redux";
import { selectAdditionalData } from "../../main/mainSlice";

const EqpDiscountNUC = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const unitCostPostEqpDiscount =
    additionalDataArr[columnIndex].discountedUnitCostPostEqp;

  return (
    <div className="grid-child" id={id}>
      <p>
        {unitCostPostEqpDiscount && unitCostPostEqpDiscount.toFixed(2)}
      </p>
    </div>
  );
};

export default EqpDiscountNUC;
