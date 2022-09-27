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
