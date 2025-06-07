import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import genreReducer from "./Slices/genreSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    genre: genreReducer,
  },
});

export default store;
