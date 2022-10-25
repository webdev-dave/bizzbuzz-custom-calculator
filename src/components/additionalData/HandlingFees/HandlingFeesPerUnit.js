import { useSelector } from "react-redux";
import { selectAdditionalData } from "../../main/mainSlice";

const HandlingFeesPerUnit = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const handlingFeesPerUnit =
    additionalDataArr[columnIndex].handlingFeesPerUnit;

  return (
    <div className="grid-child" id={id}>
      <p>
        {handlingFeesPerUnit && handlingFeesPerUnit.toFixed(4)}
      </p>
    </div>
  );
};

export default HandlingFeesPerUnit;
