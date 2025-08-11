import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import dp from "../../public/download.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";
import { FaImages } from "react-icons/fa6";
import { RiEmojiStickerLine } from "react-icons/ri";
import { RiSendPlane2Fill } from "react-icons/ri";
import EmojiPicker from "emoji-picker-react";
import SenderMessage from "./SenderMessage";
import ReceiverMessage from "./ReceiverMessage";
import axios from "axios";
import { serverUrl } from "../main";
import { setMessage } from "../redux/messageSlice";
import { useEffect } from "react";

function Message() {
  const navigate = useNavigate();
  const { userData,selectedUser,socket } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.message);
  const [showPicker, setShowPicker] = useState(false);
  const [input, setInput] = useState("");
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const image = useRef();

  const handleImage = (e) => {
    let file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if(input.length===0 && !frontendImage) return
    try {
      let formData = new FormData();
      formData.append("message", input);

      if (backendImage) {
        formData.append("image", backendImage);
      }
      let res = await axios.post(
        `${serverUrl}/api/message/send/${selectedUser._id}`,
        formData,
        { withCredentials: true }
      );

      dispatch(setMessage([...message, res.data]));
      setInput("");
      setFrontendImage(null);
      setBackendImage(null);
    } catch (error) {
      console.log(error.message);
    }
  };
  const onEmojiClick = (emojiData) => {
    setInput((pre) => pre + emojiData.emoji);
    setShowPicker(false);
  };
  const dispatch = useDispatch();

  useEffect(()=>{
    socket.on('newMessage',(data)=>{
      dispatch(setMessage([...message,data]))
    })
    return ()=>socket.off('newMessage')
  },[message,setMessage])
  return (
    <div
      className={`lg:w-[70%] ${
        selectedUser ? "flex" : "hidden"
      } lg:flex flex-col w-full h-full bg-slate-300 border-l-2 border-gray-300 relative`}
    >
      {selectedUser && (
        <>
          <div className="gap-[20px] px-[20px] items-center w-full h-[100px] bg-[#20c7ff] rounded-b-[30px] shadow-gray-400 shadow-lg flex ">
            <div className="">
              <IoIosArrowRoundBack
                onClick={() => dispatch(setSelectedUser(null))}
                className="text-white cursor-pointer w-[40px] h-[40px]"
              />
            </div>
            <div className="cursor-pointer shadow-gray-500 shadow-lg w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center items-center">
              <img src={selectedUser.image || dp} alt="" className="h-[100%]" />
            </div>

            <h1 className=" text-white font-semibold text-[20px]">
              {selectedUser?.name || "User"}
            </h1>
          </div>
          <div className=" overflow-auto py-[20px] w-full h-[360px] flex flex-col px-2 pt-[30px]">
            {showPicker && (
              <div className="mb-2">
                <EmojiPicker
                  onEmojiClick={onEmojiClick}
                  width={250}
                  height={300}
                />
              </div>
            )}

            {message?.map((ele, index) =>
              ele.sender === userData._id ? (
                <div key={index} className="self-end">
                  <SenderMessage image={ele.image} message={ele.message} />
                </div>
              ) : (
                <div key={index} className="self-start">
                  <ReceiverMessage image={ele.image} message={ele.message} />
                </div>
              )
            )}
          </div>
        </>
      )}

      {!selectedUser && (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <h1 className="text-gray-700 font-bold text-[50px]">
            Welcome to Chat Go
          </h1>
          <p className="pt-[10px] text-2xl">Enjoy Chatting</p>
        </div>
      )}

      {selectedUser && (
        <div className="w-full lg:w-[70%] h-[100px] flex justify-center items-center fixed bottom-[20px]">
          <img
            src={frontendImage}
            alt=""
            className="absolute w-[80px] bottom-[80px] right-[15%] rounded-lg shadow-gray-300 shadow-lg"
          />
          <form
            onSubmit={handleSendMessage}
            className="px-[10px] flex items-center gap-[10px] bg-blue-400 w-[95%] rounded-full shadow-gray-400 shadow-lg max-w-[80%] h-[50px]  "
          >
            <input
              type="file"
              hidden
              accept="image/*"
              ref={image}
              onChange={handleImage}
            />
            <div onClick={() => setShowPicker(!showPicker)}>
              <RiEmojiStickerLine className="cursor-pointer px-[2px] w-[25px] h-[25px] text-white" />
            </div>
            <input
              type="text"
              placeholder="Message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="text-white  w-full h-full px-[10px] outline-none border-none"
            />
            <div onClick={() => image.current.click()}>
              <FaImages className="px-[2px] cursor-pointer w-[25px] h-[25px] text-white" />
            </div>
            <button type="submit">
              <RiSendPlane2Fill className="cursor-pointer px-[2px] w-[25px] h-[25px] text-white" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Message;
