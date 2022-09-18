import { configureStore } from "@reduxjs/toolkit";

import mainReducer from "../components/main/mainSlice";

export default configureStore({
    reducer: {
        main: mainReducer, 
    }
});