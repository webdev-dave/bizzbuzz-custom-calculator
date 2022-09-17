import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    retailPricePu: [0,0,0,0,0,0,0],
    retailTotal: [0,0,0,0,0,0,0],
    profitMargin: [0,0,0,0,0,0,0],
    profitPu: [0,0,0,0,0,0,0],
    totalProfit: [0,0,0,0,0,0,0]
}

const resultsSlice = createSlice({
    name: 'results',
    initialState: initialState,
    reducers: {
      updateRetailPricePu: (state, action) => {
        state.retailPricePu[action.payload.columnIndex] = action.payload.value;
        state.retailTotal[action.payload.columnIndex] = (action.payload.value * action.payload.qty);
      },
      updateRetailTotal: (state, action) => {
        
        state.retailTotal[action.payload.columnIndex] = action.payload.value;
        state.retailPricePu[action.payload.columnIndex] = (action.payload.value / action.payload.qty);
      }
    }
  });


export const selectRetailPricePu = (state) => state.results.retailPricePu;
export const selectRetailTotal = (state) => state.results.retailTotal;
export const selectProfitMargin = (state) => state.results.profitMargin;
export const selectProfitPu = (state) => state.results.profitPu;
export const selectTotalProfit = (state) => state.results.totalProfit;
export const { updateRetailPricePu, updateRetailTotal } = resultsSlice.actions;
export default resultsSlice.reducer;