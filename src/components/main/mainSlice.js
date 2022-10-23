import { createSlice } from "@reduxjs/toolkit";
import { getProfitMargin, addEqpDiscount, configureBoxes } from "../../assets/helpers/helperFunctions";
import { setupCodeDiscountValues, unitCodeDiscountValues } from "../../assets/helpers/helperObjects";




const initialState = {
  pricingType: "EQP",
  quantity: [100, 250, 500, 1000, 2500, 5000, 50],
  unitCost: [1, 1, 1, 1, 1, 1, 1],
  unitCode: "C",
  setupFee: 0,
  setupCode: "V",
  box: [{ qtyPB: 100, costPB: 0 }, { qtyPB: 500, costPB: 0 }, { qtyPB: 1000, costPB: 0 }, { qtyPB: 0, costPB: 0 }, { qtyPB: 0, costPB: 0 }],
  boxData: {},
  handling: [{ fee: 0, type: "order" },{ fee: 0, type: "box" },{ fee: 0, type: "rush" },{ fee: 0, type: "misc" },{ fee: 0, type: "order" }],
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
      state.quantity[columnIndex] = Number(action.payload.value);
    },
    updateUnitCost: (state, action) => {
      const columnIndex = action.payload.columnIndex;
      state.unitCost[columnIndex] = action.payload.value;
      if(action.payload.isEQP){
        for(let i = 0; i < 7; i++){
          //if is EQP then all (hidden unitPrice elements) are equal to col-0
          state.unitCost[i] = state.unitCost[0];
        }
      }
    },
    updateUnitCode: (state, action) => {
      state.unitCode = action.payload.value;
    },
    updateSetupFee: (state, action) => {
      state.setupFee = action.payload.value;
    },
    updateSetupCode: (state, action) => {
      state.setupCode = action.payload.value;
    },
    updateQtyPerBox: (state, action) => {
      const boxIndex = action.payload.boxIndex;
      console.log(boxIndex);
      state.box[boxIndex].qtyPB = Number(action.payload.value);
    },
    updateCostPerBox: (state, action) => {
      const boxIndex = action.payload.boxIndex;
      state.box[boxIndex].costPB =  Number(action.payload.value);
    },
    updateBoxData: (state, action) => {
      //const boxIndex = action.payload.boxIndex;
   
      const configuredBoxes = configureBoxes(state.box, state.quantity);
      state.boxData = configuredBoxes;
    },
    updateHandlingType: (state, action) => {
      const handlingIndex = action.payload.handlingIndex;
      state.handling[handlingIndex].type = action.payload.value;
    },
    updateHandlingFee: (state, action) => {
      const handlingIndex = action.payload.handlingIndex;
      state.handling[handlingIndex].fee = action.payload.value; 
    },
    clearHandlingFee: (state, action) => {
      const handlingIndex = action.payload.handlingIndex;
      state.handling[handlingIndex].fee = 0;
    },
    updateNetUnitCost: (state, action) => {
      const setupFee = state.setupFee;
      const setupCodeDiscountRate = Number(setupCodeDiscountValues[state.setupCode])
      const setupFeeDiscountSum = Number((setupFee * setupCodeDiscountRate).toFixed(4))
      const discountedSetupFee = Number(setupFee - setupFeeDiscountSum);



      //update net unit cost
      state.netUnitCost = state.netUnitCost.map((nuc, index) => {
        const unitCodeDiscountRate = parseFloat(unitCodeDiscountValues[state.unitCode]);
        const unitCost = parseFloat(state.unitCost[index]);
        const unitCodeDiscountSum = Number((unitCost * unitCodeDiscountRate).toFixed(4));
        const unitCostPostCodeDiscount =  Number((unitCost - unitCodeDiscountSum).toFixed(4));
        const eqpDiscountRate = state.pricingType && state.pricingType.slice(-1) !== "P" ? state.pricingType.slice(-2) : "0%";
        const discountedUnitCostPostEqp = addEqpDiscount(state.pricingType, unitCostPostCodeDiscount);
        const quantity = parseFloat(state.quantity[index]);
        const discountedSetupFeePerUnit = parseFloat(discountedSetupFee / quantity);
        


      
        
        //fix this once auto calculate box cost works
        const totalBoxCost = state.boxData["orderQty_"+quantity] ? Number(state.boxData["orderQty_"+quantity].totalBoxCost) : 0;
        const totalBoxCount = state.boxData["orderQty_"+quantity] ? Number(state.boxData["orderQty_"+quantity].totalBoxCount) : 0;
        //boxFee should be updated by box handling fees via state.handling
        let boxFee = 0;
        state.handling.forEach((handlingFee, i) => {
          if(handlingFee.type === "box"){
            boxFee += Number(handlingFee.fee)
          }
        });
        const totalBoxFees = Number(totalBoxCount * boxFee);
        const totalBoxCostWithFees = totalBoxCost + totalBoxFees;
        const boxCostPerUnit =  Number((totalBoxCost / quantity).toFixed(4));
        const boxCostPerUnitWithFees =  Number((totalBoxCostWithFees / quantity).toFixed(4));



        let totalHandlingFees = 0;
        state.handling.forEach((handlingFee, i) => {
          if(handlingFee.type !== "box"){
            totalHandlingFees += Number(handlingFee.fee)
          };
        });
        const handlingFeesPerUnit = Number((totalHandlingFees / quantity).toFixed(4));

        const additionalData = {
          quantity: quantity,
          unitCost: unitCost,
          unitCodeDiscountRate: unitCodeDiscountRate,
          unitCodeDiscountSum: unitCodeDiscountSum,
          unitCostPostCodeDiscount: unitCostPostCodeDiscount,
          pricingType: state.pricingType,
          eqpDiscountRate: eqpDiscountRate, 
          eqpDiscountSum: Number(((unitCostPostCodeDiscount - discountedUnitCostPostEqp)).toFixed(4)),
          discountedUnitCostPostEqp: discountedUnitCostPostEqp,
          setupFee: setupFee,
          setupCodeDiscountRate: setupCodeDiscountRate,
          setupFeeDiscountSum: setupFeeDiscountSum,
          discountedSetupFee: discountedSetupFee,
          discountedSetupFeePerUnit: discountedSetupFeePerUnit,
          totalBoxCost: totalBoxCost,
          boxCostPerUnit: boxCostPerUnit,
          totalBoxFees: totalBoxFees,
          totalBoxCount: totalBoxCount,
          totalBoxCostWithFees: totalBoxCostWithFees,
          boxCostPerUnitWithFees: boxCostPerUnitWithFees,
          totalHandlingFees: totalHandlingFees,
          handlingFeesPerUnit: handlingFeesPerUnit, 
        }
        state.additionalData[index] = additionalData;
     
        return Number((discountedUnitCostPostEqp + discountedSetupFeePerUnit + totalBoxCostWithFees + handlingFeesPerUnit).toFixed(4));
      })
      







      //update all Results components based on the new net cost
      for(let i = 0; i < 7; i++){
        const netUnitCost = parseFloat(state.netUnitCost[i]);
        //retailPricePu
        const retailPricePu = netUnitCost + Number((netUnitCost * (state.profitMargin[i]/100)).toFixed(2));
        state.retailPricePu[i] = Number((retailPricePu).toFixed(2));
        //retailTotal
        state.retailTotal[i] = Number(retailPricePu * state.quantity[i]).toFixed(2);
        //profit PU
        const profitPu = parseFloat((state.retailPricePu[i] - netUnitCost).toFixed(2));
        state.profitPu[i] = profitPu;
        //total profit
        state.totalProfit[i] = Number((profitPu * state.quantity[i]).toFixed(2));
      }

    },
    updateRetailPricePu: (state, action) => {
      const columnIndex = action.payload.columnIndex;
      //retail price pu
      state.retailPricePu[columnIndex] = action.payload.value;
      //retail total
      state.retailTotal[columnIndex] = parseFloat(state.retailPricePu[columnIndex] * state.quantity[columnIndex]);
      //profit margin
      const profitPu = parseFloat((state.retailPricePu[columnIndex] - state.netUnitCost[columnIndex]).toFixed(2));
      state.profitMargin[columnIndex] = getProfitMargin(profitPu, state.netUnitCost[columnIndex]);
      //profit PU    
      state.profitPu[columnIndex] = profitPu;
      //total profit
      state.totalProfit[columnIndex] = parseFloat(profitPu * state.quantity[columnIndex]).toFixed(2);
    },
    updateRetailTotal: (state, action) => {
      const columnIndex = action.payload.columnIndex;
      //retail total
      state.retailTotal[columnIndex] = action.payload.value;
      //retail price pu
      state.retailPricePu[columnIndex] = state.retailTotal[columnIndex] / state.quantity[columnIndex];
      //profit margin
      const profitPu = state.retailPricePu[columnIndex] - state.netUnitCost[columnIndex];
      state.profitMargin[columnIndex] = getProfitMargin(profitPu, state.netUnitCost[columnIndex]);
      //profit PU
      state.profitPu[columnIndex] = profitPu;
      //total profit
      state.totalProfit[columnIndex] = profitPu * state.quantity[columnIndex];
    },
    updateProfitMargin: (state, action) => {
      const columnIndex = action.payload.columnIndex;
      //profit margin
      state.profitMargin[columnIndex] = action.payload.value;
      //retail price pu
      const profitMargin = parseFloat(state.profitMargin[columnIndex]);
      const netUnitCost = parseFloat(state.netUnitCost[columnIndex]);
      state.retailPricePu[columnIndex] = parseFloat(netUnitCost + ((profitMargin * netUnitCost) / 100)).toFixed(2);
      const retailPricePu = parseFloat(state.retailPricePu[columnIndex]);
      state.retailTotal[columnIndex] = (retailPricePu * state.quantity[columnIndex]).toFixed(2);
      //profit pu
      const profitPu = (state.retailPricePu[columnIndex] - state.netUnitCost[columnIndex]).toFixed(2);
      state.profitPu[columnIndex] = profitPu;
      //total profit
      state.totalProfit[columnIndex] = (profitPu * state.quantity[columnIndex]).toFixed(2);
    },
    updateProfitPu: (state, action) => {
      const columnIndex = action.payload.columnIndex;
      //profit pu
      state.profitPu[columnIndex] = action.payload.value;
      const profitPu = state.profitPu[columnIndex];
      //retail price pu
      state.retailPricePu[columnIndex] = (state.netUnitCost[columnIndex] + profitPu).toFixed(2);
      //retail total
      state.retailTotal[columnIndex] = (state.retailPricePu[columnIndex] * state.quantity[columnIndex]).toFixed(2);
      //profit margin 
      state.profitMargin[columnIndex] = getProfitMargin(profitPu, state.netUnitCost[columnIndex]);
      //total profit
      state.totalProfit[columnIndex] = (profitPu * state.quantity[columnIndex]).toFixed(2);
    },
    updateTotalProfit: (state, action) => {
      const columnIndex = action.payload.columnIndex;
      //total profit
      state.totalProfit[columnIndex] = action.payload.value;
      const totalProfit = state.totalProfit[columnIndex];
      //profit pu
      state.profitPu[columnIndex] = (totalProfit / state.quantity[columnIndex]).toFixed(2);
      const profitPu = parseFloat(state.profitPu[columnIndex]);
      //retail price pu
      state.retailPricePu[columnIndex] = parseFloat((state.netUnitCost[columnIndex] + profitPu).toFixed(2));
      //retail total
      state.retailTotal[columnIndex] = (state.retailPricePu[columnIndex] * state.quantity[columnIndex]).toFixed(2);
      //profit margin 
      state.profitMargin[columnIndex] = getProfitMargin(profitPu, state.netUnitCost[columnIndex]);
      
    },
    loadDefaultProfits:  (state, action) => {
      
    }, 

  },
});


export const selectPricingType = (state) => state.main.pricingType;
export const selectQuantity = (state) => state.main.quantity;
export const selectUnitCost = (state) => state.main.unitCost;
export const selectUnitCode = (state) => state.main.unitCode;
export const selectSetupFee = (state) => state.main.setupFee;
export const selectSetupCode = (state) => state.main.setupCode;
export const selectBoxes = (state) => state.main.box;
export const selectBoxConfiguration = (state) => state.main.boxData;
export const selectHandling = (state) => state.main.handling;
export const selectIsEQP = (state) => state.main.pricingType !== "Non-EQP";
export const selectNetUnitCost = (state) => state.main.netUnitCost;
export const selectRetailPricePu = (state) => state.main.retailPricePu;
export const selectRetailTotal = (state) => state.main.retailTotal;
export const selectProfitMargin = (state) => state.main.profitMargin;
export const selectProfitPu = (state) => state.main.profitPu;
export const selectTotalProfit = (state) => state.main.totalProfit;
export const selectAdditionalData = (state) => state.main.additionalData;
export const {updateQuantity, updatePricingType, updateUnitCost, updateUnitCode, updateSetupFee, updateSetupCode, updateQtyPerBox, updateCostPerBox,updateBoxData, updateHandlingType, updateHandlingFee, clearHandlingFee, updateNetUnitCost ,updateRetailPricePu, updateRetailTotal, updateProfitMargin, updateProfitPu, updateTotalProfit, updateProfits} =
  mainSlice.actions;
  


export default mainSlice.reducer;
