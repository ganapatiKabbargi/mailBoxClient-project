import { createSlice } from "@reduxjs/toolkit";

const initialMail = localStorage.getItem("email");
const initialState = {
  email: initialMail,
  sentMails: [],
  receivedMails: [],
  isInbox: true,
  isSent: false,
};
const emailSlice = createSlice({
  name: "email",
  initialState: initialState,
  reducers: {
    updateEmailData(state, action) {
      state.receivedMails = [...action.payload.receivedMail];
      state.sentMails = [...action.payload.sentMail];
    },
    fetchInboxData(state) {
      state.isInbox = true;
      state.isSent = false;
    },
    fetchSentData(state) {
      state.isInbox = false;
      state.isSent = true;
    },
  },
});

export default emailSlice;

export const emailActions = emailSlice.actions;
