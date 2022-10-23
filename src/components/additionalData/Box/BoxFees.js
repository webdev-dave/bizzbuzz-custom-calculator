import { useSelector } from "react-redux";
import { selectAdditionalData } from "../../main/mainSlice";

const BoxFees = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const boxFees = additionalDataArr[columnIndex].totalBoxFees;

  return (
    <div className="grid-child box-fees" id={id}>
      <div className="box-fees-text-container">
        <p>{boxFees}</p>
      </div>
    </div>
  );
};

export default BoxFees;
