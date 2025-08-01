import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: localStorage.getItem("eventInfo") || "",
};

const eventInfoSlice = createSlice({
  name: "eventInfo",
  initialState,
  reducers: {
    updateEventInfo: (state, action) => {
      state.info = action.payload;
      localStorage.setItem("eventInfo", action.payload);
    },
  },
});

export const { updateEventInfo } = eventInfoSlice.actions;
export default eventInfoSlice.reducer;
