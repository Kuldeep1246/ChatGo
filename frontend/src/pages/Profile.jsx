import React, { useRef, useState } from "react";
import dp from "/download.jpeg";
import { IoCameraOutline } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../main";
import { setUserData } from "../redux/userSlice";
function Profile() {
  const dispatch = useDispatch()
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [name, setName] = useState(userData.name || "");
  const [frontendImage, setFrontendImage] = useState(userData.image || dp);
  const [backendImage, setBackendImage] = useState(null);
  const [loading,setLoading] = useState(false)

  const image = useRef();
  const handleImage = (e) =>{
    let file = e.target.files[0]
    console.log(file)
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }
  
  const handleProfile = async(e)=>{
    e.preventDefault()
    try {
      setLoading(true)
      let formData = new FormData()
      formData.append('name',name)
      if(backendImage){
        formData.append('image',backendImage)
      }
      let res = await axios.put(`${serverUrl}/api/user/edit_profile`,formData,{withCredentials:true})
      dispatch(setUserData(res.data))
      setLoading(false)
      navigate('/')
    } catch (error) {
      setLoading(false)
      console.error("Error uploading profile:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
  }
  return (
    <div className="flex flex-col justify-center items-center w-full h-[100vh] bg-slate-200 ">
      <div className="fixed top-[20px] left-[20px]">
        <IoIosArrowRoundBack
          onClick={() => navigate("/")}
          className="text-gray-600 cursor-pointer w-[50px] h-[50px]"
        />
      </div>
      <div
        onClick={() => image.current.click()}
        className=" mt-[20px] border-4 relative rounded-full border-[#20c7FF] shadow-gray-400 shadow-lg"
      >
        <div className="w-[200px]  h-[200px] rounded-full overflow-hidden">
          <img src={frontendImage} alt="" className="h-[100%] " />
        </div>
        <div className="absolute bottom-5 right-3 w-[35px] h-[35px] rounded-full flex justify-center items-center bg-[#20c7FF] text-gray-700">
          <IoCameraOutline className="cursor-pointer w-[25px] h-[25px]  text-gray-600  right-3" />
        </div>
      </div>
      <form
        onSubmit={handleProfile}
        className="w-[95%] h-[600px] max-w-[500px] flex flex-col gap-[20px] items-center justify-center"
      >
        <input
          type="file"
          accept="image/*"
          ref={image}
          hidden
          onChange={handleImage}
        />
        <input
          className="w-[90%] h-[50px] outline-none border-2 px-[20px] py-[10px] bg-white rounded-lg shadow-lg shadow-gray-400 border-[#20c7ff]"
          type="text"
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          className="text-gray-400 w-[90%] h-[50px] outline-none border-2 px-[20px] py-[10px] bg-white rounded-lg shadow-lg shadow-gray-400 border-[#20c7ff]"
          type="email"
          value={userData.email}
          readOnly
        />
        <input
          className="text-gray-400 w-[90%] h-[50px] outline-none border-2 px-[20px] py-[10px] bg-white rounded-lg shadow-lg shadow-gray-400 border-[#20c7ff]"
          type="text"
          value={userData.username}
          readOnly
        />
        <button
          type="submit"
          className={`p-[15px] bg-[#20c7ff] rounded-2xl text-[18px] w-[200px] mt-[20px] font-semibold shadow-lg shadow-gray-400 hover:shadow-inner disabled:opacity-60`}
        >
          {loading? "saving...":"Save"}
        </button>
      </form>
    </div>
  );
}

export default Profile;
