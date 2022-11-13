import Big from "big.js";
import { useSelector } from "react-redux";
import { formatToFourthDecimalPlace } from "../../../utils/helpers/helperFunctions";
import { selectAdditionalData, selectQuantities } from "../../main/mainSlice";

const BoxFees = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const quantitiesArr = useSelector(selectQuantities);
  const qty = quantitiesArr[columnIndex];
  const totalBoxFees = additionalDataArr[columnIndex].totalBoxFees ? additionalDataArr[columnIndex].totalBoxFees : 0;
  const boxFeesPerUnit = (qty > 0 || qty < 0) ? Number(Big(totalBoxFees).div(qty).toString()) : 0;

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
