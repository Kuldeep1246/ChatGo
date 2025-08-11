// redux/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    otherUsers:[],
    selectedUser:null,
    loading: true,
    socket:null,
    onlineUsers:null 
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      state.loading = false; 
    },
    clearUserData: (state) => {
      state.userData = null;
      state.loading = false;
    },
    setOtherUsers:(state,action)=>{
      state.loading = true
      state.otherUsers=action.payload
      state.loading = false
    },
    setSelectedUser:(state,action)=>{
      state.selectedUser = action.payload
    },
    setSocket:(state,action)=>{
      state.socket = action.payload
    },
    setOnlineUsers:(state,action)=>{
      state.onlineUsers = action.payload
    }
  }
});

export const { setUserData,setOnlineUsers,setSocket, clearUserData,setSelectedUser,setOtherUsers } = userSlice.actions;
export default userSlice.reducer;
