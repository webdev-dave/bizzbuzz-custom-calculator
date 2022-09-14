import { configureStore } from "@reduxjs/toolkit";
import inputReducer from "../components/input/inputSlice";
import resultsReducer from "../components/results/resultsSlice";

export default configureStore({
    reducer: {
        input: inputReducer,
        results: resultsReducer,
    }
});