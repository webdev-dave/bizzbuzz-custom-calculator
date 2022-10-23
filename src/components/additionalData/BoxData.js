import { useState } from "react";
import { useSelector } from "react-redux";
import { selectBoxData } from "../main/mainSlice";
import { selectQuantity } from "../main/mainSlice";

const BoxData = ({id, columnIndex}) => {
    const quantitiesArr = useSelector(selectQuantity);
    const boxDataObj = useSelector(selectBoxData);
    const currentQty = quantitiesArr[columnIndex];
    const currentBoxDataObj = boxDataObj["orderQty_"+currentQty] && boxDataObj["orderQty_"+currentQty];
    const currentBoxSizesArr = currentBoxDataObj && Object.keys(currentBoxDataObj).filter(key => key !== "totalBoxCost" && key !== "totalBoxCount" );
  
    
    const currentBoxData = currentBoxSizesArr && currentBoxSizesArr.map((boxSizeKey, i) => {
        return <div key={"box-size"+i} className="box-data-text-container">
            <p>Box Size: <span className="colored-text">&nbsp;{boxSizeKey.slice(8)}</span></p>
            <p> Boxes Req: <span className="colored-text">&nbsp;{currentBoxDataObj[boxSizeKey].boxCount}</span></p>
            <p>Cost pb: <span className="colored-text">&nbsp;{currentBoxDataObj[boxSizeKey].boxPrice}</span></p>
        </div>
        
    });
    return (
        <div className="grid-child box-data" id={id} >{currentBoxData && currentBoxData}</div>
    )
}

export default BoxData;