import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default function ProtectedRouteEnrolled({ children, courseId }: { children: any, courseId: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  if (currentUser) {
    if(enrollments.some( (enrollment: any) => enrollment.user === currentUser._id && enrollment.course === courseId) )
      return children;
    else
      return null;
  } else {
    return null;
}}
