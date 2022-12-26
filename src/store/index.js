import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./auth-reducer";

const store = configureStore({
  reducer: { auth: AuthSlice.reducer },
});

export default store;
