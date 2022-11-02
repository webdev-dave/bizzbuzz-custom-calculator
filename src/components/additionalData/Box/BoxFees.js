import { useSelector } from "react-redux";
import { formatToFourthDecimalPlace } from "../../../assets/helpers/helperFunctions";
import { selectAdditionalData, selectQuantity } from "../../main/mainSlice";

const BoxFees = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const quantitiesArr = useSelector(selectQuantity);
  const qty = quantitiesArr[columnIndex];
  const totalBoxFees = additionalDataArr[columnIndex].totalBoxFees ? additionalDataArr[columnIndex].totalBoxFees : 0;
  const boxFeesPerUnit = (totalBoxFees / qty);

  return (
    <div className="grid-child box-fees" id={id}>
      <div className="box-fees-text-container">
        <p>T: <span className="colored-text">{formatToFourthDecimalPlace(totalBoxFees)}</span></p>
        <p>PU: <span className="colored-text">{formatToFourthDecimalPlace(boxFeesPerUnit)}</span></p>
      </div>
    </div>
  );
};

export default BoxFees;
