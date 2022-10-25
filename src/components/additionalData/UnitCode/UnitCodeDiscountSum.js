import { useSelector } from "react-redux";
import { selectAdditionalData } from "../../main/mainSlice";

const UnitCodeDiscountSum = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const unitCodeDiscountSum =
    additionalDataArr[columnIndex].unitCodeDiscountSum;

  return (
    <div className="grid-child" id={id}>
      <p>
        {unitCodeDiscountSum && unitCodeDiscountSum.toFixed(2)}
      </p>
    </div>
  );
};

export default UnitCodeDiscountSum;
