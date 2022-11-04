import { useSelector } from "react-redux";
import { formatToFourthDecimalPlace } from "../../../utils/helpers/helperFunctions";
import { selectAdditionalData } from "../../main/mainSlice";

const EqpDiscountNUC = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const unitCostPostEqpDiscount = additionalDataArr ?
    Number(additionalDataArr[columnIndex].discountedUnitCostPostEqp) : 0;

  return (
    <div className="grid-child" id={id}>
      <p>
        {formatToFourthDecimalPlace(unitCostPostEqpDiscount)}
      </p>
    </div>
  );
};

export default EqpDiscountNUC;
