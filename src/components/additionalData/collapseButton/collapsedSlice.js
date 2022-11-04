import { createSlice } from "@reduxjs/toolkit";


export const initialState = {
  additionalData: {
    isCollapsed: true,
  },
};

const collapsedSlice = createSlice({
  name: "collapsedSlice",
  initialState: initialState,
  reducers: {
    updateAdditionalDataCollapsedState: (state, action) => {
      state.additionalData.isCollapsed = action.payload.value;
    },

  },
});



export const selectAdditionalDataCollapsedState = (state) => state.collapsed.additionalData.isCollapsed;
export const {updateAdditionalDataCollapsedState} =
collapsedSlice.actions;
  


export default collapsedSlice.reducer;
