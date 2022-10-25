import { useSelector } from "react-redux";
import { selectAdditionalData } from "../../main/mainSlice";

const SetupFeePerUnit = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const discountedSetupFeePerUnit =
    additionalDataArr[columnIndex].discountedSetupFeePerUnit;

  return (
    <div className="grid-child" id={id}>
      <p>
        {discountedSetupFeePerUnit && discountedSetupFeePerUnit.toFixed(2)}
      </p>
    </div>
  );
};

export default SetupFeePerUnit;
