import { useSelector } from "react-redux";
import { formatToFourthDecimalPlace } from "../../../utils/helpers/helperFunctions";
import { selectAdditionalData } from "../../main/mainSlice";

const CodeDiscountNUC = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  //unit cost
  const unitCostPostCodeDiscount = additionalDataArr ?
    Number(additionalDataArr[columnIndex].unitCostPostCodeDiscount) : 0;

  return (
    <div className="grid-child" id={id}>
      <p>{formatToFourthDecimalPlace(unitCostPostCodeDiscount)}</p>
    </div>
  );
};

export default CodeDiscountNUC;
