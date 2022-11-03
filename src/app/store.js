import { configureStore, combineReducers } from "@reduxjs/toolkit";
import collapseButtonReducer from "../components/additionalData/collapseButton/collapsedSlice";
import mainReducer from "../components/main/mainSlice";

const combinedReducer = combineReducers({
  main: mainReducer,
  collapsed: collapseButtonReducer,
})

const rootReducer = (state, action) => {
  if (action.type === 'main/resetAllValues') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export default configureStore({
    reducer: rootReducer,
});