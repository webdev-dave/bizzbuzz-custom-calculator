import { useSelector } from "react-redux";
import { selectAdditionalData } from "../../main/mainSlice";

const InitialNUC = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);

  const initialUnitCost = additionalDataArr
    ? Number(additionalDataArr[columnIndex].unitCost)
    : 0;

  return (
    <div className="grid-child" id={id}>
      <p>{initialUnitCost.toFixed(2)}</p>
    </div>
  );
};

export default InitialNUC;
