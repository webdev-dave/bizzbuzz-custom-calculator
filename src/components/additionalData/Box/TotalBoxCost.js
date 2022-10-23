import { useSelector } from "react-redux";
import { selectAdditionalData } from "../../main/mainSlice";

const TotalBoxCost = ({id, columnIndex}) => {
    const additionalDataArr = useSelector(selectAdditionalData);
  
    const totalBoxCostWithFees = additionalDataArr[columnIndex].totalBoxCostWithFees;

   
    
    return (
        <p className="grid-child" id={id}>{totalBoxCostWithFees}</p>
    )
}

export default TotalBoxCost;