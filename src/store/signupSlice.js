import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mockFetchSignups, mockSignup, mockCancelSignup } from "../mockApi";

// 异步获取报名数据
export const fetchSignups = createAsyncThunk("signup/fetch", async () => {
  return await mockFetchSignups();
});

// 异步报名
export const signupUser = createAsyncThunk(
  "signup/add",
  async (user, { rejectWithValue }) => {
    const res = await mockSignup(user);
    if (res.success) return res;
    return rejectWithValue(res.message);
  }
);

// ✅ 异步取消报名
export const cancelSignupUser = createAsyncThunk(
  "signup/cancel",
  async (user, { rejectWithValue }) => {
    const res = await mockCancelSignup(user);
    if (res.success) return res;
    return rejectWithValue(res.message);
  }
);

const signupSlice = createSlice({
  name: "signup",
  initialState: {
    signedList: [],
    waitList: [],
    status: "idle",
    error: null,
    lastSignupStatus: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignups.fulfilled, (state, action) => {
        state.signedList = action.payload.signed;
        state.waitList = action.payload.waitlisted;
        state.status = "succeeded";
      })

      .addCase(signupUser.fulfilled, (state, action) => {
        state.lastSignupStatus = action.payload.status;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.lastSignupStatus = "failed";
        state.error = action.payload;
      })

      // ✅ 处理取消报名成功和失败
      .addCase(cancelSignupUser.fulfilled, (state, action) => {
        state.lastSignupStatus = "cancelled";
      })
      .addCase(cancelSignupUser.rejected, (state, action) => {
        state.lastSignupStatus = "cancel_failed";
        state.error = action.payload;
      });
  },
});

export default signupSlice.reducer;
