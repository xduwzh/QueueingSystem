import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "./signupSlice";
import eventInfoReducer from "./eventInfoSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    signup: signupReducer,
    eventInfo: eventInfoReducer,
    user: userReducer,
  },
});
