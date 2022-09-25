import { createSlice } from "@reduxjs/toolkit";


const getProfitMargin = (profitPu, unitCost) => {
  const profitMargin = (profitPu / unitCost ) * 100;
  return profitMargin.toFixed(2);
}



const initialState = {
  pricingType: "EQP",
  quantity: [100, 250, 500, 1000, 2500, 5000, 50],
  unitCost: [1, 1, 1, 1, 1, 1, 1],
  unitCode: "",
  setupFee: "",
  setupCode: "",
  box: [{ qty: "", cost: "" }],
  handlingFees: [{ fee: "", type: "" }],
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
          const unitCostColumnZero = parseFloat(state.unitCost[0]);
          //retailPricePu
          const retailPricePu = unitCostColumnZero + parseFloat((unitCostColumnZero * (state.profitMargin[i]/100)).toFixed(2))
          state.retailPricePu[i] = retailPricePu;
          //retailTotal
          state.retailTotal[i] = retailPricePu * state.quantity[i];
          //profit PU
          const profitPu = parseFloat((state.retailPricePu[i] - unitCostColumnZero).toFixed(2));
          state.profitPu[i] = profitPu;
          //total profit
          state.totalProfit[i] = profitPu * state.quantity[i];
        }

      } else {
        const unitCost = parseFloat(state.unitCost[columnIndex]);
        //retail price pu
        const retailPricePu = unitCost + Number((unitCost * (state.profitMargin[columnIndex]/100)).toFixed(2));
        state.retailPricePu[columnIndex] = retailPricePu;
        //retail total
        state.retailTotal[columnIndex] = retailPricePu * state.quantity[columnIndex];
        //profit PU
        const profitPu = parseFloat((state.retailPricePu[columnIndex] - state.unitCost[columnIndex]).toFixed(2));;
        state.profitPu[columnIndex] = profitPu;
        //total profit
        state.totalProfit[columnIndex] = profitPu * state.quantity[columnIndex];
      }
      
      //profit margin
     

    },
    updateUnitCode: (state, action) => {},
    updateSetupFee: (state, action) => {},
    updateSetupCode: (state, action) => {},
    updateQtyPb: (state, action) => {},
    updateCostPb: (state, action) => {},
    updateHandlingFee: (state, action) => {},
    updateHandlingType: (state, action) => {},
    updateNetUnitCost: (state, action) => {
      
    },
    updateRetailPricePu: (state, action) => {
      const columnIndex = action.payload.columnIndex;
      //retail price pu
      state.retailPricePu[columnIndex] = action.payload.value;
      //retail total
      state.retailTotal[columnIndex] = parseFloat(state.retailPricePu[columnIndex] * state.quantity[columnIndex]);
      //profit margin
      const profitPu = parseFloat((state.retailPricePu[columnIndex] - state.unitCost[columnIndex]).toFixed(2));
      state.profitMargin[columnIndex] = getProfitMargin(profitPu, state.unitCost[columnIndex]);
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
      const profitPu = state.retailPricePu[columnIndex] - state.unitCost[columnIndex];
      state.profitMargin[columnIndex] = getProfitMargin(profitPu, state.unitCost[columnIndex]);
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
      const unitCost = parseFloat(state.unitCost[columnIndex]);
      state.retailPricePu[columnIndex] = parseFloat(unitCost + ((profitMargin * unitCost) / 100)).toFixed(2);
      const retailPricePu = parseFloat(state.retailPricePu[columnIndex]);
      state.retailTotal[columnIndex] = (retailPricePu * state.quantity[columnIndex]).toFixed(2);
      //profit pu
      const profitPu = (state.retailPricePu[columnIndex] - state.unitCost[columnIndex]).toFixed(2);
      state.profitPu[columnIndex] = profitPu;
      //total profit
      state.totalProfit[columnIndex] = (profitPu * state.quantity[columnIndex]).toFixed(2);
    },
    updateProfitPu: (state, action) => {
      const columnIndex = action.payload.columnIndex;
      //profit pu
      state.profitPu[columnIndex] = action.payload.value;
      const profitPu = state.profitPu[columnIndex];
      console.log("profitPU: " + typeof(profitPu));
      //retail price pu
      state.retailPricePu[columnIndex] = (state.unitCost[columnIndex] + profitPu).toFixed(2);
      //retail total
      state.retailTotal[columnIndex] = (state.retailPricePu[columnIndex] * state.quantity[columnIndex]).toFixed(2);
      //profit margin 
      state.profitMargin[columnIndex] = getProfitMargin(profitPu, state.unitCost[columnIndex]);
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
      parseFloat(state.retailPricePu[columnIndex] = (state.unitCost[columnIndex] + profitPu).toFixed(2));
      //retail total
      state.retailTotal[columnIndex] = (state.retailPricePu[columnIndex] * state.quantity[columnIndex]).toFixed(2);
      //profit margin 
      state.profitMargin[columnIndex] = getProfitMargin(profitPu, state.unitCost[columnIndex]);
      
    },
    loadDefaultProfits:  (state, action) => {
      
    }, 

  },
});


export const selectPricingType = (state) => state.main.pricingType;
export const selectQuantity = (state) => state.main.quantity;
export const selectUnitCost = (state) => state.main.unitCost;
export const selectIsEQP = (state) => state.main.pricingType !== "Non-EQP";
export const selectNetUnitCost = (state) => state.main.netUnitCost;
export const selectRetailPricePu = (state) => state.main.retailPricePu;
export const selectRetailTotal = (state) => state.main.retailTotal;
export const selectProfitMargin = (state) => state.main.profitMargin;
export const selectProfitPu = (state) => state.main.profitPu;
export const selectTotalProfit = (state) => state.main.totalProfit;
export const {updateQuantity, updatePricingType, updateUnitCost, updateNetUnitCost ,updateRetailPricePu, updateRetailTotal, updateProfitMargin, updateProfitPu, updateTotalProfit, updateProfits} =
  mainSlice.actions;
  


export default mainSlice.reducer;
