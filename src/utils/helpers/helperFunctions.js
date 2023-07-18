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

  // console.log(boxSizes)
  // console.log(boxPrices)

  //git rid of size duplicates
  const boxesObj = {};
  boxSizes.forEach((boxSize, i) => {
    if(boxSize > 0){
      boxesObj[boxSize] = {boxSize: boxSize, boxPrice: boxPrices[i]};
    } 
  });

  //sort from highest to lowest and lowest to highest
  const lowestToHighestBoxSizes = Object.keys(boxesObj).sort((a,b) => b+a);
  const highestToLowestBoxSizes = Object.keys(boxesObj).sort((a,b) => b-a);
  const boxConfigurationsObj = {};

  //console.log(highestToLowestBoxSizes, lowestToHighestBoxSizes)
  //console.log(...quantitiesArr);
  




  //iterate over each orderQty
  quantitiesArr.forEach((orderQty) => {
    boxConfigurationsObj["orderQty_"+orderQty] = {totalBoxesCost: 0, totalBoxesCount: 0};

    let remainingQty = orderQty;


    // //if there is a box size that can include total orderQty do this:
    // lowestToHighestBoxSizes.forEach((boxSize) => {
      
    //   const boxPrice = Number(boxesObj[boxSize].boxPrice);
    //   const currentBoxSize = Number(boxSize);
    //   //console.log("boxPrice: ", boxPrice, "boxSize: ", currentBoxSize)
      
    //     if(currentBoxSize >= orderQty && remainingQty > 0){
    //       //console.log("one box fits entire order for orderQty of: ", orderQty);
    //       const boxCount = 1;
    //       remainingQty =  0;
    //       boxConfigurationsObj["orderQty_"+orderQty]["boxSize_"+currentBoxSize] = {boxCount : boxCount}
    //       boxConfigurationsObj["orderQty_"+orderQty]["boxSize_"+currentBoxSize].boxPrice = boxPrice;
    //       const totalPrice = boxPrice;
    //       boxConfigurationsObj["orderQty_"+orderQty]["boxSize_"+currentBoxSize].totalPrice = totalPrice;
    //       boxConfigurationsObj["orderQty_"+orderQty].totalBoxesCost = totalPrice;
    //       boxConfigurationsObj["orderQty_"+orderQty].totalBoxesCount = boxCount;          
    //     }
      
    // });

 
    
    //if total order does not fit into box size do this:
    highestToLowestBoxSizes.forEach((boxSize, index) => {
      const smallestBoxSize = Number(lowestToHighestBoxSizes[0]);
      
      if(remainingQty <= 0){
        return;//because shipment already taken care of because it all fit into a single box
      } else {

        const boxPrice = Number(boxesObj[boxSize].boxPrice);
        const currentBoxSize = Number(boxSize);
        
        //simple/raw formula: (remainingQty/boxSize). if box is smallest box size: Math.ceil, else: Math.floor

        if(orderQty === 250){
          console.log("boxSize: " ,boxSize, "remainingQty: ", remainingQty)
        }

        let boxCount = 0;
        
        //if we can fill the box while still avoiding half or more of the box from remaining empty or if current boxSize is the smallest box size then round up, else: round down 
        if(Number(boxSize) === smallestBoxSize){
          boxCount = Math.ceil(Big(remainingQty).div(boxSize).toNumber());
          remainingQty -= Big(boxCount).times(boxSize).toNumber();
        } else if(Big(remainingQty).div(boxSize).toNumber() >= 0.5){
          //if we can fill at least more than one half box (and possibly even many whole/full boxes),
          //then:
          //first fill as many complete boxes as possible
          boxCount = Math.floor(Big(remainingQty).div(boxSize).toNumber());
          remainingQty -= Big(boxCount).times(boxSize).toNumber();
          //then:
          //check if remainingQty can fill at least half the current box
          if(Big(remainingQty).div(boxSize).toNumber() >= 0.5){
            
            //settle for a more than half full box of current boxSize but, only if nextBoxSizeDown is not an option.
            //if nextBoxSizeDown is an option then fill no more current boxes 
            const nextBoxSizeDown = highestToLowestBoxSizes[index+1];
            if(nextBoxSizeDown < remainingQty){
              //settle for one more current box
              boxCount++;
              remainingQty -= Number(boxSize);
            }

          }

        } 


   


        
        if(orderQty === 250){
          console.log("After Operation ---- boxSize: " ,boxSize, "remainingQty: ", remainingQty)
        }



        //console.log(`boxSize: ${boxSize} orderQty: ${orderQty} remaining unshipped qty: ${remainingQty}, boxCount: ${boxCount}`);
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


    });

      
       
  });
  return boxConfigurationsObj;
}



