import { useSelector } from "react-redux";
import { selectAdditionalData, selectQuantity } from "../../main/mainSlice";

const BoxCost = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const quantitiesArr = useSelector(selectQuantity);
  const totalBoxCost = additionalDataArr ? additionalDataArr[columnIndex].totalBoxCost : 0;
  const boxCostPerUnit = additionalDataArr ? Number(additionalDataArr[columnIndex].boxCostPerUnit) : 0;


  return (
    <div className="grid-child box-fees" id={id}>
      <div className="box-fees-text-container">
        <p>T: <span className="colored-text">&#160;&#160;&#160;{totalBoxCost}</span></p>
        <p>PU: <span className="colored-text">{boxCostPerUnit.toFixed(2)}</span></p>
      </div>
    </div>
  );
};

export default BoxCost;
