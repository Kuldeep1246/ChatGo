// hooks/useCurrentUser.js
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { serverUrl } from "../main";

const useCurrentUser = () => {
  const dispatch = useDispatch();
  const {userData} = useDispatch()
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/user/current`, {
          withCredentials: true
        });
        dispatch(setUserData(res.data));
      } catch (error) {
        console.log(error.message);
        dispatch(setUserData(null)); 
      }
    };

    fetchUser();
  }, []);
};

export default useCurrentUser;
