import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pricing: "",
    quantities: [50, 100, 250, 500, 1000, 2500, 5000],
    unitPrice: [],
    unitCode: "",
    setupFee: "",
    setupCode: "",
    box: [{qty: "", cost: ""}],
    handlingFees: [{fee: "", type: ""}]
}

const inputSlice = createSlice({
    name: 'todos',
    initialState: initialState,
    reducers: {
    //   addTodo: (state, action) => state.push(action.payload)
    }
  });


  
//   export cosnt { addTodo } = todosSlice.actions;
  export default inputSlice.reducer;