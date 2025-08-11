import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./pages/Profile";
import useCurrentUser from "./hooks/useCurrentUser";
import getOtherUsers from "./hooks/getOtherUsers";
import { useEffect } from "react";
import {io} from 'socket.io-client'
import { serverUrl } from "./main";
import { setOnlineUsers, setSocket } from "./redux/userSlice";

function App() {
  useCurrentUser();
  getOtherUsers();

  const dispatch = useDispatch()
  const { userData,otherUsers,socket,onlineUser, loading } = useSelector((state) => state.user);

  useEffect(()=>{
    const socketio = io(`${serverUrl}`,{
      query:{
        userId:userData?._id
      }
    })
    dispatch(setSocket(socketio))

    socketio.on('getOnlineUsers',(users)=>{
      dispatch(setOnlineUsers(users))
    })

    return ()=> socketio.close()
  },[userData])

  
  if (loading) {
    return <div>Loading user data...</div>; // ⏳ Show while fetching
  }
  return (
    <>
      <Routes>
        <Route
          path="/signup"
          element={userData ? <Navigate to="/" /> : <SignUp />}
        />
        <Route
          path="/login"
          element={userData ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/"
          element={!userData ? <Navigate to="/login" /> : <Home />}
        />
        {/* <Route path='/profile' element={!userData?<Navigate to='/login'/>:<Profile/>}/> */}
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
