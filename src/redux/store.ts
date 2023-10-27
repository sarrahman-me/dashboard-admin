import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "./slice/profile";

const store = configureStore({
  reducer: {
    profile: profileSlice,
  },
});

export default store;
