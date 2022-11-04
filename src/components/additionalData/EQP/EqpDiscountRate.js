import { useSelector } from "react-redux";
import { formatToFourthDecimalPlace } from "../../../utils/helpers/helperFunctions";
import { selectAdditionalData } from "../../main/mainSlice";

const EqpDiscountRate = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const eqpDiscountRate = additionalDataArr[columnIndex].eqpDiscountRate ? additionalDataArr[columnIndex].eqpDiscountRate : 0;

  return (
    <div className="grid-child" id={id}>
      <p>{formatToFourthDecimalPlace(eqpDiscountRate)}</p>
    </div>
  );
};

export default EqpDiscountRate;
