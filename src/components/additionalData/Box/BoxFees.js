import { useSelector } from "react-redux";
import { selectAdditionalData, selectQuantity } from "../../main/mainSlice";

const BoxFees = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const quantitiesArr = useSelector(selectQuantity);
  const qty = quantitiesArr[columnIndex];
  const totalBoxFees = additionalDataArr ? additionalDataArr[columnIndex].totalBoxFees : 0;
  const boxFeesPerUnit = (totalBoxFees / qty);

  return (
    <div className="grid-child box-fees" id={id}>
      <div className="box-fees-text-container">
        <p>T: <span className="colored-text">{totalBoxFees}</span></p>
        <p>PU: <span className="colored-text">{boxFeesPerUnit.toFixed(2)}</span></p>
      </div>
    </div>
  );
};

export default BoxFees;
