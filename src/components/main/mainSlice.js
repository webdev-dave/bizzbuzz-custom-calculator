import { createSlice } from "@reduxjs/toolkit";
import { getProfitMargin, getRetailPricePu, addEqpDiscount, configureBoxes } from "../../utils/helpers/helperFunctions";
import { setupCodeDiscountValues, unitCodeDiscountValues } from "../../utils/helpers/helperObjects";
import Big from 'big.js';


export const initialState = {
  pricingType: "EQP",
  quantity: [100, 250, 500, 1000, 2500, 5000, 10000],
  unitCost: [1, 1, 1, 1, 1, 1, 1],
  unitCode: "C",
  setupFee: 0,
  setupCode: "V",
  amountOfBoxSizes: 1,
  box: [{ qtyPB: 100, costPB: 0 }, { qtyPB: 0, costPB: 0 }, { qtyPB: 0, costPB: 0 }, { qtyPB: 0, costPB: 0 }, { qtyPB: 0, costPB: 0 }],
  boxData: {},
  amountOfHandlingFees: 1,
  handlingFees: [{ fee: 0, type: "order" },{ fee: 0, type: "box" },{ fee: 0, type: "rush" },{ fee: 0, type: "misc" },{ fee: 0, type: "order" }],
  netUnitCost: [0, 0, 0, 0, 0, 0, 0],
  retailPricePu: [0, 0, 0, 0, 0, 0, 0],
  retailTotal: [0, 0, 0, 0, 0, 0, 0],
  profitMargin: [40, 40, 40, 40, 40, 40, 40],
  profitPu: [0, 0, 0, 0, 0, 0, 0],
  totalProfit: [0, 0, 0, 0, 0, 0, 0],
  additionalData: [{},{},{},{},{},{},{}],
  
};

const mainSlice = createSlice({
  name: "main",
  initialState: initialState,
  reducers: {
    resetAllValues: (state, action) => {
      //to understand how this works, open store.js
    },
    updatePricingType: (state, action) => {
      state.pricingType = action.payload.value;
      //when transitioning from "NON-EQP to "EQP", make sure to copy col-0 values into all the (hidden unitPrice elements)
      if (action.payload.value !== "Non-EQP") {
        //upon changing to EQP
        const colZeroUnitPrice = state.unitCost[0];
        state.unitCost = state.unitCost.map(unitP => {
          return colZeroUnitPrice;
        });
      } 
    },
    updateQuantity: (state, action) => {
      const columnIndex = action.payload.columnIndex;
      console.log(action.payload.value);
      const value = Number(action.payload.value);
      state.quantity[columnIndex] = value;
      if(value === 0){
        state.retailTotal[columnIndex] = 0;
        state.totalProfit[columnIndex] = 0;
      }
    },
    updateUnitCost: (state, action) => {
      const columnIndex = action.payload.columnIndex;
      const value = Number(action.payload.value)
      state.unitCost[columnIndex] = (value > 0 || value < 0) ? value : 0;
      if(action.payload.isEQP){
        for(let i = 0; i < 7; i++){
          //if is EQP then all (hidden unitPrice elements) are equal to col-0
          state.unitCost[i] = Number(state.unitCost[0]);
        }
      }
      
    },
    updateUnitCode: (state, action) => {
      state.unitCode = action.payload.value;
    },
    updateSetupFee: (state, action) => {
      state.setupFee = Number(action.payload.value);
    },
    updateSetupCode: (state, action) => {
      state.setupCode = action.payload.value;
    },
    updateAmountOfBoxSizes: (state, action) => {
      state.amountOfBoxSizes = action.payload.value;
    },
    updateQtyPerBox: (state, action) => {
      const boxIndex = action.payload.boxIndex;
      state.box[boxIndex].qtyPB = Number(action.payload.value);
    },
    updateCostPerBox: (state, action) => {
      const boxIndex = action.payload.boxIndex;
      state.box[boxIndex].costPB =  Number(action.payload.value);
    },
    updateBoxData: (state, action) => {
      const configuredBoxes = configureBoxes(state.box, state.quantity);
      state.boxData = configuredBoxes;
    },
    updateAmountOfHandlingFees: (state, action) => {
      state.amountOfHandlingFees = action.payload.value;
    },
    updateHandlingType: (state, action) => {
      const handlingIndex = action.payload.handlingIndex;
      state.handlingFees[handlingIndex].type = action.payload.value;
    },
    updateHandlingFee: (state, action) => {
      const handlingIndex = action.payload.handlingIndex;
      state.handlingFees[handlingIndex].fee = Number(action.payload.value); 
    },
    updateNetUnitCost: (state, action) => {
      const setupFee = Number(state.setupFee);
      console.log(setupFee)
      const setupCodeDiscountRate = Number(setupCodeDiscountValues[state.setupCode])
      const setupFeeDiscountSum = Number(Big(setupFee).times(setupCodeDiscountRate).toString())
      const discountedSetupFee = Number(Big(setupFee).minus(setupFeeDiscountSum).toString());

      //update net unit cost
      state.netUnitCost = state.netUnitCost.map((nuc, index) => {
        const unitCodeDiscountRate = Number(unitCodeDiscountValues[state.unitCode]);
        const unitCost = Number(state.unitCost[index]);
        const unitCodeDiscountSum = Number((Big(unitCost).times(unitCodeDiscountRate).toString()));
        const unitCostPostCodeDiscount =  Number(Big(unitCost).minus(unitCodeDiscountSum).toString());
        const eqpDiscountRate = state.pricingType && state.pricingType.slice(-1) !== "P" ? state.pricingType.slice(-2) : "0%";
        const discountedUnitCostPostEqp = addEqpDiscount(state.pricingType, unitCostPostCodeDiscount);
        const quantity = Number(state.quantity[index]);
        const discountedSetupFeePerUnit = (quantity > 0 || quantity < 0) ? Number(Big(discountedSetupFee).div(quantity).toString()) : 0;
        const totalBoxesCost = state.boxData["orderQty_"+quantity] ? Number(state.boxData["orderQty_"+quantity].totalBoxesCost) : 0;
        const totalBoxesCount = state.boxData["orderQty_"+quantity] ? Number(state.boxData["orderQty_"+quantity].totalBoxesCount) : 0;
        let boxFee = 0;
        state.handlingFees.forEach((handlingFee, i) => {
          if(handlingFee.type === "box"){
            boxFee = Number(Big(boxFee).plus(handlingFee.fee).toString());
          }
        });
        const totalBoxFees = Number(Big(totalBoxesCount).times(boxFee).toString());
        const totalBoxesCostWithFees = Number(Big(totalBoxesCost).plus(totalBoxFees).toString());
        const boxCostPerUnit =  (quantity > 0 || quantity < 0) ? Number(Big(totalBoxesCost).div(quantity).toString()) : 0;
        const boxCostPerUnitWithFees =  (quantity > 0 || quantity < 0) ? Number(Big(totalBoxesCostWithFees).div(quantity).toString()) : 0;
        
        let totalHandlingFees = 0;
        state.handlingFees.forEach((handlingFee, i) => {
          if(handlingFee.type !== "box"){
            totalHandlingFees = Number(Big(totalHandlingFees).plus(handlingFee.fee).toString());
          };
        });
        const handlingFeesPerUnit = (quantity > 0 || quantity < 0) ? Number(Big(totalHandlingFees).div(quantity).toString()) : 0;
        

        const additionalData = {
          quantity: quantity,
          unitCost: unitCost,
          unitCodeDiscountRate: unitCodeDiscountRate,
          unitCodeDiscountSum: unitCodeDiscountSum,
          unitCostPostCodeDiscount: unitCostPostCodeDiscount,
          pricingType: state.pricingType,
          eqpDiscountRate: eqpDiscountRate, 
          eqpDiscountSum: Number(Big(unitCostPostCodeDiscount).minus(discountedUnitCostPostEqp).toString()),
          discountedUnitCostPostEqp: discountedUnitCostPostEqp,
          setupFee: setupFee,
          setupCodeDiscountRate: setupCodeDiscountRate,
          setupFeeDiscountSum: setupFeeDiscountSum,
          discountedSetupFee: discountedSetupFee,
          discountedSetupFeePerUnit: discountedSetupFeePerUnit,
          totalBoxesCost: totalBoxesCost,
          boxCostPerUnit: boxCostPerUnit,
          totalBoxFees: totalBoxFees,
          totalBoxesCount: totalBoxesCount,
          totalBoxesCostWithFees: totalBoxesCostWithFees,
          boxCostPerUnitWithFees: boxCostPerUnitWithFees,
          totalHandlingFees: totalHandlingFees,
          handlingFeesPerUnit: handlingFeesPerUnit, 
        }
        state.additionalData[index] = additionalData;
        
        const netUnitCost = Number(Big(discountedUnitCostPostEqp).plus(discountedSetupFeePerUnit).plus(handlingFeesPerUnit).plus(boxCostPerUnitWithFees).toString());
        return netUnitCost;
      })


      //update all Results components based on the new net unit cost
      for(let i = 0; i < 7; i++){
        const netUnitCost = Number(state.netUnitCost[i]);
        const profitMargin = Number(state.profitMargin[i]);
        const qty = Number(state.quantity[i]);
        const retailPricePu = getRetailPricePu(profitMargin, netUnitCost);
        const profitPu = Number(Big(retailPricePu).minus(netUnitCost).toString());
        //retailPricePu
        state.retailPricePu[i] = retailPricePu;
        //retailTotal
        state.retailTotal[i] = Number(Big(retailPricePu).times(qty).toString());
        //profit PU
        state.profitPu[i] = profitPu;
        //total profit
        state.totalProfit[i] = Number(Big(profitPu).times(qty).toString());
      }

    },
    updateRetailPricePu: (state, action) => {
      const columnIndex = action.payload.columnIndex;
      const value = Number(action.payload.value);
      const retailPricePu = (value > 0 || value < 0) ? value : 0;
      const qty = Number(state.quantity[columnIndex]);
      const netUnitCost = Number(state.netUnitCost[columnIndex]);
      const profitPu = Number(Big(retailPricePu).minus(netUnitCost).toString()); 
      //retail price pu
      state.retailPricePu[columnIndex] = retailPricePu;
      //retail total
      state.retailTotal[columnIndex] = Number(Big(retailPricePu).times(qty).toString());
      //profit margin
      state.profitMargin[columnIndex] = getProfitMargin(profitPu, retailPricePu);
      //profit PU    
      state.profitPu[columnIndex] = profitPu;
      //total profit
      state.totalProfit[columnIndex] = Number(Big(profitPu).times(qty).toString());
    },
    updateRetailTotal: (state, action) => {
      const columnIndex = action.payload.columnIndex;
      const value = Number(action.payload.value);
      const retailTotal = (value > 0 || value < 0) ? value : 0;
      const qty = Number(state.quantity[columnIndex]);
      const netUnitCost = Number(state.netUnitCost[columnIndex]);
      const retailPricePu = Number(Big(retailTotal).div(qty).toString());
      const profitPu = Number(Big(retailPricePu).minus(netUnitCost).toString());
      
      //retail total
      state.retailTotal[columnIndex] = retailTotal;
      //retail price pu
      state.retailPricePu[columnIndex] = retailPricePu;
      //profit margin
      state.profitMargin[columnIndex] = getProfitMargin(profitPu, retailPricePu);
      //profit PU
      state.profitPu[columnIndex] = profitPu;
      //total profit
      state.totalProfit[columnIndex] = Number(Big(profitPu).times(qty).toString());
    },
    updateProfitMargin: (state, action) => {
      const columnIndex = action.payload.columnIndex;
      const value = Number(action.payload.value);
      const profitMargin = (value > 0 || value < 0) ? value : 0;
      const qty = Number(state.quantity[columnIndex]);
      const netUnitCost = Number(state.netUnitCost[columnIndex]);
      const retailPricePu = getRetailPricePu(profitMargin, netUnitCost);
      const profitPu = Number(Big(retailPricePu).minus(netUnitCost).toString());
      //profit margin
      state.profitMargin[columnIndex] = profitMargin;
      //retail price pu
      state.retailPricePu[columnIndex] = retailPricePu;
      //retail total
      state.retailTotal[columnIndex] = Number(Big(retailPricePu).times(qty).toString());
      //profit pu
      state.profitPu[columnIndex] = profitPu;
      //total profit
      state.totalProfit[columnIndex] = Number(Big(profitPu).times(qty).toString());
    },
    updateProfitPu: (state, action) => {
      const columnIndex = action.payload.columnIndex;
      const value = Number(action.payload.value);
      const profitPu = (value > 0 || value < 0) ? value : 0;
      const qty = Number(state.quantity[columnIndex]);
      const netUnitCost = Number(state.netUnitCost[columnIndex]);
      const retailPricePu = Number(Big(netUnitCost).plus(profitPu).toString());
      //profit pu
      state.profitPu[columnIndex] = profitPu;
      //retail price pu
      state.retailPricePu[columnIndex] = retailPricePu;
      //retail total
      state.retailTotal[columnIndex] = Number(Big(retailPricePu).times(qty).toString());
      //profit margin 
      state.profitMargin[columnIndex] = getProfitMargin(profitPu, retailPricePu);
      //total profit
      state.totalProfit[columnIndex] = Number(Big(profitPu).times(qty).toString());
    },
    updateTotalProfit: (state, action) => {
      const columnIndex = action.payload.columnIndex;
      const value = Number(action.payload.value);
      const totalProfit = (value > 0 || value < 0) ? value : 0;
      const qty = Number(state.quantity[columnIndex]);
      const netUnitCost = Number(state.netUnitCost[columnIndex]);
      const profitPu = Number(Big(totalProfit).div(qty).toString());
      const retailPricePu = Number(Big(netUnitCost).plus(profitPu).toString())
      //total profit
      state.totalProfit[columnIndex] = totalProfit;
      //profit pu
      state.profitPu[columnIndex] = profitPu;
      //retail price pu
      state.retailPricePu[columnIndex] = retailPricePu;
      //retail total
      state.retailTotal[columnIndex] = Number(Big(retailPricePu).times(qty).toString());
      //profit margin 
      state.profitMargin[columnIndex] = getProfitMargin(profitPu, retailPricePu);
    },

  },
});


export const selectPricingType = (state) => state.main.pricingType;
export const selectQuantities = (state) => state.main.quantity;
export const selectUnitCost = (state) => state.main.unitCost;
export const selectUnitCode = (state) => state.main.unitCode;
export const selectSetupFee = (state) => state.main.setupFee;
export const selectSetupCode = (state) => state.main.setupCode;
export const selectAmountOfBoxSizes = (state) => state.main.amountOfBoxSizes;
export const selectBoxes = (state) => state.main.box;
export const selectBoxConfiguration = (state) => state.main.boxData;
export const selectAmountOfHandlingFees = (state) => state.main.amountOfHandlingFees;
export const selectHandlingFees = (state) => state.main.handlingFees;
export const selectIsEQP = (state) => state.main.pricingType !== "Non-EQP";
export const selectNetUnitCost = (state) => state.main.netUnitCost;
export const selectRetailPricePu = (state) => state.main.retailPricePu;
export const selectRetailTotal = (state) => state.main.retailTotal;
export const selectProfitMargin = (state) => state.main.profitMargin;
export const selectProfitPu = (state) => state.main.profitPu;
export const selectTotalProfit = (state) => state.main.totalProfit;
export const selectAdditionalData = (state) => state.main.additionalData;
export const {resetAllValues, updateQuantity, updatePricingType, updateUnitCost, updateUnitCode, updateSetupFee, updateSetupCode, updateAmountOfBoxSizes, updateQtyPerBox, updateCostPerBox, updateBoxData, updateAmountOfHandlingFees, updateHandlingType, updateHandlingFee, updateNetUnitCost ,updateRetailPricePu, updateRetailTotal, updateProfitMargin, updateProfitPu, updateTotalProfit, updateProfits} =
  mainSlice.actions;
  


export default mainSlice.reducer;
