import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./auth-reducer";
import emailSlice from "./email-reducer";

const store = configureStore({
  reducer: { auth: AuthSlice.reducer, email: emailSlice.reducer },
});

export default store;
