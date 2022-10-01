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







export const getBoxSize = (boxesArr, quantitiesArr) => {
  const boxSizes = boxesArr.map(box => box.qtyPB);
  //get rid of duplicate box sizes
  const boxSizesObj = {};
  for (const key of boxSizes){
    boxSizesObj[key] = 0;
  }

  const sortedBoxSizesArr = Object.keys(boxSizesObj).sort((a,b) => b-a);

  const quantitiesObj = {};
  for (const key of quantitiesArr){
    quantitiesObj[key] = "";
  }
 

  for(let i = 0; i < quantitiesArr.length; i++){
    const qty = parseFloat(quantitiesArr[i]);
    const smallestBox = sortedBoxSizesArr[(sortedBoxSizesArr.length -1)];
    
    quantitiesObj[qty] = sortedBoxSizesArr.map(boxSize => {
      return { [boxSize]: (qty/boxSize)}
    });
     
  }

  
  return quantitiesObj;
  
  
}
