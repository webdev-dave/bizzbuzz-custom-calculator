import { useSelector } from "react-redux";
import { selectAdditionalData } from "../../main/mainSlice";

const EqpDiscountSum = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const eqpDiscountSum = additionalDataArr[columnIndex].eqpDiscountSum;

  return (
    <div className="grid-child" id={id}>
      <p>{eqpDiscountSum && eqpDiscountSum}</p>
    </div>
  );
};

export default EqpDiscountSum;
