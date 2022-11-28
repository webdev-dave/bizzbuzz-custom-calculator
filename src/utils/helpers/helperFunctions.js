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
    const multiplyBy = (netUnitCost > 0 || netUnitCost < 0) ? Number(Big(netUnitCost).div(Number(Big(netUnitCost).minus(Number(Big(netUnitCost).times(profitMarginDecimalValue).toString())).toString())).toString()) : 0;
    const retailPricePu = Number(Big(netUnitCost).times(multiplyBy).toString());
    return retailPricePu;
  }


export const formatToFourthDecimalPlace = (number) => {
    // if(number === 0){
    //   return 0;
    // }

    // if input value is a string that means it was a local edit as opposed to an edit by a different result component
    // if it was a local edit there is no need to format since user is choosing the precise number they are interested in.
    // In fact, without the if statement excluding local edits, there would be a huge problem
    //when the user would type 0.00 1.00 it would be prevented since once those values are converted from a string to a number -
    //it is formatted as just a 0 or 1 (without the two zero decimal values)
    //this makes impossible to achieve entries such as  .001 or 1.001 
    if(typeof number === "string"){
      return number
    }

    
    const stringNumArr = number.toString().split(".");
    const wholeNumValues = stringNumArr[0];
    if(stringNumArr.length > 1){
      const decimalValuesArr = stringNumArr[1];
      const firstFourDecimalValues = (decimalValuesArr.length > 4) ? decimalValuesArr.slice(0,4).toString() : decimalValuesArr.toString();
      const completeNum = wholeNumValues +"."+firstFourDecimalValues;
      return completeNum;
    } else {
      return wholeNumValues;
    }
}


export const handleFocus = (e) => {
  e.target.select()
  /*     if value is not zero then selects all. If value is,
  it doesn't select by default because if the following value
  were to be a decimal, the decimal symbol would not register without a zero before it.
  (This bug currently still exists on tabFocus.
  To see it in action use tab key to focus on zero value,
  then try typing a decimal point and it will not register upon first entry) */
    // if(e.target.value > 0 || e.target.value < 0){
    //   e.target.select()
    // }
  }


// export const handleDecimalZeros = (stringNum) => {
//   const number = Number(stringNum);
//   console.log('number : ' +number+"stringNum : "+stringNum)
//   console.log('number l: ' +number.toString().length+"stringNum l: "+stringNum.length)
//   if(number.toString().length < stringNum.length){
//     return stringNum;
//   }
//   return number
// }




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

  //sort from highest to lowest
  const lowestToHighestBoxSizes = Object.keys(boxesObj).sort((a,b) => b+a);
  const highestToLowestBoxSizes = Object.keys(boxesObj).sort((a,b) => b-a);
  const boxConfigurationsObj = {};

  //iterate over each orderQty
  quantitiesArr.forEach((orderQty) => {
    boxConfigurationsObj["orderQty_"+orderQty] = {totalBoxesCost: 0, totalBoxesCount: 0};

    let remainingQty = orderQty;

    //if there is a box size that can include total orderQty do this:
    lowestToHighestBoxSizes.forEach((boxSize) => {
      if(remainingQty > 0){
      const boxPrice = Number(boxesObj[boxSize].boxPrice);
      const currentBoxSize = Number(boxSize);
      
        if(currentBoxSize >= orderQty){
          const boxCount = 1;
          remainingQty =  0;
          boxConfigurationsObj["orderQty_"+orderQty]["boxSize_"+currentBoxSize] = {boxCount : boxCount}
          boxConfigurationsObj["orderQty_"+orderQty]["boxSize_"+currentBoxSize].boxPrice = boxPrice;
          const totalPrice = boxPrice;
          boxConfigurationsObj["orderQty_"+orderQty]["boxSize_"+currentBoxSize].totalPrice = totalPrice;
          boxConfigurationsObj["orderQty_"+orderQty].totalBoxesCost += totalPrice;
          boxConfigurationsObj["orderQty_"+orderQty].totalBoxesCount += boxCount
         }
        }
      })
    
      //if total order does not fit into box size do this:
      highestToLowestBoxSizes.forEach((boxSize) => {
        // all orders that still have remainingQty > 0 are still unsolved
        if(remainingQty > 0){
          const boxPrice = Number(boxesObj[boxSize].boxPrice);
          const currentBoxSize = Number(boxSize);
          const smallestBoxSize = Number(lowestToHighestBoxSizes[0]);
          //simple/raw formula: (remainingQty/boxSize). if box is smallest box size: Math.ceil, Else: Math.floor
          const boxCount = (Number(boxSize) === smallestBoxSize) ? Math.ceil(Big(remainingQty).div(boxSize).toNumber()) : Math.floor(Big(remainingQty).div(boxSize).toNumber());
  
          remainingQty -= Big(boxCount).times(boxSize).toNumber();

          //makes sure not to push empty info into unused boxSizes
          if(boxCount > 0){
            boxConfigurationsObj["orderQty_"+orderQty]["boxSize_"+currentBoxSize] = {boxCount : boxCount}
            boxConfigurationsObj["orderQty_"+orderQty]["boxSize_"+currentBoxSize].boxPrice = boxPrice;
            const totalPrice = boxPrice;
            boxConfigurationsObj["orderQty_"+orderQty]["boxSize_"+currentBoxSize].totalPrice = totalPrice;
            boxConfigurationsObj["orderQty_"+orderQty].totalBoxesCost += Big(totalPrice).times(boxCount).toNumber();
            boxConfigurationsObj["orderQty_"+orderQty].totalBoxesCount += boxCount;
          }
        }
      })

      
      
        
      
      



      
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

