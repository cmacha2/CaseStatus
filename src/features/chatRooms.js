import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatRooms: [],
};

export const chatRoomsSlice = createSlice({
  name: "ChatRooms",
  initialState,
  reducers: {
    setChatRooms: (state, action) => {
      state.chatRooms = action.payload;
    }
  }
});


export const {
    setChatRooms,
} = chatRoomsSlice.actions;

export default chatRoomsSlice.reducer;