import { configureStore } from "@reduxjs/toolkit";
import inputReducer from "../components/input/inputSlice";

export default configureStore({
    reducer: {
        input: inputReducer
    }
});