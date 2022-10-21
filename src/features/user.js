import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  firstName: null,
  lastName: null,
  profilePicture: null,
  backgroundPicture: null,
  email: null,
  status: null,
  notificationToken: null,
  latitude:null,
  longitude:null,
  cases: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return (state = action.payload);
    },
    resetUser: (state) => {
      return (state = {
        id: null,
        firstName: null,
        lastName: null,
        profilePicture: null,
        backgroundPicture: null,
        email: null,
        status: null,
        notificationToken: null,
        latitude:null,
        longitude:null,
        cases: [],
      });
    },
    resetProfilePicture: (state, action) => {
      return {
        ...state,
        profilePicture: action.payload,
      };
    },
    resetBackgroundPicture: (state, action) => {
      return {
        ...state,
        backgroundPicture: action.payload,
      };
    },
    resetFirstName: (state, action) => {
      return {
        ...state,
        firstName: action.payload,
      };
    },
    resetLastName: (state, action) => {
      return {
        ...state,
        lastName: action.payload,
      };
    },
    resetStatus: (state, action) => {
      return {
        ...state,
        status: action.payload,
      };
    },
    resetNotificationToken:(state,action)=>{
      return {
        ...state,
        notificationToken:action.payload
      }
    },
    resetLocation:(state,action)=>{
      const {latitude,longitude}= action.payload
      return {
        ...state,
        latitude:latitude,
        longitude:longitude
      }
    },
    resetCases: (state, action) => {
      console.log("reset cases", action.payload);
      return {
        ...state,
        cases: [...state.cases,action.payload],
      };
    },
    resetCaseDelete: (state, action) => {
      return {
        ...state,
        cases: state.cases.filter((item) => item.id !== action.payload),
      };
    },
    resetCaseUpdate: (state, action) => {
      return {
        ...state,
        cases: state.cases?.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    },
  },
});

export const {
  setUser,
  resetUser,
  resetProfilePicture,
  resetFirstName,
  resetLastName,
  resetStatus,
  resetLocation,
  resetNotificationToken,
  resetCases,
  resetCaseDelete,
  resetCaseUpdate,
  resetBackgroundPicture,
} = userSlice.actions;
export default userSlice.reducer;
