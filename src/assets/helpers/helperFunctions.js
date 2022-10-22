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
  //get rid of duplicate box sizes
  const boxSizesObj = {};
  for (const boxSize of boxSizes){
    boxSizesObj[boxSize] = 0;
  }
  //sort from highest to lowest box size
  const sortedBoxSizesArr = Object.keys(boxSizesObj).sort((a,b) => b-a);
  const boxConfigurationsObj = {}
  const smallestBoxSize = sortedBoxSizesArr[sortedBoxSizesArr.length - 1]
  //console.log(smallestBoxSize);



  for (const currentOrderQty of quantitiesArr){
    
    //console.log("orderQtyRound")
    let orderQtyState = Number(currentOrderQty);
    boxConfigurationsObj[currentOrderQty] = {}
    for (const currentBoxSize of sortedBoxSizesArr){
      
      if(orderQtyState > 0){
        if(Math.floor(orderQtyState / currentBoxSize) > 0){
          const fullBoxes = Math.floor(orderQtyState / currentBoxSize);
          const fulfilledQty = Number(fullBoxes * currentBoxSize);
          orderQtyState -= fulfilledQty;
          //console.log(fullBoxes);
          //console.log(orderQtyState);
          boxConfigurationsObj[currentOrderQty][currentBoxSize] = fullBoxes
          
            
          } else if (currentBoxSize === smallestBoxSize){
            const fullBoxes = Math.ceil(orderQtyState / currentBoxSize);
            const fulfilledQty = Number(fullBoxes * currentBoxSize);
            orderQtyState -= fulfilledQty;
            console.log(fullBoxes);
            console.log(orderQtyState);
            boxConfigurationsObj[currentOrderQty][currentBoxSize] = fullBoxes
          }
        }
      }
    }

    return boxConfigurationsObj;
  }



  





  