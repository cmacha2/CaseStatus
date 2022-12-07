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
    },
    removeChatRoom: (state, action) => {
      state.chatRooms = state.chatRooms.filter(
        (chatRoom) => chatRoom.id !== action.payload
      );
    }
  }
});


export const {
    setChatRooms,
    removeChatRoom
} = chatRoomsSlice.actions;

export default chatRoomsSlice.reducer;