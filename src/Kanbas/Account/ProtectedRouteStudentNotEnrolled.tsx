import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default function ProtectedRouteStudentNotEnrolled({ children, courseId }: { children: any, courseId: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  if (currentUser && (currentUser.role === "STUDENT" || currentUser.role === "ADMIN")) {
    if(enrollments && enrollments.some( (enrollment: any) => enrollment.user === currentUser._id && enrollment.course === courseId) )
      return null;
    else
      return children;
  } else {
    return null;
  }
}
