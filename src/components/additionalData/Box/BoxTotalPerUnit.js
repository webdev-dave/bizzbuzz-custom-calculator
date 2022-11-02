import { useSelector } from "react-redux";
import { formatToFourthDecimalPlace } from "../../../assets/helpers/helperFunctions";
import { selectAdditionalData } from "../../main/mainSlice";

const BoxTotalPerUnit = ({id, columnIndex}) => {
    const additionalDataArr = useSelector(selectAdditionalData);
    const boxCostPerUnitWithFees = additionalDataArr[columnIndex].boxCostPerUnitWithFees ? additionalDataArr[columnIndex].boxCostPerUnitWithFees : 0;

   
    
    return (
        <p className="grid-child" id={id}>{formatToFourthDecimalPlace(boxCostPerUnitWithFees)}</p>
    )
}

export default BoxTotalPerUnit;