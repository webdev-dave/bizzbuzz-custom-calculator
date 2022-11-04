import { useSelector } from "react-redux";
import { formatToFourthDecimalPlace } from "../../../utils/helpers/helperFunctions";
import { selectAdditionalData } from "../../main/mainSlice";

const InitialSetupFee = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const initialSetupFee = additionalDataArr ? Number(additionalDataArr[columnIndex].setupFee) : 0;

  return (
    <div className="grid-child" id={id}>
      <p>
        {formatToFourthDecimalPlace(initialSetupFee)}
      </p>
    </div>
  );
};

export default InitialSetupFee;
