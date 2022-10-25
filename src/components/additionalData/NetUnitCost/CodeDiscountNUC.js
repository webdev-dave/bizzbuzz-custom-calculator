import { useSelector } from "react-redux";
import { selectAdditionalData } from "../../main/mainSlice";

const CodeDiscountNUC = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  //unit cost
  const unitCostPostCodeDiscount =
    additionalDataArr[columnIndex].unitCostPostCodeDiscount;

  return (
    <div className="grid-child" id={id}>
      <p>{unitCostPostCodeDiscount && unitCostPostCodeDiscount.toFixed(2)}</p>
    </div>
  );
};

export default CodeDiscountNUC;
