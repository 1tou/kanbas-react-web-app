import { useParams } from "react-router";
//import { quizzes } from "../../Database";
import { Link, useNavigate } from "react-router-dom";
import { addQuiz, deleteQuiz, updateQuiz }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";
import * as userClient from "../../Account/client";
import ProtectedRouteFaculty from "../../Account/ProtectedRouteFaculty";
import ProtectedRouteNotFaculty from "../../Account/ProtectedRouteNotFaculty";

export default function QuizDetails() {
  const { quizid } = useParams();
  const { cid } = useParams();
  const [quiz, setQuiz] = useState<any>({});
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const [previousQuizGrade, setPreviousQuizGrade] = useState<any>({});
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const fetchQuiz = () => {
    setQuiz(quizzes.find((quiz: any) => quiz._id === quizid));
  };

  const fetchPreviousQuizGrade = async () => {
    const previousQuizGrade = await userClient.findQuizGradeForUser(currentUser._id, quizid as string);
    if(previousQuizGrade)
        setPreviousQuizGrade(previousQuizGrade);
  };

  useEffect(() => { fetchQuiz(); fetchPreviousQuizGrade(); }, []);

  return (
    <div id="wd-quizz-details" className="container">

      <ProtectedRouteFaculty><div className="mb-5 d-flex justify-content-center">
        { (!previousQuizGrade || (previousQuizGrade && previousQuizGrade?.attempts < quiz.multipleAttempts)) && (<Link id="wd-preview-btn" to={`/Kanbas/Courses/${cid}/Quizzes/${quizid}/Preview/Questions`} className="btn btn-secondary me-1 float-end">
            Preview</Link>)}
        <Link id="wd-edit-btn" to={`/Kanbas/Courses/${cid}/Quizzes/${quizid}/Editor`} className="btn btn-secondary me-1 float-end">
            Edit</Link>
      </div><hr /></ProtectedRouteFaculty>

      <ProtectedRouteNotFaculty><div className="mb-5 d-flex justify-content-center">
        { (!previousQuizGrade || (previousQuizGrade && previousQuizGrade?.attempts < quiz.multipleAttempts)) && (<Link id="wd-preview-btn" to={`/Kanbas/Courses/${cid}/Quizzes/${quizid}/Preview/Questions`} className="btn btn-secondary me-1 float-end">
            Take</Link>)}
        <Link id="wd-edit-btn" to={`/Kanbas/Courses/${cid}/Quizzes/${quizid}/Editor`} className="btn btn-secondary me-1 float-end">
            Edit</Link>
      </div><hr /></ProtectedRouteNotFaculty>
      
      <div className="mb-4">
        <h2><b>{quiz.title}</b></h2>
      </div>

      <div className="mb-2 fs-5 d-flex justify-content-center">
        <div className="me-3"><b>Quiz Type</b></div>
        <div>{quiz.type}</div>
      </div>

      <div className="mb-2 fs-5 d-flex justify-content-center">
        <div className="me-3"><b>Points</b></div>
        <div>{quiz.points}</div>
      </div>

      <div className="mb-2 fs-5 d-flex justify-content-center">
        <div className="me-3"><b>Assignment Group</b></div>
        <div>{quiz.group}</div>
      </div>

      <div className="mb-2 fs-5 d-flex justify-content-center">
        <div className="me-3"><b>Shuffle Answers</b></div>
        <div>{quiz.shuffleAnswers}</div>
      </div>

      <div className="mb-2 fs-5 d-flex justify-content-center">
        <div className="me-3"><b>Time Limit</b></div>
        <div>{quiz.timeLimit}</div>
      </div>

      <div className="mb-2 fs-5 d-flex justify-content-center">
        <div className="me-3"><b>Multiple Attempts</b></div>
        <div>{quiz.multipleAttempts}</div>
      </div>

      <div className="mb-2 fs-5 d-flex justify-content-center">
        <div className="me-3"><b>View Responses</b></div>
        <div>{quiz.type}</div>
      </div>

      <div className="mb-2 fs-5 d-flex justify-content-center">
        <div className="me-3"><b>Show Correct Answers</b></div>
        <div>{quiz.showCorrectAnswers}</div>
      </div>

      <div className="mb-2 fs-5 d-flex justify-content-center">
        <div className="me-3"><b>One Question at a time</b></div>
        <div>{quiz.oneQuestionAtATime}</div>
      </div>

      <div className="mb-2 fs-5 d-flex justify-content-center">
        <div className="me-3"><b>Require Respondus Lockdown</b></div>
        <div>{quiz.type}</div>
      </div>

      <div className="mb-2 fs-5 d-flex justify-content-center">
        <div className="me-3"><b>Browser</b></div>
        <div>{quiz.type}</div>
      </div>

      <div className="mb-2 fs-5 d-flex justify-content-center">
        <div className="me-3"><b>Required to view Quiz Results</b></div>
        <div>{quiz.type}</div>
      </div>

      <div className="mb-2 fs-5 d-flex justify-content-center">
        <div className="me-3"><b>Webcam Required</b></div>
        <div>{quiz.webcamRequired}</div>
      </div>

      <div className="mb-5 fs-5 d-flex justify-content-center">
        <div className="me-3"><b>Lock Questions After Answering</b></div>
        <div>{quiz.type}</div>
      </div><br/>

      <div>

        <div className="mb-2 fs-5 d-flex justify-content-center text-danger">
          <div className="me-3"><b>Last Taken Time:</b></div>
          <div>{previousQuizGrade && previousQuizGrade?.lastTakenTime ? previousQuizGrade?.lastTakenTime : ""}</div>
        </div>

        <div className="mb-2 fs-5 d-flex justify-content-center text-danger">
          <div className="me-3"><b>Latest Score:</b></div>
          <div>{previousQuizGrade && previousQuizGrade?.totalGrade ? previousQuizGrade?.totalGrade : ""}</div>
        </div>

        <div className="mb-2 fs-5 d-flex justify-content-center text-danger">
          <div className="me-3"><b>Attempts:</b></div>
          <div>{previousQuizGrade && previousQuizGrade?.attempts ? previousQuizGrade?.attempts : ""}</div>
        </div>

      </div><br/>

      <div className="mb-2 fs-5 d-flex justify-content-between">
        <div className="me-3"><b>Due</b></div>
        <div className="me-3"><b>For</b></div>
        <div className="me-3"><b>Available From</b></div>
        <div className="me-3"><b>Until</b></div>
      </div><hr/>

      <div className="mb-2 fs-5 d-flex justify-content-between">
        <div className="me-3"><b>{quiz.dueDate}</b></div>
        <div className="me-3"><b>{quiz.assignTo}</b></div>
        <div className="me-3"><b>{quiz.availableFrom}</b></div>
        <div className="me-3"><b>{quiz.availableUntil}</b></div>
      </div><hr/>


      

    </div>
);}
