import { createContext, useContext, useEffect, useState } from "react";
import { Get } from "../utils/api";

const AuthContext = createContext({
  isLoading: true,
  isActiveSession: false,
  currentUser: {},
  getCurrentUser: ()=>{},
  clearCurrentUser: ()=>{},
  achievements: [],
})

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isActiveSession, setIsActiveSession] = useState(false);
  const [userID, setUserID] = useState("");
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const awaitVerifyUser = async () => await verifyUser();
    awaitVerifyUser(); // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const awaitGetUser = async (userID) => await getCurrentUser(userID);
    if (userID) awaitGetUser(userID); // eslint-disable-next-line
  }, [userID])

  const verifyUser = async () => {
    try {
      const res = await Get("");
      if (res.ok) setUserID(res.id);
    } catch(err) {
      setCurrentUser({});
      setIsActiveSession(false);
      console.log(err);
    }
  }

  const getCurrentUser = async (userID) => {
    try {
      setIsLoading(true);
      const res = await Get(`/user/${userID}`);
      setCurrentUser(res);
      await getAchvievements();
      setIsLoading(false);
      setIsActiveSession(true);
    } catch(err) {
      console.log(err);
    }
  }

  const clearCurrentUser = async () => {
    setCurrentUser({});
    setIsActiveSession(false);
  }

  const getAchvievements = async () => {
    try {
      const res = await Get("/achv");
      setAchievements(res);
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider value={{ isLoading, isActiveSession, currentUser, getCurrentUser, clearCurrentUser, achievements }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;