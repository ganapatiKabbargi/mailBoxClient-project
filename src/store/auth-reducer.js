import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("token");
const initialState = {
  token: initialToken,
  isLogedIn: false,
  emails: [],
};
const AuthSlice = createSlice({
  name: "Authentication",
  initialState: initialState,
  reducers: {
    login(state, action) {
      localStorage.setItem("token", action.payload);
      state.isLogedIn = true;
    },
    logout(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      state.isLogedIn = false;
    },
    addEmails(state, action) {
      state.emails = action.payload;
    },
  },
});

export default AuthSlice;
export const authActions = AuthSlice.actions;
