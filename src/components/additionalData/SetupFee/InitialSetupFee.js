import { useSelector } from "react-redux";
import { selectAdditionalData } from "../../main/mainSlice";

const InitialSetupFee = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const initialSetupFee = additionalDataArr[columnIndex].setupFee;

  return (
    <div className="grid-child" id={id}>
      <p className="colored-text">
        {initialSetupFee && initialSetupFee.toFixed(2)}
      </p>
    </div>
  );
};

export default InitialSetupFee;
