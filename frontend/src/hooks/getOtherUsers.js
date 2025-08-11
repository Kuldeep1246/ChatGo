// hooks/useCurrentUser.js
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsers, setUserData } from "../redux/userSlice";
import { serverUrl } from "../main";

const getOtherUsers = () => {
  const dispatch = useDispatch();

  const {userData} = useSelector(state=>state.user)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/user/others`, {
          withCredentials: true
        });
        dispatch(setOtherUsers(res.data));
      } catch (error) {
        console.log(error.message);
        dispatch(setOtherUsers(null)); 
      }
    };

    fetchUser();
  }, [userData]);
};

export default getOtherUsers;
