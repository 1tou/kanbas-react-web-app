import React, { useState, useEffect } from 'react';
import { BsGripVertical, BsPlus } from 'react-icons/bs';
import { FaPlus } from "react-icons/fa6";
import LessonControlButtons from '../Modules/LessonControlButtons';
import ModuleControlButtons from '../Modules/ModuleControlButtons';
import { MdHome } from 'react-icons/md';
import { IoEllipsisVertical } from 'react-icons/io5';
import { MdArrowDropDown } from "react-icons/md";
import { MdEditNote } from "react-icons/md";
import { MdNotInterested } from "react-icons/md";
import GreenCheckmark from '../Modules/GreenCheckmark';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdPublish } from "react-icons/md";
import { MdDownload } from "react-icons/md";
import { MdCheck } from "react-icons/md";
import { MdCheckCircle } from "react-icons/md";
import { useParams } from "react-router";
//import { quizzes } from "../../Database";
import { Link, useNavigate } from 'react-router-dom';
import { setQuizzes, addQuiz, deleteQuiz, updateQuiz }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import ProtectedRouteFaculty from '../../Account/ProtectedRouteFaculty';
import ProtectedRouteNotFaculty from '../../Account/ProtectedRouteNotFaculty';
import * as coursesClient from "../client";
import * as quizzesClient from "./client";
import * as userClient from "../../Account/client";

export default function Quizzes() {
  const { cid } = useParams();
  const [chosenQuiz, setChosenQuiz] = useState<any>({});
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const removeQuiz = async (quizId: string) => {
    await quizzesClient.deleteQuiz(quizId);
    dispatch(deleteQuiz(quizId));
  };
  const saveQuiz = async (quiz: any) => {
    await quizzesClient.updateQuiz(quiz);
    dispatch(updateQuiz(quiz));
  };
  const fetchQuizzes = async () => {
    const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzes));
  };
  const fetchQuizzesForUser = async () => {
    const quizzes = await userClient.findQuizzesForUser(currentUser._id, cid as string);
    dispatch(setQuizzes(quizzes));
  };
  const availability = (quiz: any) => {
    const curTimeStamp = Number(Date.now().toString());
    if(quiz?.availableUntil && ( new Date(Date.parse(quiz.availableUntil)).getTime() < curTimeStamp )){
        return (<b>"Closed"</b>);
    }
    else if( quiz?.availableUntil && quiz?.availableFrom && 
        ( new Date(Date.parse(quiz.availableUntil)).getTime() > curTimeStamp ) && 
        ( new Date(Date.parse(quiz.availableFrom)).getTime() < curTimeStamp ) ) 
    {
        return (<b>"Available"</b>);
    }
    else if( quiz?.availableFrom && ( new Date(Date.parse(quiz.availableFrom)).getTime() > curTimeStamp ) ){
        return (<span><b>Not available until </b>{quiz?.availableFrom}</span>);
    }
  };
  useEffect(() => {
    //fetchQuizzes();
    fetchQuizzesForUser();
  }, []);
  return (
    <div id="wd-quizzes">
      
      <div id="wd-quizzes-controls" className="text-nowrap d-flex justify-content-between">
        <div className="col-md-4">
          <FaMagnifyingGlass className="float-start position-relative me-2" />
          {/*<i className="bi bi-search"></i>*/}
          <input id="wd-search-quiz"
              placeholder="Search..."
              className="form-control me-1s float-start col-md-6"/>
        </div >
        <div className="">
          <ProtectedRouteFaculty><Link id="wd-add-quiz" to={`/Kanbas/Courses/${cid}/Quizzes/create/Editor`} className="btn btn-lg btn-danger me-2 float-end">
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Quiz</Link></ProtectedRouteFaculty>
          <button id="wd-add-quiz-group" className="btn btn-lg btn-secondary me-2 float-end">
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Group</button>
        </div>
      </div><br /><br /><br /><br />


      <div>
        <ul id="wd-quiz-module" className="list-group rounded-0">
          <li className="wd-quiz-title list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              <MdArrowDropDown className="me-2 fs-3" />
              Quizzes
              <div className="float-end">
                <button id="wd-quiz-total" className="btn btn-secondary border-dark rounded-pill me-2"> </button>
                <BsPlus className="fs-2" />
                <IoEllipsisVertical className="fs-4" />
              </div>
            </div>

            <ul className="wd-quiz-list list-group rounded-0">
              
              {quizzes
                //.filter((quiz: any) => quiz.course === cid)
                .map((quiz: any) => (
                  <li className="wd-quiz-list-item list-group-item p-3 ps-1">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex">
                        <BsGripVertical className="me-2 fs-3" />
                        <div className="me-2 fs-6">
                          <a className="wd-quiz-link"
                            href={`#/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}>
                            <b>{quiz.title}</b>
                          </a>
                          <br /><span className="">{availability(quiz)}</span> | 
                          <b> Due</b> { quiz?.dueDate ? quiz.dueDate : "2024-05-13" } | 
                          {" "}{ quiz?.points ? quiz.points : 0 } pts |
                          {" "}{ quiz?.questionNumbers ? quiz.questionNumbers : 0 } Questions
                          <ProtectedRouteNotFaculty><span> | {" "}{ quiz?.latestScore ? quiz.latestScore : 0 } Score</span></ProtectedRouteNotFaculty>
                        </div>
                      </div>
                      <div className="">
                        <ProtectedRouteFaculty>
                          <FaTrash className="text-danger me-3" onClick={() => setChosenQuiz({ _id: quiz._id, title: quiz.title, course: cid })} 
                            data-bs-toggle="modal" data-bs-target="#wd-delete-quiz-dialog" />
                          
                          <MdEditNote className="me-2 fs-2 text-success" onClick={ () => { navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`); } }/>
                          
                          { !quiz?.published && (<MdPublish className="fs-3 me-4 text-primary" onClick={ () => { saveQuiz({ ...quiz, published: true }) } } />)}
                          { quiz?.published && (<MdDownload className="fs-3 me-4 text-danger" onClick={ () => { saveQuiz({ ...quiz, published: false }) } }/>)}
                        </ProtectedRouteFaculty>
                        
                        { quiz?.published && (<MdCheckCircle className="fs-4 me-1 text-success" />)}
                        { !quiz?.published && (<MdNotInterested className="fs-4 me-1 text-danger" />)}
                        
                        <IoEllipsisVertical className="fs-4" onClick={ () => {} } />
                      </div>
                    </div>
                  </li>
              ))}

            </ul>
          </li>
        </ul>
      </div>

      <QuizDeleter dialogTitle="Delete Quiz" quizTitle={chosenQuiz.title}
        deleteQuiz={() => {
          removeQuiz(chosenQuiz._id);
        }} />
      
    </div>
);}


function QuizDeleter({ dialogTitle, quizTitle, deleteQuiz }:
{ dialogTitle: string; quizTitle: string; deleteQuiz: () => void; }) {
  return (
    
    <div id="wd-delete-quiz-dialog" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              {dialogTitle} </h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div className="modal-body">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              {`Are you sure to delete quiz: "${quizTitle}" ?`} </h1>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Cancel </button>
            <button onClick={deleteQuiz} type="button" data-bs-dismiss="modal" className="btn btn-danger">
              OK </button>
          </div>
        </div>
      </div>
    </div>
    
  );
}
