import Big from 'big.js';

export const injectColumnQuantityHeaders = (columnsArray, quantitiesArray) => {
  return columnsArray.map((column, i) => {
      return (
        <h5 className="pcs-head" id={"pcs-head-" + i} key={"pcs-head-" + i}>
          {quantitiesArray[i]}
          <br className="mobile-text-break" />
          { " pcs"}
        </h5>
      );
    })
}


export const getProfitMargin = (profitPu, retailPricePu) => {
    //original formula
    //const profitMargin = Number(profitPu  / retailPricePu) * 100;
    const profitMargin = Number(Big(Number(Big(profitPu).div(retailPricePu).toString())).times(100).toString());
    return profitMargin;
}


export const getRetailPricePu = (profitMargin, netUnitCost) => {
    const profitMarginDecimalValue = Number(Big(profitMargin).div(100).toString());
    /* original formula:
    const multiplyBy = Number((netUnitCost/(netUnitCost - (netUnitCost * profitMarginDecimalValue)))); */
    const multiplyBy = Number(Big(netUnitCost).div(Number(Big(netUnitCost).minus(Number(Big(netUnitCost).times(profitMarginDecimalValue).toString())).toString())).toString());
    const retailPricePu = Number(Big(netUnitCost).times(multiplyBy).toString());
    return retailPricePu;
  }


export const formatToFourthDecimalPlace = (number) => {
  const stringNumArr = number.toString().split(".");
  const wholeNumValues = stringNumArr[0];
  if(stringNumArr.length > 1){
    const decimalValuesArr = stringNumArr[1];
    const firstFourDecimalValues = (decimalValuesArr.length > 4) ? decimalValuesArr.slice(0,4).toString() : decimalValuesArr.toString();
    const result = Number(wholeNumValues +"."+firstFourDecimalValues);
    return result;
  } else {
    return wholeNumValues;
  }
}


export const addEqpDiscount = (pricingType, price) => {
  let discountedPrice;
  switch (pricingType) {
    case "EQP-1%":
        discountedPrice = Number(Big(price).times(0.99).toString());
      break;
    case "EQP-2%":
        discountedPrice = Number(Big(price).times(0.98).toString());
      break;
    case "EQP-3%":
        discountedPrice = Number(Big(price).times(0.97).toString());
      break;
    case "EQP-5%":
        discountedPrice = Number(Big(price).times(0.95).toString());
      break;
    default:
      discountedPrice = Number(price);
  }
  return discountedPrice;
};




export const configureBoxes = (boxesArr, quantitiesArr) => {
  const boxSizes = boxesArr.map(box => box.qtyPB);
  const boxPrices = boxesArr.map(box => box.costPB);


  //git rid of size duplicates
  const boxSizesObj = {};
  boxSizes.forEach((boxSize, i) => {
    if(boxSize > 0){
      boxSizesObj[boxSize] = {boxSize: boxSize, boxPrice: boxPrices[i]};
    } 
  });

  // for (let i = 0; i < boxSizes.length; i++){
  //   const boxSize = boxSizes[i];
  //   const boxPrice = boxPrices[i];
  //   //get rid of sizeZero boxes and get rid of size duplicates
  //   if(boxSize > 0){
  //     boxSizesObj[boxSize] = {boxSize: boxSize, boxPrice: boxPrice};
  //   }
  // }
  
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
          const boxCount = (currentBoxSize === smallestBoxSize) ? Math.ceil(orderQtyState / currentBoxSize) : Math.floor(orderQtyState / currentBoxSize);
          const fulfilledQty = Number(boxCount * currentBoxSize);
          orderQtyState -= fulfilledQty;
          //box count
          boxConfigurationsObj["orderQty_"+currentOrderQty]["boxSize_"+currentBoxSize] = {boxCount : boxCount}
          //box price
          boxConfigurationsObj["orderQty_"+currentOrderQty]["boxSize_"+currentBoxSize].boxPrice = currentBoxPrice;
          //box total
          const totalPrice = Number(Big(boxCount).times(boxConfigurationsObj["orderQty_"+currentOrderQty]["boxSize_"+currentBoxSize].boxPrice).toString());
          boxConfigurationsObj["orderQty_"+currentOrderQty]["boxSize_"+currentBoxSize].totalPrice = totalPrice;
          //update totalBoxesCost
          boxConfigurationsObj["orderQty_"+currentOrderQty].totalBoxCost = Number(Big(boxConfigurationsObj["orderQty_"+currentOrderQty].totalBoxCost).plus(totalPrice).toString());
          boxConfigurationsObj["orderQty_"+currentOrderQty].totalBoxCount += boxCount;
          } 
        }
      }
    }
    
    return boxConfigurationsObj;
  }



  





