import React, { useState, useEffect } from 'react';
import { BsGripVertical, BsPlus } from 'react-icons/bs';
import { FaPlus } from "react-icons/fa6";
import LessonControlButtons from '../Modules/LessonControlButtons';
import ModuleControlButtons from '../Modules/ModuleControlButtons';
import { MdHome } from 'react-icons/md';
import { IoEllipsisVertical } from 'react-icons/io5';
import { MdArrowDropDown } from "react-icons/md";
import { MdEditNote } from "react-icons/md";
import GreenCheckmark from '../Modules/GreenCheckmark';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useParams } from "react-router";
//import { assignments } from "../../Database";
import { Link } from 'react-router-dom';
import { setAssignments, addAssignment, deleteAssignment, updateAssignment }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import ProtectedRouteFaculty from '../../Account/ProtectedRouteFaculty';
import ProtectedRouteNotFaculty from '../../Account/ProtectedRouteNotFaculty';
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";

export default function Assignments() {
  const { cid } = useParams();
  const [chosenAssignment, setChosenAssignment] = useState<any>({});
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const dispatch = useDispatch();
  const removeAssignment = async (assignmentId: string) => {
    await assignmentsClient.deleteAssignment(assignmentId);
    dispatch(deleteAssignment(assignmentId));
  };
  const fetchAssignments = async () => {
    const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  };
  useEffect(() => {
    fetchAssignments();
  }, []);
  return (
    <div id="wd-assignments">
      
      <div id="wd-assignments-controls" className="text-nowrap d-flex justify-content-between">
        <div className="col-md-4">
          <FaMagnifyingGlass className="float-start position-relative me-2" />
          {/*<i className="bi bi-search"></i>*/}
          <input id="wd-search-assignment"
              placeholder="Search..."
              className="form-control me-1s float-start col-md-6"/>
        </div >
        <div className="">
          <ProtectedRouteFaculty><Link id="wd-add-assignment" to={`/Kanbas/Courses/${cid}/Assignments/create`} className="btn btn-lg btn-danger me-2 float-end">
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Assignment</Link></ProtectedRouteFaculty>
          <button id="wd-add-assignment-group" className="btn btn-lg btn-secondary me-2 float-end">
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Group</button>
        </div>
      </div><br /><br /><br /><br />


      <div>
        <ul id="wd-assignment-module" className="list-group rounded-0">
          <li className="wd-assignment-title list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              <MdArrowDropDown className="me-2 fs-3" />
              Assignments
              <div className="float-end">
                <button id="wd-assignment-total" className="btn btn-secondary border-dark rounded-pill me-2">
                  40% of Total</button>
                <BsPlus className="fs-2" />
                <IoEllipsisVertical className="fs-4" />
              </div>
            </div>

            <ul className="wd-assignment-list list-group rounded-0">
              
              {assignments
                //.filter((assignment: any) => assignment.course === cid)
                .map((assignment: any) => (
                  <li className="wd-assignment-list-item list-group-item p-3 ps-1">
                    <div className="d-flex justify-content-between">
                      <div className="">
                        <BsGripVertical className="me-2 fs-3" />
                        <MdEditNote className="me-2 fs-3 text-success" />
                      </div>
                      <div className="me-2 fs-6">
                        <ProtectedRouteFaculty><a className="wd-assignment-link"
                          href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}>
                          <b>{assignment.title}</b>
                        </a></ProtectedRouteFaculty>
                        <ProtectedRouteNotFaculty><b>{assignment.title}</b></ProtectedRouteNotFaculty>
                        <br /><span className="text-danger">Multiple Modules</span> | <b>Not available Until</b> May 6 at 12:00am | <b>Due</b> May 13 at 11:59pm | 100 pts
                      </div>
                      <div className="">
                        <ProtectedRouteFaculty><FaTrash className="text-danger me-3" onClick={() => setChosenAssignment({ _id: assignment._id, title: assignment.title, course: cid })} 
                          data-bs-toggle="modal" data-bs-target="#wd-delete-assignment-dialog" /></ProtectedRouteFaculty>
                        <LessonControlButtons />
                      </div>
                    </div>
                  </li>
              ))}

            </ul>
          </li>
        </ul>
      </div>

      <AssignmentDeleter dialogTitle="Delete Assignment" assignmentTitle={chosenAssignment.title}
        deleteAssignment={() => {
          removeAssignment(chosenAssignment._id);
        }} />
      
    </div>
);}


function AssignmentDeleter({ dialogTitle, assignmentTitle, deleteAssignment }:
{ dialogTitle: string; assignmentTitle: string; deleteAssignment: () => void; }) {
  return (
    
    <div id="wd-delete-assignment-dialog" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              {dialogTitle} </h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div className="modal-body">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              {`Are you sure to delete assignment: "${assignmentTitle}" ?`} </h1>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Cancel </button>
            <button onClick={deleteAssignment} type="button" data-bs-dismiss="modal" className="btn btn-danger">
              OK </button>
          </div>
        </div>
      </div>
    </div>
    
  );
}
