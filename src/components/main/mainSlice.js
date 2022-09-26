import { createSlice } from "@reduxjs/toolkit";
import { initialBox, setupCodeDiscountValues, unitCodeDiscountValues } from "../../assets/helpers/helperObjects";

const getProfitMargin = (profitPu, unitCost) => {
  const profitMargin = (profitPu / unitCost ) * 100;
  return profitMargin.toFixed(2);
}

const initialState = {
  pricingType: "EQP",
  quantity: [100, 250, 500, 1000, 2500, 5000, 50],
  unitCost: [1, 1, 1, 1, 1, 1, 1],
  unitCode: ["C","C","C","C","C","C","C"],
  setupFee: 0,
  setupCode: "V",
  box: [initialBox, initialBox, initialBox, initialBox, initialBox],
  handlingFees: [{ fee: 0, type: "order" },{ fee: 0, type: "box" },{ fee: 0, type: "rush" },{ fee: 0, type: "misc" },{ fee: 0, type: "order" }],
  netUnitCost: [1, 1, 1, 1, 1, 1, 1],
  retailPricePu: [1, 1, 1, 1, 1, 1, 1],
  retailTotal: [0, 0, 0, 0, 0, 0, 0],
  profitMargin: [40, 40, 40, 40, 40, 40, 40],
  profitPu: [0, 0, 0, 0, 0, 0, 0],
  totalProfit: [0, 0, 0, 0, 0, 0, 0]
};

const mainSlice = createSlice({
  name: "main",
  initialState: initialState,
  reducers: {
    updatePricingType: (state, action) => {
      state.pricingType = action.payload.value;
      //make sure to copy col-0 values into all other columns when transitioning from "EQP" to "NON-EQP"
      if (action.payload.value !== "Non-EQP") {
        //if is EQP
        const colZeroUnitPrice = state.unitCost[0];
        state.unitCost = state.unitCost.map(unitP => {
          return colZeroUnitPrice;
        });
        const colZeroNetUnitCost = state.netUnitCost[0];
        state.netUnitCost = state.netUnitCost.map(unitC => {
          return colZeroNetUnitCost;
        });

      } else {
        //if is Non-EQP
        const colZeroUnitCode = state.unitCode[0];
        state.unitCode = state.unitCode.map(unitC => {
          return colZeroUnitCode;
        });
      }
    },
    updateQuantity: (state, action) => {
      const columnIndex = action.payload.columnIndex;
      state.quantity[columnIndex] = action.payload.value;
      state.retailTotal[columnIndex] = state.retailPricePu[columnIndex] * state.quantity[columnIndex];
      state.totalProfit[columnIndex] = state.profitPu[columnIndex] * state.quantity[columnIndex];
    },
    updateUnitCost: (state, action) => {
      const columnIndex = action.payload.columnIndex;
      state.unitCost[columnIndex] = action.payload.value;
      if(action.payload.isEQP){
        //profit margin
        for(let i = 0; i < 7; i++){
          //if is EQP then all (hidden unitPrice elements) are equal to col-0
          state.unitCost[i] = state.unitCost[0];
        }
      }
    },
    updateUnitCode: (state, action) => {
      const columnIndex = action.payload.columnIndex;
      const unitCode = action.payload.value;
      state.unitCode[columnIndex] = unitCode;
      const codeDiscountValue = unitCodeDiscountValues[unitCode];
      //net unit cost
      const unitCost = state.unitCost[columnIndex];
      state.netUnitCost[columnIndex] = parseFloat(unitCost - (unitCost * codeDiscountValue)); 
      //if pricing type is eqp - apply code discount (col-0) to all columns
      if(state.pricingType !== "Non-EQP"){
        for(let i = 0; i < 7; i++){
          state.netUnitCost[i] = parseFloat(unitCost - (unitCost * codeDiscountValue)); 
        }
      }
    },
    updateSetupFee: (state, action) => {
      state.setupFee = action.payload.value;
      const setupFee = state.setupFee;
      const discountedSetupFee = setupFee - (setupFee * parseFloat(setupCodeDiscountValues[state.setupCode]));
     
      //net unit cost 
      state.netUnitCost = state.netUnitCost.map((nuc, index) => {
        const codeDiscountValue = parseFloat(unitCodeDiscountValues[state.unitCode[index]]);
        const unitCost = parseFloat(state.unitCost[index]);
        const netUnitCost =  parseFloat(unitCost - (unitCost * codeDiscountValue));
        const quantity = parseFloat(state.quantity[index]);
        const discountedSetupFeePerUnit = parseFloat(discountedSetupFee / quantity);
        return parseFloat((netUnitCost + discountedSetupFeePerUnit).toFixed(4));
      })

    },
    updateSetupCode: (state, action) => {
      state.setupCode = action.payload.value;
    },
    updateQtyPerBox: (state, action) => {
      const boxIndex = action.payload.boxIndex;
      const qtyPerBox = action.payload.value;
      state.box[boxIndex].qty = qtyPerBox;
      //update boxData
      state.box[boxIndex].data = state.box[boxIndex].data.map((data, columnIndex) => {
        const quantity = state.quantity[columnIndex];
        const boxesRequired = Math.ceil(quantity / qtyPerBox);
        const totalCost = Number((boxesRequired * state.box[boxIndex].cost).toFixed(2));
        return {
          boxesRequired: boxesRequired,
          totalCost: totalCost
        };
      })
    },
    updateCostPerBox: (state, action) => {
      const boxIndex = action.payload.boxIndex;
      const costPerBox = action.payload.value;
      state.box[boxIndex].cost = costPerBox;
    },
    updateHandlingFee: (state, action) => {},
    updateHandlingType: (state, action) => {},
    updateNetUnitCost: (state, action) => {
      const setupFee = state.setupFee;
      const discountedSetupFee = setupFee - (setupFee * parseFloat(setupCodeDiscountValues[state.setupCode]));

      //update net unit cost
      state.netUnitCost = state.netUnitCost.map((nuc, index) => {
        const codeDiscountValue = parseFloat(unitCodeDiscountValues[state.unitCode[index]]);
        const unitCost = parseFloat(state.unitCost[index]);
        const baseNetUC =  parseFloat(unitCost - (unitCost * codeDiscountValue));
        const quantity = parseFloat(state.quantity[index]);
        const discountedSetupFeePerUnit = parseFloat(discountedSetupFee / quantity);
        const boxCostPerUnit =  Number((state.box[0].data[index].totalCost / quantity).toFixed(4));
        //console.log(`quantity: ${quantity} baseNetUC: ${baseNetUC} discountedSetupFeePerUnit: ${discountedSetupFeePerUnit} boxCostPerUnit: ${boxCostPerUnit}`)
        return Number((baseNetUC + discountedSetupFeePerUnit + boxCostPerUnit).toFixed(4));
      })

      //update all results accordingly
      for(let i = 0; i < 7; i++){
        const netUnitCost = parseFloat(state.netUnitCost[i]);
        //retailPricePu
        const retailPricePu = netUnitCost + parseFloat((netUnitCost * (state.profitMargin[i]/100)).toFixed(2));
        state.retailPricePu[i] = Number((retailPricePu).toFixed(2));
        //retailTotal
        state.retailTotal[i] = Number(retailPricePu * state.quantity[i]).toFixed(2);
        //profit PU
        const profitPu = parseFloat((state.retailPricePu[i] - netUnitCost).toFixed(2));
        state.profitPu[i] = profitPu;
        //total profit
        state.totalProfit[i] = profitPu * state.quantity[i];
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
export const selectIsEQP = (state) => state.main.pricingType !== "Non-EQP";
export const selectNetUnitCost = (state) => state.main.netUnitCost;
export const selectRetailPricePu = (state) => state.main.retailPricePu;
export const selectRetailTotal = (state) => state.main.retailTotal;
export const selectProfitMargin = (state) => state.main.profitMargin;
export const selectProfitPu = (state) => state.main.profitPu;
export const selectTotalProfit = (state) => state.main.totalProfit;
export const {updateQuantity, updatePricingType, updateUnitCost, updateUnitCode, updateSetupFee, updateSetupCode, updateQtyPerBox, updateCostPerBox, updateNetUnitCost ,updateRetailPricePu, updateRetailTotal, updateProfitMargin, updateProfitPu, updateTotalProfit, updateProfits} =
  mainSlice.actions;
  


export default mainSlice.reducer;
