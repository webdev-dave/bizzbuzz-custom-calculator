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

  //sort from highest to lowest 
  const highestToLowestBoxSizes = Object.keys(boxesObj).sort((a,b) => b-a);
  const boxConfigurationsObj = {};
  

  //iterate over each orderQty
  quantitiesArr.forEach((orderQty) => {
    boxConfigurationsObj["orderQty_"+orderQty] = {totalBoxesCost: 0, totalBoxesCount: 0};
    let remainingQty = orderQty;

    highestToLowestBoxSizes.forEach((boxSize, index) => {
      const smallestBoxSize = Number(highestToLowestBoxSizes[highestToLowestBoxSizes.length-1]);

      if(remainingQty > 0){
        const boxPrice = Number(boxesObj[boxSize].boxPrice);
        const currentBoxSize = Number(boxSize);
        let boxCount = 0;
        
        //first we fill as many full boxes of currentBoxSize as possible without leaving blank space
        //then:
        // if the remaining amount can fit into one boxSize down then do that
        // else:
        // just put the remainingQty into another box of currentBoxSize and call it a day because it is usually not worth it to have more than one box of smaller box sizes i.e. it almost always cheaper to ship the remainingQty in a large box with lots of empty space rather than sending it in multiple small boxes
        const nextBoxSizeDown = highestToLowestBoxSizes[index+1] ? highestToLowestBoxSizes[index+1] : false;
        


        if(currentBoxSize === smallestBoxSize){
          boxCount = Math.ceil(Big(remainingQty).div(currentBoxSize).toNumber());
          remainingQty -= Big(boxCount).times(currentBoxSize).toNumber();
        } else if(remainingQty > 0 && remainingQty > nextBoxSizeDown){

          
          //if remainingQty is > 0 and too large to fit into the nextBoxSizeDown
          //then:
          //first fill as many complete boxes from currentBoxSize as possible
          boxCount = Math.floor(Big(remainingQty).div(currentBoxSize).toNumber());
          remainingQty -= Big(boxCount).times(currentBoxSize).toNumber();
          //then:
          
          if(nextBoxSizeDown < remainingQty){
            orderQty === 154 && console.log("this is true for boxQty", currentBoxSize, "remainingQty: ", remainingQty)
            // if the total remainingOrderQty can fit into ONE SINGLE nextBoxSizeDown then do nothing and on the next iteration the program will fit it into that box
            //else: (i.e. the remainingQty larger than one boxSize down)
            // then place remainingOrderQty into currentBoxSize and call it a day  
            boxCount++;
            remainingQty -= currentBoxSize;
          }

          

        };
        

        
        //makes sure not to push empty info into unused boxSizes
        if(boxCount > 0){
          boxConfigurationsObj["orderQty_"+orderQty]["boxSize_"+currentBoxSize] = {boxCount: boxCount, boxPrice: boxPrice};
          boxConfigurationsObj["orderQty_"+orderQty].totalBoxesCost += Big(boxPrice).times(boxCount).toNumber();
          boxConfigurationsObj["orderQty_"+orderQty].totalBoxesCount += boxCount;

        }
      }


    });

  
      
       
  });
  return boxConfigurationsObj;
}



