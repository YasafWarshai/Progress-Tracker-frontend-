import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const UserRoute = ({ children }) => {
  const { isLoading, currentUser } = useAuthContext();

  if (!isLoading && !Object.keys(currentUser).length) return <Navigate to="/" replace />
  return children;
}