import { useSelector } from "react-redux";
import { formatToFourthDecimalPlace } from "../../../utils/helpers/helperFunctions";
import { selectAdditionalData } from "../../main/mainSlice";

const HandlingFeesPerUnit = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const handlingFeesPerUnit = additionalDataArr[columnIndex].handlingFeesPerUnit ? Number(additionalDataArr[columnIndex].handlingFeesPerUnit) : 0;

  return (
    <div className="grid-child" id={id}>
      <p>
        {formatToFourthDecimalPlace(handlingFeesPerUnit)}
      </p>
    </div>
  );
};

export default HandlingFeesPerUnit;
