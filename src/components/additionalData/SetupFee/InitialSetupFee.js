import { useSelector } from "react-redux";
import { selectAdditionalData } from "../../main/mainSlice";

const InitialSetupFee = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const initialSetupFee = additionalDataArr ? Number(additionalDataArr[columnIndex].setupFee) : 0;

  return (
    <div className="grid-child" id={id}>
      <p>
        {initialSetupFee.toFixed(2)}
      </p>
    </div>
  );
};

export default InitialSetupFee;
