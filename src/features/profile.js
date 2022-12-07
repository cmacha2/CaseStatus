import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profilePosts: [],
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileReducer: (state, action) => {
      state.profilePosts = action.payload;
    },
  },
});

export const {
  setPostsReducer,
  
} = profileSlice.actions;

export default profileSlice.reducer;