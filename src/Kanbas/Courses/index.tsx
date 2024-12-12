//import { courses } from "../Database";
import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import { useState, useEffect } from "react";
import * as client from "./client";
import Quizzes from "./Quizzes";
import QuizEditor from "./Quizzes/QuizEditor";
import QuizDetails from "./Quizzes/QuizDetails";
import Questions from "./Quizzes/Questions";
import QuestionEditor from "./Quizzes/Questions/QuestionEditor";
import QuizPreview from "./Quizzes/QuizPreview";

export default function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();
  
  const [users, setUsers] = useState<any[]>([]);
  const fetchUsersForCourse = async () => {
    const users = await client.findUsersForCourse(cid as string);
    setUsers(users);
  };
  useEffect(() => {
    fetchUsersForCourse();
  }, [cid]);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        <div className="flex-fill">
        <Routes>
          <Route path="/" element={<Navigate to="Home" />} />
          <Route path="Home" element={<Home />} />
          <Route path="Modules" element={<Modules />} />
          <Route path="Assignments" element={<Assignments />} />
          <Route path="Assignments/:aid" element={<AssignmentEditor />} />
          <Route path="People" element={<PeopleTable users={users} />} />

          <Route path="Quizzes" element={<Quizzes />} />
          <Route path="Quizzes/:quizid" element={<QuizDetails />} />
          <Route path="Quizzes/:quizid/Details" element={<QuizDetails />} />
          <Route path="Quizzes/:quizid/Preview" element={<QuizPreview />} />
          <Route path="Quizzes/:quizid/Preview/Questions" element={<QuizPreview />} />
          <Route path="Quizzes/:quizid/Editor" element={<QuizEditor />} />
          <Route path="Quizzes/:quizid/Questions" element={<Questions />} />
          <Route path="Quizzes/:quizid/Questions/:questionid" element={<QuestionEditor />} />
          
        </Routes>
        </div></div>
    </div>
);}


/*


*/