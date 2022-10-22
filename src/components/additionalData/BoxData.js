import { useState } from "react";
import { useSelector } from "react-redux";
import { selectBoxData } from "../main/mainSlice";
import { selectQuantity } from "../main/mainSlice";

const BoxData = ({id, columnIndex}) => {
    const quantitiesArr = useSelector(selectQuantity);
    const boxDataObj = useSelector(selectBoxData);
    const currentQty = quantitiesArr[columnIndex];
    const currentBoxDataObj = boxDataObj["orderQty_"+currentQty] && boxDataObj["orderQty_"+currentQty];
    const currentBoxSizesArr = currentBoxDataObj && Object.keys(currentBoxDataObj).filter(key => key !== "totalBoxCost");
  
    
    const currentBoxData = currentBoxSizesArr && currentBoxSizesArr.map((boxSizeKey, i) => {
        console.log(currentBoxDataObj[boxSizeKey])
        return <p key={"box-text-data-"+i}>{`Box Size: ${boxSizeKey.slice(8)} Boxes Req: ${currentBoxDataObj[boxSizeKey].boxCount} Cost: ${currentBoxDataObj[boxSizeKey].boxPrice}`}</p>
        
    });
    return (
        <div className="grid-child" id={id} >{currentBoxData && currentBoxData}</div>
    )
}

export default BoxData;