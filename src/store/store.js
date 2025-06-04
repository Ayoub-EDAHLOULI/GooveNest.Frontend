import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";

const store = configureStore({
  reducer: {
    // Add your reducers here
    auth: authReducer,
  },
});

export default store;
