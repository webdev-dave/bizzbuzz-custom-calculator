import { useSelector } from "react-redux";
import { selectAdditionalData } from "../../main/mainSlice";

const HandlingFeesPerUnit = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const handlingFeesPerUnit = additionalDataArr ? Number(additionalDataArr[columnIndex].handlingFeesPerUnit).toFixed(4) : 0;

  return (
    <div className="grid-child" id={id}>
      <p>
        {handlingFeesPerUnit}
      </p>
    </div>
  );
};

export default HandlingFeesPerUnit;
