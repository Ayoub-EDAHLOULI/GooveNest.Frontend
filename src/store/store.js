import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import genreReducer from "./Slices/genreSlice";
import userReducer from "./Slices/userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    genre: genreReducer,
    user: userReducer,
  },
});

export default store;
