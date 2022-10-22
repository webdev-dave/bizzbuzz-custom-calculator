export const getProfitMargin = (profitPu, unitCost) => {
    const profitMargin = (profitPu / unitCost ) * 100;
    return profitMargin.toFixed(2);
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
    for (const currentBoxSize of sortedBoxSizesArr){
      const currentBoxPrice = boxSizesObj[currentBoxSize].boxPrice;
      if(orderQtyState > 0){
        if(Math.floor(orderQtyState / currentBoxSize) > 0 || currentBoxSize === smallestBoxSize){
          const fullBoxes = currentBoxSize === smallestBoxSize ? Math.ceil(orderQtyState / currentBoxSize) : Math.floor(orderQtyState / currentBoxSize);
          const fulfilledQty = Number(fullBoxes * currentBoxSize);
          orderQtyState -= fulfilledQty;
          //box count
          boxConfigurationsObj["orderQty_"+currentOrderQty]["boxSize_"+currentBoxSize] = {boxCount : fullBoxes}
          //box price
          boxConfigurationsObj["orderQty_"+currentOrderQty]["boxSize_"+currentBoxSize].boxPrice = currentBoxPrice;
          //box total
          const totalPrice = Number(boxConfigurationsObj["orderQty_"+currentOrderQty]["boxSize_"+currentBoxSize].boxPrice * fullBoxes);
          boxConfigurationsObj["orderQty_"+currentOrderQty]["boxSize_"+currentBoxSize].totalPrice = totalPrice;
          //update totalBoxesCost
          boxConfigurationsObj["orderQty_"+currentOrderQty].totalBoxCost += totalPrice;
          } 
        }
      }
    }
    
    return boxConfigurationsObj;
  }



  




