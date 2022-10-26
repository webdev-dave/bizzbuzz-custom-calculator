import { useSelector } from "react-redux";
import { selectAdditionalData } from "../../main/mainSlice";

const CodeDiscountNUC = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  //unit cost
  const unitCostPostCodeDiscount = additionalDataArr ?
    Number(additionalDataArr[columnIndex].unitCostPostCodeDiscount) : 0;

  return (
    <div className="grid-child" id={id}>
      <p>{unitCostPostCodeDiscount.toFixed(2)}</p>
    </div>
  );
};

export default CodeDiscountNUC;
