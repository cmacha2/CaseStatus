import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notifications: [],
};

export const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotificationsReducer: (state, action) => {
      state.posts = action.payload;
    },
   deleteNotificationReducer: (state, action) => {
        state.notifications = state.notifications.filter((notification) => notification.id !== action.payload);
    },
    loadMoreNotificationsReducer: (state, action) => {
      state.notifications = [...state.notifications, ...action.payload];
    },

}
});


export const { setNotificationsReducer, deleteNotificationReducer, loadMoreNotificationsReducer } = notificationSlice.actions;

export default notificationSlice.reducer;