import { useSelector } from "react-redux";
import { formatToFourthDecimalPlace } from "../../../utils/helpers/helperFunctions";
import { selectAdditionalData } from "../../main/mainSlice";

const SetupFeePostDiscount = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const discountedSetupFee = additionalDataArr ? Number(additionalDataArr[columnIndex].discountedSetupFee) : 0;

  return (
    <div className="grid-child" id={id}>
      <p>
        {formatToFourthDecimalPlace(discountedSetupFee)}
      </p>
    </div>
  );
};

export default SetupFeePostDiscount;
