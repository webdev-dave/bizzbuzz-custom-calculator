import { useSelector } from "react-redux";
import { formatToFourthDecimalPlace } from "../../../assets/helpers/helperFunctions";
import { selectAdditionalData } from "../../main/mainSlice";

const SetupFeePerUnit = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const discountedSetupFeePerUnit = additionalDataArr ?
    Number(additionalDataArr[columnIndex].discountedSetupFeePerUnit) : 0;

  return (
    <div className="grid-child" id={id}>
      <p>
        {formatToFourthDecimalPlace(discountedSetupFeePerUnit)}
      </p>
    </div>
  );
};

export default SetupFeePerUnit;
