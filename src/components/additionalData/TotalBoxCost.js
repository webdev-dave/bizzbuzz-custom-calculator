import { useSelector } from "react-redux";
import { selectBoxData } from "../main/mainSlice";
import { selectQuantity } from "../main/mainSlice";

const TotalBoxCost = ({id, columnIndex}) => {
    const quantitiesArr = useSelector(selectQuantity);
    const boxDataObj = useSelector(selectBoxData);
    const currentQty = quantitiesArr[columnIndex];
    const currentQtyTotalBoxCost = boxDataObj["orderQty_"+currentQty] && boxDataObj["orderQty_"+currentQty].totalBoxCost;
    
    return (
        <p className="grid-child" id={id}>{currentQtyTotalBoxCost}</p>
    )
}

export default TotalBoxCost;