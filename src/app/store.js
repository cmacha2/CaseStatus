import {configureStore} from "@reduxjs/toolkit"
import userReducer from "../features/user"
import postsReducer from "../features/posts";
import chatRoomsReducer from "../features/chatRooms";
import profileReducer from "../features/profile";

export const store = configureStore({
    reducer:{
        user:userReducer,
        posts: postsReducer,
        chatRooms: chatRoomsReducer,
        profile: profileReducer,
    }
})