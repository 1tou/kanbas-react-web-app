import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default function ProtectedRouteNotFaculty({ children }: { children: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  if (currentUser && (currentUser.role === "FACULTY" || currentUser.role === "ADMIN")) {
    return null;
  } else {
    return children;
}}
