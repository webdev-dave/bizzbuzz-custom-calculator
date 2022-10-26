import { useSelector } from "react-redux";
import { selectAdditionalData } from "../../main/mainSlice";

const HandlingFeesTotal = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const totalHandlingFees = additionalDataArr ? additionalDataArr[columnIndex].totalHandlingFees : 0;

  return (
    <div className="grid-child" id={id}>
      <p>
        {totalHandlingFees}
      </p>
    </div>
  );
};

export default HandlingFeesTotal;
