import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  pricingType: "EQP",
  quantities: [100, 250, 500, 1000, 2500, 5000, 50],
  unitPrice: [0, 0, 0, 0, 0, 0, 0],
  unitCode: "",
  setupFee: "",
  setupCode: "",
  box: [{ qty: "", cost: "" }],
  handlingFees: [{ fee: "", type: "" }],
};

const inputSlice = createSlice({
  name: "input",
  initialState: initialState,
  reducers: {
    updatePricingType: (state, action) => {
      state.pricingType = action.payload
    },
    updateQuantity: (state, action) => {
      
      
      state.quantities[action.payload.columnIndex] = action.payload.value;
    },
  },
});

export const selectPricingType = (state) => state.input.pricingType;
export const selectQuantity = (state) => state.input.quantities;
export const { updateQuantity, updatePricingType } = inputSlice.actions;
export default inputSlice.reducer;



