import React, { useState, useEffect } from 'react';
import { BsGripVertical, BsPlus } from 'react-icons/bs';
import { FaPlus } from "react-icons/fa6";
import LessonControlButtons from '../../Modules/LessonControlButtons';
import ModuleControlButtons from '../../Modules/ModuleControlButtons';
import { MdHome } from 'react-icons/md';
import { IoEllipsisVertical } from 'react-icons/io5';
import { MdArrowDropDown } from "react-icons/md";
import { MdEditNote } from "react-icons/md";
import GreenCheckmark from '../../Modules/GreenCheckmark';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useParams } from "react-router";
//import { questions } from "../../Database";
import { Link } from 'react-router-dom';
import { setQuestions, addQuestion, deleteQuestion, updateQuestion }
  from "./reducer";
//import { addQuiz, deleteQuiz, updateQuiz } from "../reducer";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import ProtectedRouteFaculty from '../../../Account/ProtectedRouteFaculty';
import ProtectedRouteNotFaculty from '../../../Account/ProtectedRouteNotFaculty';
import * as quizzesClient from "../client";
import * as questionsClient from "./client";

export default function Questions() {
  const { cid } = useParams();
  const { quizid } = useParams();
  const [chosenQuestion, setChosenQuestion] = useState<any>({});
  const { questions } = useSelector((state: any) => state.questionsReducer);
  //const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  //const [quiz, setQuiz] = useState<any>({});
  const dispatch = useDispatch();
  const removeQuestion = async (questionId: string) => {
    await questionsClient.deleteQuestion(questionId);
    dispatch(deleteQuestion(questionId));
  };
  const fetchQuestions = async () => {
    const questions = await quizzesClient.findQuestionsForQuiz(quizid as string);
    dispatch(setQuestions(questions));
  };
  /*
  const updatePointsForQuiz = async () => {
    const questions = await quizzesClient.findQuestionsForQuiz(quizid as string);
    dispatch(setQuestions(questions));
    
    setQuiz(quizzes.find((quiz: any) => quiz._id === quizid));
    let totalPoints = 0;
    if(questions){
      for (let i = 0; i < questions.length; i++) {
        if(questions[i]?.points){
          totalPoints += questions[i]?.points;
    }}}
    setQuiz({ ...quiz, points: totalPoints })
    await quizzesClient.updateQuiz(quiz);
    dispatch(updateQuiz(quiz));
  };*/
  useEffect(() => {
    fetchQuestions();
    //updatePointsForQuiz();
  }, []);
  return (
    <div id="wd-questions">
      
      <div id="wd-questions-controls" className="text-nowrap d-flex justify-content-between">
        <div className="col-md-4">
          <FaMagnifyingGlass className="float-start position-relative me-2" />
          {/*<i className="bi bi-search"></i>*/}
          <input id="wd-search-question"
              placeholder="Search..."
              className="form-control me-1s float-start col-md-6"/>
        </div >
        <div className="">
          <ProtectedRouteFaculty><Link id="wd-add-question" to={`/Kanbas/Courses/${cid}/Quizzes/${quizid}/Questions/create`} className="btn btn-lg btn-danger me-2 float-end">
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Question</Link></ProtectedRouteFaculty>
          <button id="wd-add-question-group" className="btn btn-lg btn-secondary me-2 float-end">
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Group</button>
        </div>
      </div><br /><br /><br /><br />


      <div>
        <ul id="wd-question-module" className="list-group rounded-0">
          <li className="wd-question-title list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              <MdArrowDropDown className="me-2 fs-3" />
              Questions
              <div className="float-end">
                <button id="wd-question-total" className="btn btn-secondary border-dark rounded-pill me-2">
                  40% of Total</button>
                <BsPlus className="fs-2" />
                <IoEllipsisVertical className="fs-4" />
              </div>
            </div>

            <ul className="wd-question-list list-group rounded-0">
              
              {questions
                //.filter((question: any) => question.quiz === quizid)
                .map((question: any) => (
                  <li className="wd-question-list-item list-group-item p-3 ps-1">
                    <div className="d-flex justify-content-between">
                      <div className="">
                        <BsGripVertical className="me-2 fs-3" />
                        <MdEditNote className="me-2 fs-3 text-success" />
                      </div>
                      <div className="me-2 fs-6">
                        <ProtectedRouteFaculty><a className="wd-question-link"
                          href={`#/Kanbas/Courses/${cid}/Quizzes/${quizid}/Questions/${question._id}`}>
                          <b>{question.title}</b>
                        </a></ProtectedRouteFaculty>
                        <ProtectedRouteNotFaculty><b>{question.title}</b></ProtectedRouteNotFaculty>
                        <br /><span className="text-danger">Multiple Modules</span> | <b>Not available Until</b> { question?.availableFrom ? question.availableFrom : "2024-05-06" } | <b>Due</b> { question?.dueDate ? question.dueDate : "2024-05-13" } | { question?.points ? question.points : 100 } pts
                      </div>
                      <div className="">
                        <ProtectedRouteFaculty><FaTrash className="text-danger me-3" onClick={() => setChosenQuestion({ _id: question._id, title: question.title, quiz: quizid })} 
                          data-bs-toggle="modal" data-bs-target="#wd-delete-question-dialog" /></ProtectedRouteFaculty>
                        <LessonControlButtons />
                      </div>
                    </div>
                  </li>
              ))}

            </ul>
          </li>
        </ul>
      </div>

      <QuestionDeleter dialogTitle="Delete Question" questionTitle={chosenQuestion.title}
        deleteQuestion={() => {
          removeQuestion(chosenQuestion._id);
        }} />
      
    </div>
);}


function QuestionDeleter({ dialogTitle, questionTitle, deleteQuestion }:
{ dialogTitle: string; questionTitle: string; deleteQuestion: () => void; }) {
  return (
    
    <div id="wd-delete-question-dialog" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              {dialogTitle} </h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div className="modal-body">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              {`Are you sure to delete question: "${questionTitle}" ?`} </h1>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Cancel </button>
            <button onClick={deleteQuestion} type="button" data-bs-dismiss="modal" className="btn btn-danger">
              OK </button>
          </div>
        </div>
      </div>
    </div>
    
  );
}
