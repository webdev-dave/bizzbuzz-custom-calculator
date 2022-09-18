import { createSlice } from "@reduxjs/toolkit";


const getProfitMargin = (profitPu, retailPricePu) => {
  const profitMargin = (profitPu / retailPricePu ) * 100;
  return profitMargin;
}
//getProfitMargin(profitPu, state.retailPricePu[columnIndex]);


const initialState = {
  pricingType: "EQP",
  quantity: [100, 250, 500, 1000, 2500, 5000, 50],
  unitCost: [0, 0, 0, 0, 0, 0, 0],
  unitCode: "",
  setupFee: "",
  setupCode: "",
  box: [{ qty: "", cost: "" }],
  handlingFees: [{ fee: "", type: "" }],
  retailPricePu: [0, 0, 0, 0, 0, 0, 0],
  retailTotal: [0, 0, 0, 0, 0, 0, 0],
  profitMargin: [0, 0, 0, 0, 0, 0, 0],
  profitPu: [0, 0, 0, 0, 0, 0, 0],
  totalProfit: [0, 0, 0, 0, 0, 0, 0]
};

const mainSlice = createSlice({
  name: "main",
  initialState: initialState,
  reducers: {
    updatePricingType: (state, action) => {
      state.pricingType = action.payload.value;
      //make sure to clear all column values (except col-0) when NON-EQP
      if (action.payload !== "Non-EQP") {
        const colZeroUnitPrice = state.unitCost[0];
        state.unitCost = state.unitCost.map(unitP => {
          return colZeroUnitPrice;
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
          //if is EQP then all result profit values are calculated/mutated based on the solo (col-0) value for unit price
          const unitCostColumnZero = state.unitCost[0];
          const profitPu = state.retailPricePu[i] - unitCostColumnZero;
          const profitMargin = getProfitMargin(profitPu, state.retailPricePu[i]);
          state.profitMargin[i] = profitMargin;
          //profit PU
          
          state.profitPu[i] = profitPu;
          //total profit
          state.totalProfit[i] = profitPu * state.quantity[i];
        }

      }
      
      //profit margin
      const profitPu = state.retailPricePu[columnIndex] - state.unitCost[columnIndex];
      const profitMargin = getProfitMargin(profitPu, state.retailPricePu[columnIndex]);
      state.profitMargin[columnIndex] = profitMargin;
      //profit PU
      state.profitPu[columnIndex] = profitPu;
      //total profit
      state.totalProfit[columnIndex] = profitPu * state.quantity[columnIndex];

    },
    updateUnitCode: (state, action) => {},
    updateSetupFee: (state, action) => {},
    updateSetupCode: (state, action) => {},
    updateQtyPb: (state, action) => {},
    updateCostPb: (state, action) => {},
    updateHandlingFee: (state, action) => {},
    updateHandlingType: (state, action) => {},


    updateRetailPricePu: (state, action) => {
      const columnIndex = action.payload.columnIndex;
      //retail price pu
      state.retailPricePu[columnIndex] = action.payload.value;
      //retail total
      state.retailTotal[columnIndex] = state.retailPricePu[columnIndex] * state.quantity[columnIndex];
      //profit margin
      const profitPu = state.retailPricePu[columnIndex] - state.unitCost[columnIndex];
      state.profitMargin[columnIndex] = getProfitMargin(profitPu, state.retailPricePu[columnIndex]);
      //profit PU    
      state.profitPu[columnIndex] = profitPu;
      //total profit
      state.totalProfit[columnIndex] = profitPu * state.quantity[columnIndex];
    },
    updateRetailTotal: (state, action) => {
      const columnIndex = action.payload.columnIndex;
      //retail total
      state.retailTotal[columnIndex] = action.payload.value;
      //retail price pu
      state.retailPricePu[columnIndex] = state.retailTotal[columnIndex] / state.quantity[columnIndex];
      //profit margin
      const profitPu = state.retailPricePu[columnIndex] - state.unitCost[columnIndex];
      state.profitMargin[columnIndex] = getProfitMargin(profitPu, state.retailPricePu[columnIndex]);
      //profit PU
      state.profitPu[columnIndex] = profitPu;
      //total profit
      state.totalProfit[columnIndex] = profitPu * state.quantity[columnIndex];
    },
    updateProfitMargin: (state, action) => {
      // const columnIndex = action.payload.columnIndex;
      // //profit margin
      // state.profitMargin[columnIndex] = Number(action.payload.value);
      // //retail price pu
      // const profitMargin = Number(state.profitMargin[columnIndex]);
      // state.retailPricePu[columnIndex] = 1 + ((state.unitCost[columnIndex]) * (profitMargin / 100));
      // //retail total
      // state.retailTotal[columnIndex] = state.retailPricePu[columnIndex] * state.quantity[columnIndex];
      // //profit pu
      // const profitPu = state.retailPricePu[columnIndex] - state.unitCost[columnIndex];
      // state.profitPu[columnIndex] = profitPu;
      // //total profit
      // state.totalProfit[columnIndex] = profitPu * state.quantity[columnIndex]
    },
    updateProfitPu: (state, action) => {
      // state.profitPu[action.payload.columnIndex] = action.payload.value;
    },
    updateTotalProfit: (state, action) => {
      // state.totalProfit[action.payload.columnIndex] = action.payload.value;
    },
    loadDefaultProfits:  (state, action) => {
      
    }, 

  },
});


export const selectPricingType = (state) => state.main.pricingType;
export const selectQuantity = (state) => state.main.quantity;
export const selectUnitCost = (state) => state.main.unitCost;
export const selectIsEQP = (state) => state.main.pricingType !== "Non-EQP";
export const selectRetailPricePu = (state) => state.main.retailPricePu;
export const selectRetailTotal = (state) => state.main.retailTotal;
export const selectProfitMargin = (state) => state.main.profitMargin;
export const selectProfitPu = (state) => state.main.profitPu;
export const selectTotalProfit = (state) => state.main.totalProfit;
export const {updateQuantity, updatePricingType, updateUnitCost, updateRetailPricePu, updateRetailTotal, updateProfitMargin, updateProfitPu, updateTotalProfit, updateProfits} =
  mainSlice.actions;
  


export default mainSlice.reducer;
