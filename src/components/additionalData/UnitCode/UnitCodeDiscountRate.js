import { useSelector } from "react-redux";
import { selectAdditionalData } from "../../main/mainSlice";

const UnitCodeDiscountRate = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const unitCodeDiscountRate = Number(
    additionalDataArr[columnIndex].unitCodeDiscountRate * 100
  );

  return (
    <div className="grid-child" id={id}>
      {/* unit code discount */}
      <p>{unitCodeDiscountRate}%</p>
    </div>
  );
};

export default UnitCodeDiscountRate;
