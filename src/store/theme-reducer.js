import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loader: false,
  notification: false,
  action: "",
};
const themeSlice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    showLoading(state, action) {
      state.loader = true;
    },
    hideLoading(state) {
      state.loader = false;
    },
    showNotification(state) {
      state.notification = true;
    },
    hideNotification(state) {
      state.notification = false;
    },
    sent(state) {
      state.action = "Mail Sent Successfully";
    },
    remove(state) {
      state.action = "Mail Deleted Successfully";
    },
    login(state){
      state.action ="Logged In Successfully"
    }
  },
});

export const themeActions = themeSlice.actions;
export default themeSlice;
