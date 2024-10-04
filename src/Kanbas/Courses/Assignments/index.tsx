import React from 'react';
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
export default function Assignments() {
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
            <button id="wd-add-assignment" className="btn btn-lg btn-danger me-2 float-end">
              <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
              Assignment</button>
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
                <li className="wd-assignment-list-item list-group-item p-3 ps-1">
                  <div className="d-flex justify-content-between">
                    <div className="">
                      <BsGripVertical className="me-2 fs-3" />
                      <MdEditNote className="me-2 fs-3 text-success" />
                    </div>
                    <div className="me-2 fs-6">
                      <a className="wd-assignment-link"
                        href="#/Kanbas/Courses/1234/Assignments/123">
                        <b>A1 - ENV + HTML</b>
                      </a>
                      <br /><span className="text-danger">Multiple Modules</span> | <b>Not available Until</b> May 6 at 12:00am | <b>Due</b> May 13 at 11:59pm | 100 pts
                    </div>
                    <div className="">
                      <LessonControlButtons />
                    </div>
                  </div>
                </li>


                <li className="wd-assignment-list-item list-group-item p-3 ps-1">
                  <div className="d-flex justify-content-between">
                    <div className="">
                      <BsGripVertical className="me-2 fs-3" />
                      <MdEditNote className="me-2 fs-3 text-success" />
                    </div>
                    <div className="me-2 fs-6">
                      <a className="wd-assignment-link"
                        href="#/Kanbas/Courses/1234/Assignments/123">
                        <b>A2 - CSS + BOOTSTRAP</b>
                      </a>
                      <br /><span className="text-danger">Multiple Modules</span> | <b>Not available Until</b> May 13 at 12:00am | <b>Due</b> May 20 at 11:59pm | 100 pts
                    </div>
                    <div className="">
                      <LessonControlButtons />
                    </div>
                  </div>
                </li>

                <li className="wd-assignment-list-item list-group-item p-3 ps-1">
                  <div className="d-flex justify-content-between">
                    <div className="">
                      <BsGripVertical className="me-2 fs-3" />
                      <MdEditNote className="me-2 fs-3 text-success" />
                    </div>
                    <div className="me-2 fs-6">
                      <a className="wd-assignment-link"
                        href="#/Kanbas/Courses/1234/Assignments/123">
                        <b>A3 - JAVASCRIPT + REACT</b>
                      </a>
                      <br /><span className="text-danger">Multiple Modules</span> | <b>Not available Until</b> May 20 at 12:00am | <b>Due</b> May 27 at 11:59pm | 100 pts
                    </div>
                    <div className="">
                      <LessonControlButtons />
                    </div>
                  </div>
                </li>

              </ul>
            </li>
          </ul>
        </div>

      </div>
  );}
