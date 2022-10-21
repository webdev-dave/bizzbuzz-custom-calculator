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







export const getTotalBoxConfiguration = (boxesArr, quantitiesArr) => {
  const boxSizes = boxesArr.map(box => box.qtyPB);
  //get rid of duplicate box sizes
  const boxSizesObj = {};
  for (const boxSize of boxSizes){
    boxSizesObj[boxSize] = 0;
  }

  //sort from highest to lowest box size
  const sortedBoxSizesArr = Object.keys(boxSizesObj).sort((a,b) => b-a);

  const boxDataObj = {};
  for (const qty of quantitiesArr){
    boxDataObj["orderQty_"+qty] = sortedBoxSizesArr.map(boxSize => ({["boxSize_" + boxSize]: {boxesRequired: 0}}));
  }

  //configure boxes here
  for(let i=0; i < 7; i++){
    const currentQty = quantitiesArr[i];
    sortedBoxSizesArr.map((box, index) => {
      console.log(box);
      boxDataObj["orderQty_"+currentQty] = boxDataObj["orderQty_"+currentQty].map((boxSize, index) => ({["boxSize_" + sortedBoxSizesArr[index]]: {boxesRequired: "tbd"}}));
      return boxDataObj;
    })
    
   
   
  }
 

  return boxDataObj;
  
}
