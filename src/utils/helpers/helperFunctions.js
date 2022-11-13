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
    //raw formula: Number(profitPu  / retailPricePu) * 100; 
    let profitMargin = "no value";
    if(retailPricePu > 0 || retailPricePu < 0){
      profitMargin = Number(Big(Number(Big(profitPu).div(retailPricePu).toString())).times(100).toString());
    }
    return profitMargin;
}

export const getRetailPricePu = (profitMargin, netUnitCost) => {

    const profitMarginDecimalValue = Number(Big(profitMargin).div(100).toString());
    // raw formula: Number((netUnitCost/(netUnitCost - (netUnitCost * profitMarginDecimalValue))));
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
  const boxesObj = {};
  boxSizes.forEach((boxSize, i) => {
    if(boxSize > 0){
      boxesObj[boxSize] = {boxSize: boxSize, boxPrice: boxPrices[i]};
    } 
  });

  //sort from lowest box size to highest
  const sortedBoxSizesArr = Object.keys(boxesObj).sort((a,b) => a-b);
  const largestBoxSize = Number(sortedBoxSizesArr[sortedBoxSizesArr.length -1]);
  const boxConfigurationsObj = {};

  //iterate over each orderQty
  quantitiesArr.forEach((orderQty) => {
    let isUnsolved = true;
    boxConfigurationsObj["orderQty_"+orderQty] = {totalBoxesCost: 0, totalBoxesCount: 0};

    //for each orderQty, iterate over each box size and configure boxes appropriately
    sortedBoxSizesArr.forEach((boxSize) => {
      const boxPrice = Number(boxesObj[boxSize].boxPrice);
      const currentBoxSize = Number(boxSize);
      console.log(orderQty)
      if(isUnsolved){
        if((currentBoxSize >= orderQty) && (orderQty > 0)){
          isUnsolved = false;
          const boxCount = 1;
          boxConfigurationsObj["orderQty_"+orderQty]["boxSize_"+currentBoxSize] = {boxCount : boxCount}
          boxConfigurationsObj["orderQty_"+orderQty]["boxSize_"+currentBoxSize].boxPrice = boxPrice;
          const totalPrice = boxPrice;
          boxConfigurationsObj["orderQty_"+orderQty]["boxSize_"+currentBoxSize].totalPrice = totalPrice;
          //totals - might not be necessary
          boxConfigurationsObj["orderQty_"+orderQty].totalBoxesCost = totalPrice;
          boxConfigurationsObj["orderQty_"+orderQty].totalBoxesCount = boxCount;
          
        } else if (currentBoxSize < orderQty && currentBoxSize === largestBoxSize){
          isUnsolved = false;
          const boxCount = Math.ceil(Number(Big(orderQty).div(largestBoxSize).toString()));
          boxConfigurationsObj["orderQty_"+orderQty]["boxSize_"+currentBoxSize] = {boxCount : boxCount};
          boxConfigurationsObj["orderQty_"+orderQty]["boxSize_"+currentBoxSize].boxPrice = boxPrice;
          const totalPrice = Number(Big(boxPrice).times(boxCount).toString());
          //console.log(totalPrice);
          boxConfigurationsObj["orderQty_"+orderQty].totalBoxesCost = totalPrice;
          boxConfigurationsObj["orderQty_"+orderQty].totalBoxesCount = boxCount;
        } else if (orderQty === 0) {
          isUnsolved = false;
          boxConfigurationsObj["orderQty_"+orderQty]["boxSize_NA"] = {boxCount : "", boxPrice: ""};
        }

      }
    });
  })

  return boxConfigurationsObj;
}



  


/* This is the old (original) version of configureBoxes (currently: configureBoxesToMaximizeSpace).
this version can be used to maximize on box space
for example: (using default values of box sizes [100, 500, 1000]),
in the case of an order qty of 250, instead rounding up to next box size of 500,
this older version of the function would round down to size 100 * 3).

this version is currency saved and commented out in case client changes their mind about their preference for the configureBoxes func
 */

// export const configureBoxesToMaximizeSpace = (boxesArr, quantitiesArr) => {
//   const boxSizes = boxesArr.map(box => box.qtyPB);
//   const boxPrices = boxesArr.map(box => box.costPB);

//   //git rid of size duplicates
//   const boxesObj = {};
//   boxSizes.forEach((boxSize, i) => {
//     if(boxSize > 0){
//       boxesObj[boxSize] = {boxSize: boxSize, boxPrice: boxPrices[i]};
//     } 
//   });

//   //sort from highest to lowest box size
//   const sortedBoxSizesArr = Object.keys(boxesObj).sort((a,b) => b-a);
//   const smallestBoxSize = sortedBoxSizesArr[sortedBoxSizesArr.length -1];
//   const boxConfigurationsObj = {};

//   //iterate over each orderQty
//   quantitiesArr.forEach((orderQty) => {
//     let qtyRemaining = Number(orderQty);
//     boxConfigurationsObj["orderQty_"+orderQty] = {totalBoxesCost: 0, totalBoxesCount: 0};

//     //for each orderQty, iterate over each box size and configure boxes appropriately
//     sortedBoxSizesArr.forEach((boxSize) => {
//       const boxPrice = Number(boxesObj[boxSize].boxPrice);
//       if(qtyRemaining > 0){
//         if(Math.floor(qtyRemaining / boxSize) > 0 || boxSize === smallestBoxSize){
//           const boxCount = (boxSize === smallestBoxSize) ? Math.ceil(qtyRemaining / boxSize) : Math.floor(qtyRemaining / boxSize);
//           //update remaining qty
//           const qtyFulfilled = Number(boxCount * boxSize);
//           qtyRemaining -= qtyFulfilled;
//           //update current boxSize: count, pricePB, total price
//           boxConfigurationsObj["orderQty_"+orderQty]["boxSize_"+boxSize] = {boxCount : boxCount}
//           boxConfigurationsObj["orderQty_"+orderQty]["boxSize_"+boxSize].boxPrice = boxPrice;
//           const totalPrice = Number(Big(boxCount).times(boxPrice).toString());
//           boxConfigurationsObj["orderQty_"+orderQty]["boxSize_"+boxSize].totalPrice = totalPrice;
//           //update total cost and count (for all box sizes in use)
//           boxConfigurationsObj["orderQty_"+orderQty].totalBoxesCost = Number(Big(boxConfigurationsObj["orderQty_"+orderQty].totalBoxesCost).plus(totalPrice).toString());
//           boxConfigurationsObj["orderQty_"+orderQty].totalBoxesCount += boxCount;
//         }
//       }
//     });
//   })

//   return boxConfigurationsObj;
// }

