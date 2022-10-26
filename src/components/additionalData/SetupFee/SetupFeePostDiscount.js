import { useSelector } from "react-redux";
import { selectAdditionalData } from "../../main/mainSlice";

const SetupFeePostDiscount = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const discountedSetupFee = additionalDataArr ? Number(additionalDataArr[columnIndex].discountedSetupFee) : 0;

  return (
    <div className="grid-child" id={id}>
      <p>
        {discountedSetupFee.toFixed(2)}
      </p>
    </div>
  );
};

export default SetupFeePostDiscount;
