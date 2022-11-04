import { useSelector } from "react-redux";
import { formatToFourthDecimalPlace } from "../../../utils/helpers/helperFunctions";
import { selectAdditionalData } from "../../main/mainSlice";

const EqpDiscountSum = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const eqpDiscountSum = additionalDataArr[columnIndex].eqpDiscountSum ? additionalDataArr[columnIndex].eqpDiscountSum : 0;

  return (
    <div className="grid-child" id={id}>
      <p>{formatToFourthDecimalPlace(eqpDiscountSum)}</p>
    </div>
  );
};

export default EqpDiscountSum;
