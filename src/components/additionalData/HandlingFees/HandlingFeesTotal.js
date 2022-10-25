import { useSelector } from "react-redux";
import { selectAdditionalData } from "../../main/mainSlice";

const HandlingFeesTotal = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const totalHandlingFees = additionalDataArr[columnIndex].totalHandlingFees;

  return (
    <div className="grid-child" id={id}>
      <p>
        {totalHandlingFees && totalHandlingFees.toFixed(2)}
      </p>
    </div>
  );
};

export default HandlingFeesTotal;
