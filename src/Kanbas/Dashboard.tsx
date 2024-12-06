import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import * as db from "./Database";
import ProtectedRouteFaculty from "./Account/ProtectedRouteFaculty";
import * as usersClient from "./Account/client";

export default function Dashboard(
{ courses, course, setCourse, addNewCourse,
  deleteCourse, updateCourse, enrolling, setEnrolling, updateEnrollment }: {
  courses: any[]; course: any; setCourse: (course: any) => void;
  addNewCourse: () => void; deleteCourse: (course: any) => void;
  updateCourse: () => void; enrolling: boolean; setEnrolling: (enrolling: boolean) => void; updateEnrollment: (courseId: string, enrolled: boolean) => void })
 {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  return (
    <div className="p-4" id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard
        <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary" >
          {enrolling ? "My Courses" : "All Courses"}
        </button>
      </h1> <hr />
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
      </div>
      <hr />

      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses  
            .map((course) => (
              <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                <div className="card rounded-3 overflow-hidden text-decoration-none text-dark">
                  <img src="/images/reactjs.jpg" width="100%" height={160} />
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                      {enrolling && (
                        <button onClick={(event) => {
                                  event.preventDefault();
                                  updateEnrollment(course._id, !course.enrolled);
                                }}
                                className={`btn ${ course.enrolled ? "btn-danger" : "btn-success" } float-end`} >
                          {course.enrolled ? "Unenroll" : "Enroll"}
                        </button>
                      )}
                      {course.name}
                    </h5>
                    <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                      {course.description} </p>
                    <Link id="wd-dashboard-course-link" to={`/Kanbas/Courses/${course._id}/Home`} className="btn btn-primary"> Go </Link>
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

                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
    </div>);}




//Optional: refactor the courses.json and/or the Dashboard component so that at least 3 courses have a different image.