import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import * as db from "./Database";
import ProtectedRouteFaculty from "./Account/ProtectedRouteFaculty";
import ProtectedRouteStudent from "./Account/ProtectedRouteStudent";
import ProtectedRouteStudentNotEnrolled from "./Account/ProtectedRouteStudentNotEnrolled";
import ProtectedRouteStudentEnrolled from "./Account/ProtectedRouteStudentEnrolled";
import ProtectedRouteEnrolled from "./Account/ProtectedRouteEnrolled";
import { setEnrollments, addEnrollment, deleteEnrollment } from "./Enrollments/reducer";
import * as usersClient from "./Account/client";
import * as enrollmentsClient from "./Enrollments/client";

export default function Dashboard(
{ courses, allCourses, course, setCourse, addNewCourse,
  deleteCourse, updateCourse }: {
  courses: any[]; allCourses: any[]; course: any; setCourse: (course: any) => void;
  addNewCourse: () => void; deleteCourse: (course: any) => void;
  updateCourse: () => void; })
 {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  //const [enrollment, setEnrollment] = useState<any>({});
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const [listAllCourses, setListAllCourses] = useState(false);
  const dispatch = useDispatch();

  const fetchEnrollments = async () => {
    const enrollments = await usersClient.findEnrollmentsForUser(currentUser._id as string);
    dispatch(setEnrollments(enrollments));
  };
  useEffect(() => {
    fetchEnrollments();
  }, []);
  useEffect(() => {
    fetchEnrollments();
  }, [currentUser]);

  const enroll = async (courseId: any) => {
    const newEnrollment = { _id: new Date().getTime().toString(), user: currentUser._id, course: courseId };
    const enrollment = await usersClient.createEnrollmentForUser(currentUser._id, newEnrollment);
    dispatch(addEnrollment(enrollment));
  };
  const unenroll = async (courseId: any) => {
    const e = enrollments.find((enrollment: any) => enrollment.user === currentUser._id && enrollment.course === courseId);
    if(e){
      await enrollmentsClient.deleteEnrollment(e._id);
      dispatch(deleteEnrollment(e._id));
    }
  };

  return (
    <div className="p-4" id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <ProtectedRouteFaculty><h5>New Course
          <button className="btn btn-primary float-end"
                  id="wd-add-new-course-click"
                  onClick={addNewCourse} >
            Add
          </button>
          <button className="btn btn-warning float-end me-2"
                  onClick={updateCourse} id="wd-update-course-click">
            Update
          </button>
      </h5><br />

      <input value={course.name} className="form-control mb-2"
             onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
      <textarea value={course.description} className="form-control"
             onChange={(e) => setCourse({ ...course, description: e.target.value }) } />
      <hr /></ProtectedRouteFaculty>

      <div className="d-flex justify-content-between">
        <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
        <ProtectedRouteStudent><button className="btn btn-primary float-end"
                id="wd-change-enrollments-display"
                onClick={() => setListAllCourses(!listAllCourses)} >
          Enrollments
        </button></ProtectedRouteStudent>  
      </div>
      <hr />

      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {(listAllCourses ? allCourses : courses)
            /*.filter((course) =>
              listAllCourses || enrollments.some(
                (enrollment: any) =>
                  enrollment.user === currentUser._id &&
                  enrollment.course === course._id
                 ))*/   
            .map((course) => (
              <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                <div className="card rounded-3 overflow-hidden text-decoration-none text-dark">
                  <img src="/images/reactjs.jpg" width="100%" height={160} />
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                      {course.name} </h5>
                    <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                      {course.description} </p>
                    <ProtectedRouteEnrolled courseId={course._id}><Link id="wd-dashboard-course-link" to={`/Kanbas/Courses/${course._id}/Home`} className="btn btn-primary"> Go </Link></ProtectedRouteEnrolled>
                    <ProtectedRouteFaculty><button onClick={(event) => {
                              event.preventDefault();
                              deleteCourse(course._id);
                            }} className="btn btn-danger float-end"
                            id="wd-delete-course-click">
                            Delete
                    </button>
                    <button id="wd-edit-course-click"
                      onClick={(event) => {
                        event.preventDefault();
                        setCourse(course);
                      }}
                      className="btn btn-warning me-2 float-end" >
                      Edit
                    </button></ProtectedRouteFaculty>

                    <ProtectedRouteStudentNotEnrolled courseId={course._id}><button onClick={(event) => {
                              event.preventDefault();
                              enroll(course._id);
                            }} className="btn btn-success float-end"
                            id="wd-enroll-course-click">
                            Enroll
                    </button></ProtectedRouteStudentNotEnrolled>

                    <ProtectedRouteStudentEnrolled courseId={course._id}><button onClick={(event) => {
                              event.preventDefault();
                              unenroll(course._id);
                            }} className="btn btn-danger float-end"
                            id="wd-unenroll-course-click">
                            Unenroll
                    </button></ProtectedRouteStudentEnrolled>

                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
    </div>);}




//Optional: refactor the courses.json and/or the Dashboard component so that at least 3 courses have a different image.