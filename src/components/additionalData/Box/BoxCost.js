import { useSelector } from "react-redux";
import { formatToFourthDecimalPlace } from "../../../utils/helpers/helperFunctions";
import { selectAdditionalData} from "../../main/mainSlice";

const BoxCost = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const totalBoxesCost = additionalDataArr[columnIndex].totalBoxesCost ? additionalDataArr[columnIndex].totalBoxesCost : 0;
  const boxCostPerUnit = additionalDataArr ? Number(additionalDataArr[columnIndex].boxCostPerUnit) : 0;


  return (
    <div className="grid-child box-fees" id={id}>
      <div className="box-fees-text-container">
        <p>T: <span className="colored-text">{formatToFourthDecimalPlace(totalBoxesCost)}</span></p>
        <p>PU: <span className="colored-text">{formatToFourthDecimalPlace(boxCostPerUnit)}</span></p>
      </div>
    </div>
  );
};

export default BoxCost;
