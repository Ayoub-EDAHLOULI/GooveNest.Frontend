import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import genreReducer from "./Slices/genreSlice";
import userReducer from "./Slices/userSlice";
import artistApplicationReducer from "./Slices/artistApplicationSlice";
import artistReducer from "./Slices/artistSlice";
import trackReducer from "./Slices/trackSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    genre: genreReducer,
    user: userReducer,
    artistApplication: artistApplicationReducer,
    artist: artistReducer,
    track: trackReducer,
  },
});

export default store;
