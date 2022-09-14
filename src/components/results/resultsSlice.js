import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    retailPricePu: [0,0,0,0,0,0,0],
    retailTotal: [0,0,0,0,0,0,0],
    profitMargin: [0,0,0,0,0,0,0],
    prfitPu: [0,0,0,0,0,0,0],
    totalProfit: [0,0,0,0,0,0,0]
}

const resultsSlice = createSlice({
    name: 'todos',
    initialState: initialState,
    reducers: {
    //   addTodo: (state, action) => state.push(action.payload)
    }
  });


  
//   export cosnt { addTodo } = todosSlice.actions;
export default resultsSlice.reducer;