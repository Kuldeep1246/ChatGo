// hooks/useCurrentUser.js
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsers, setUserData } from "../redux/userSlice";
import { serverUrl } from "../main";
import { setMessage } from "../redux/messageSlice";

const useGetMessages = () => {
  const dispatch = useDispatch();

  const { userData,selectedUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/message/get/${selectedUser?._id}`, {
          withCredentials: true
        });
        dispatch(setMessage(res.data));
      } catch (error) {
        console.log(error.message);
        dispatch(setMessage([]));
      }
    };

    fetchMessage();
  }, [selectedUser,userData]);
};

export default useGetMessages;
