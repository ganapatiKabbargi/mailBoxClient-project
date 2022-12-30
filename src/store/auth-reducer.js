import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("token");
const initialMail = localStorage.getItem("email");
const initialState = {
  email: initialMail,
  token: initialToken,
  isLogedIn: !!initialToken,
};
const AuthSlice = createSlice({
  name: "Authentication",
  initialState: initialState,
  reducers: {
    login(state, action) {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("email", action.payload.email);
      state.isLogedIn = true;
    },
    logout(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      state.isLogedIn = false;
    },
  },
});

export default AuthSlice;
export const authActions = AuthSlice.actions;
