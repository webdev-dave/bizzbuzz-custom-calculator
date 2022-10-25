import { useSelector } from "react-redux";
import { selectAdditionalData } from "../../main/mainSlice";

const SetupFeePostDiscount = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const discountedSetupFee = additionalDataArr[columnIndex].discountedSetupFee;

  return (
    <div className="grid-child" id={id}>
      <p>
        {discountedSetupFee && discountedSetupFee.toFixed(2)}
      </p>
    </div>
  );
};

export default SetupFeePostDiscount;
