import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  isLoggedIn: false,
  email: null,
  userName: null,
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      console.log(action.payload);
    },
  },
});

export const { SET_ACTIVE_USER } = authSlice.actions;

export const selectEmail = (state) => state.auth.email;
export const selectUserName = (state) => state.auth.username;
export const selectUserId = (state) => state.auth.userId;
export default authSlice.reducer;
