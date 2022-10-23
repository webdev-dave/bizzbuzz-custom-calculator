import { useSelector } from "react-redux";
import { selectAdditionalData } from "../../main/mainSlice";

const BoxCount = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const boxCount = additionalDataArr[columnIndex].totalBoxCount;

  return (
    <div className="grid-child box-count" id={id}>
      <p>{boxCount}</p>
    </div>
  );
};

export default BoxCount;
