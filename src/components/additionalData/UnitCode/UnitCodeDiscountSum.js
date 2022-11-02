import { useSelector } from "react-redux";
import { formatToFourthDecimalPlace } from "../../../assets/helpers/helperFunctions";
import { selectAdditionalData } from "../../main/mainSlice";

const UnitCodeDiscountSum = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const unitCodeDiscountSum = additionalDataArr ?
    Number(additionalDataArr[columnIndex].unitCodeDiscountSum) : 0;

  return (
    <div className="grid-child" id={id}>
      <p>
        {formatToFourthDecimalPlace(unitCodeDiscountSum)}
      </p>
    </div>
  );
};

export default UnitCodeDiscountSum;
