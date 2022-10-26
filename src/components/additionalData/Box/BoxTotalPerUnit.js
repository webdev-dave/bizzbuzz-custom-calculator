import { useSelector } from "react-redux";
import { selectAdditionalData } from "../../main/mainSlice";

const BoxTotalPerUnit = ({id, columnIndex}) => {
    const additionalDataArr = useSelector(selectAdditionalData);
    const boxCostPerUnitWithFees = additionalDataArr ? Number(additionalDataArr[columnIndex].boxCostPerUnitWithFees) : 0;

   
    
    return (
        <p className="grid-child" id={id}>{boxCostPerUnitWithFees.toFixed(2)}</p>
    )
}

export default BoxTotalPerUnit;