import { useSelector } from "react-redux";
import { formatToFourthDecimalPlace } from "../../../utils/helpers/helperFunctions";
import { selectAdditionalData } from "../../main/mainSlice";

const HandlingFeesTotal = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const totalHandlingFees = additionalDataArr[columnIndex].totalHandlingFees ? additionalDataArr[columnIndex].totalHandlingFees : 0;

  return (
    <div className="grid-child" id={id}>
      <p>
        {formatToFourthDecimalPlace(totalHandlingFees)}
      </p>
    </div>
  );
};

export default HandlingFeesTotal;
