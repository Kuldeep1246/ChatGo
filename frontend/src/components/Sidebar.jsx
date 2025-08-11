import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dp from "../../public/download.jpeg";
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { BiLogOutCircle } from "react-icons/bi";
import getOtherUsers from "../hooks/getOtherUsers";
import axios from "axios";
import { serverUrl } from "../main";
import {
  setOtherUsers,
  setSelectedUser,
  setUserData
} from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
function Sidebar() {
  const dispatch = useDispatch();
  const { userData, otherUsers, onlineUsers, loading, selectedUser } =
    useSelector((state) => state.user);
  const [search, setSearch] = useState(false);
  const inputFocus = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (search && inputFocus.current) {
      inputFocus.current.focus();
    }
  }, [search]);
  async function handleLogout() {
    try {
      let res = await axios.post(
        `${serverUrl}/api/auth/logout`,
        {},
        {
          withCredentials: true
        }
      );
      dispatch(setUserData(null));
    } catch (error) {
      console.log(error.message);
    }
  }
  console.log(onlineUsers);
  return (
    <div
      className={`lg:w-[30%] w-full h-full lg:block  ${
        !selectedUser ? "block" : "hidden"
      } bg-slate-200`}
    >
      <div
        onClick={handleLogout}
        className="fixed bottom-5 left-4 w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center items-center bg-white shadow-gray-500 cursor-pointer shadow-lg"
      >
        <BiLogOutCircle className="w-[25px] h-[25px]" />
      </div>
      <div className="px-[20px] justify-center w-full h-[250px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex flex-col">
        <h1 className="text-white font-bold text-[25px]">Chat Go</h1>
        <div className="w-full flex justify-between items-center">
          <h1 className="text-gray-800 font-semibold text-[20px]">
            Hi, {userData.name || "user"}
          </h1>
          <div
            onClick={() => navigate("/profile")}
            className="cursor-pointer shadow-gray-500 shadow-lg w-[60px] h-[60px] rounded-full overflow-hidden flex mt-[10px] justify-center items-center"
          >
            <img src={userData.image || dp} alt="" className="h-[100%]" />
          </div>
        </div>
        <div className="w-full flex items-center gap-[10px]">
          {!search && (
            <div
              onClick={() => {
                setSearch(!search);
              }}
              className="shadow-gray-500 bg-white shadow-lg w-[40px] h-[40px] rounded-full overflow-hidden flex justify-center items-center"
            >
              <IoIosSearch className="cursor-pointer w-[20px] h-[20px]" />
            </div>
          )}
          {search && (
            <form className="w-full h-[40px] mt-[20px] px-3 bg-white flex items-center gap-[10px] shadow-gray-500 shadow-lg rounded-full">
              <IoIosSearch className="w-[20px] h-[20px]" />
              <input
                ref={inputFocus}
                type="text"
                placeholder="search users"
                className="w-full h-full outline-0 border-0"
              />
              <RxCross2
                className="cursor-pointer"
                onClick={() => setSearch(!search)}
              />
            </form>
          )}
          {loading ? (
            <p>loading...</p>
          ) : (
            !search &&
            otherUsers?.map(
              (ele, i) =>(
                onlineUsers?.includes(ele._id) && (
                  <div
                    key={ele._id}
                    className="shadow-gray-500 shadow-lg w-[40px] h-[40px] rounded-full overflow-hidden flex justify-center items-center"
                  >
                    <img src={ele.image || dp} alt="" className="h-[100%]" />
                  </div>
                )
            )
          )
          )}
        </div>
      </div>
      <div className="mt-[20px] mx-[10px] w-full h-[60px]  flex flex-col gap-[20px]">
        {otherUsers &&
          otherUsers.map((ele, i) => (
            <div
              onClick={() => dispatch(setSelectedUser(ele))}
              className="cursor-pointer hover:bg-[#20c7ff] flex items-center gap-[20px] rounded-full w-[95%] bg-gray-200 shadow-lg shadow-gray-500"
            >
              <div
                key={ele._id}
                className="shadow-gray-500 w-[40px] h-[40px] rounded-full overflow-hidden flex justify-center items-center"
              >
                <img src={ele.image || dp} alt="" className="h-[100%]" />
              </div>
              <h1 className="text-gray-800 font-semibold text-[15px]">
                {ele.name || ele.username}
              </h1>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Sidebar;
