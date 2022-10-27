export const getProfitMargin = (profitPu, retailPricePu) => {
    const profitMargin = (profitPu  / retailPricePu) * 100;
    return Number(profitMargin.toFixed(0));
  }

// export const shaveExtraZeros = (number) => {
//   const textNum = number.toString();
//   //console.log(textNum.length)
//   let shavedText = textNum;
// }


export const getRetailPricePu = (profitMargin, netUnitCost) => {
    const profitMarginDecimalValue = Number(profitMargin/100);
    const multiplyBy = Number((netUnitCost/(netUnitCost - (netUnitCost * profitMarginDecimalValue))).toFixed(100));
    const retailPricePu = Number(netUnitCost * multiplyBy);
    return retailPricePu;
  }



export const injectColumnQuantityHeaders = (columnsArray, quantitiesArray) => {
  return columnsArray.map((column, i) => {
      return (
        <h5 className="pcs-head" id={"pcs-head-" + i} key={"pcs-head-" + i}>
          {quantitiesArray[i] + " pcs"}
        </h5>
      );
    })
}


export const addEqpDiscount = (pricingType, price) => {
  let discountedPrice;
  switch (pricingType) {
    case "EQP-1%":
        discountedPrice = Number(price * 0.99);
      break;
    case "EQP-2%":
        discountedPrice = Number(price * 0.98);
      break;
    case "EQP-3%":
        discountedPrice = Number(price * 0.97);
      break;
    case "EQP-5%":
        discountedPrice = Number(price * 0.95);
      break;
    default:
      discountedPrice = Number(price);
  }
  return Number(discountedPrice.toFixed(4));
};










export const configureBoxes = (boxesArr, quantitiesArr) => {
  const boxSizes = boxesArr.map(box => box.qtyPB);
  const boxPrices = boxesArr.map(box => box.costPB);
  const boxSizesObj = {};
  for (let i = 0; i < boxSizes.length; i++){
    const boxSize = boxSizes[i];
    const boxPrice = boxPrices[i];
    //get rid of sizeZero boxes and get rid of size duplicates
    if(boxSize > 0){
      boxSizesObj[boxSize] = {boxSize: boxSize, boxPrice: boxPrice};
    }
  }
  
  //sort from highest to lowest box size
  const sortedBoxSizesArr = Object.keys(boxSizesObj).sort((a,b) => b-a);
  const finalIndex = sortedBoxSizesArr.length -1;
  const smallestBoxSize = sortedBoxSizesArr[finalIndex];
  const boxConfigurationsObj = {};

  for (const currentOrderQty of quantitiesArr){
    
    let orderQtyState = Number(currentOrderQty);
    boxConfigurationsObj["orderQty_"+currentOrderQty] = {};
    boxConfigurationsObj["orderQty_"+currentOrderQty].totalBoxCost = 0;
    boxConfigurationsObj["orderQty_"+currentOrderQty].totalBoxCount = 0;
    for (const currentBoxSize of sortedBoxSizesArr){
      const currentBoxPrice = boxSizesObj[currentBoxSize].boxPrice;
      if(orderQtyState > 0){
        if(Math.floor(orderQtyState / currentBoxSize) > 0 || currentBoxSize === smallestBoxSize){
          const boxCount = currentBoxSize === smallestBoxSize ? Math.ceil(orderQtyState / currentBoxSize) : Math.floor(orderQtyState / currentBoxSize);
          const fulfilledQty = Number(boxCount * currentBoxSize);
          orderQtyState -= fulfilledQty;
          //box count
          boxConfigurationsObj["orderQty_"+currentOrderQty]["boxSize_"+currentBoxSize] = {boxCount : boxCount}
          //box price
          boxConfigurationsObj["orderQty_"+currentOrderQty]["boxSize_"+currentBoxSize].boxPrice = currentBoxPrice;
          //box total
          const totalPrice = Number(boxConfigurationsObj["orderQty_"+currentOrderQty]["boxSize_"+currentBoxSize].boxPrice * boxCount);
          boxConfigurationsObj["orderQty_"+currentOrderQty]["boxSize_"+currentBoxSize].totalPrice = totalPrice;
          //update totalBoxesCost
          boxConfigurationsObj["orderQty_"+currentOrderQty].totalBoxCost += totalPrice;
          boxConfigurationsObj["orderQty_"+currentOrderQty].totalBoxCount += boxCount;
          } 
        }
      }
    }
    
    return boxConfigurationsObj;
  }



  





