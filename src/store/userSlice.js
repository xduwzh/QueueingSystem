// store/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialUser = JSON.parse(localStorage.getItem("user") || "null");

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: initialUser, // 初始从 localStorage 读
  },
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // 同步保存
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
