import { useSelector } from "react-redux";
import { selectAdditionalData } from "../../main/mainSlice";

const EqpDiscountRate = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const eqpDiscountRate = additionalDataArr[columnIndex].eqpDiscountRate;

  return (
    <div className="grid-child" id={id}>
      <p>{eqpDiscountRate}</p>
    </div>
  );
};

export default EqpDiscountRate;
