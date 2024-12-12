import { useLocation, useParams } from "react-router";
//import { quizzes } from "../../Database";
import { Link, useNavigate } from "react-router-dom";
import { addQuiz, deleteQuiz, updateQuiz }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";
import Editor, { EditorProvider } from 'react-simple-wysiwyg';

export default function QuizEditor() {
  const { quizid } = useParams();
  const { cid } = useParams();
  const { pathname } = useLocation();
  //const quiz = quizzes.find((quiz: any) => quiz._id === quizid);
  const [quiz, setQuiz] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);

  const createQuizForCourse = async () => {
    if (!cid) return;
    const newQuiz = await coursesClient.createQuizForCourse(cid, quiz);
    dispatch(addQuiz(newQuiz));
  };
  const saveQuiz = async (quiz: any) => {
    await quizzesClient.updateQuiz(quiz);
    dispatch(updateQuiz(quiz));
  };
  const fetchQuiz = () => {
    //if (quizid === '0') return navigate(`/Kanbas/Courses/${cid}/Quizzes/${new Date().getTime().toString()}`);
    if ( quizid === "create" )
      setQuiz({ _id: Date.now().toString(), title: "Edit title", course: cid, points: 0, howManyAttempts: 1, published: false, multipleAttempts: false });
    else
      setQuiz(quizzes.find((quiz: any) => quiz._id === quizid));
  };
  const save = () => {
    if (quizid === "create")
      //dispatch(addQuiz(quiz));
      createQuizForCourse();  
    else
      //dispatch(updateQuiz(quiz));
      saveQuiz(quiz);
    if(quizid==="create")
      navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    else
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizid}/Details`);
      //navigate(`/Kanbas/Courses/${cid}/Quizzes`);
      
  };
  const saveAndPublish = async () => {
    if (quizid === "create"){
        if (!cid) return;
        const newQuiz = await coursesClient.createQuizForCourse(cid, { ...quiz, published: true });
        dispatch(addQuiz(newQuiz));
    }
    else{
      saveQuiz({ ...quiz, published: true });
    }
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };
  useEffect(() => { fetchQuiz(); }, []);

  return (
    <div id="wd-quizzes-editor" className="container">

      <div className="d-flex fs-5">
        <Link to={`/Kanbas/Courses/${cid}/Quizzes/${quizid}/Editor`} className={`me-3 list-group-item border border-0
              ${pathname.includes("Editor") ? "active" : "text-danger"}`}>
          <br />
          Details
        </Link>
        { quizid !== "create" && (<Link to={`/Kanbas/Courses/${cid}/Quizzes/${quizid}/Questions`} className={`list-group-item border border-0
              ${pathname.includes("Questions") ? "active" : "text-danger"}`}>
          <br />
          Questions
        </Link>)}
      </div><br /><hr/>

      <div className="mb-3">
        <label htmlFor="wd-title" className="form-label">
          Quiz Title</label>
        <textarea className="form-control" id="wd-title" value={ quiz?.title ? quiz.title : "" } onChange={(e) => setQuiz({ ...quiz, title: e.target.value }) }
                  rows={3}></textarea>
      </div>

      <div className="mb-3">
        Quiz Description
      </div>
      <div className="mb-3">
        <EditorProvider>
          <Editor id="wd-description" containerProps={{ style: { height: '300px', resize: 'both' } }} value={ quiz?.description ? quiz.description : "Edit description" } 
            onChange={(e) => setQuiz({ ...quiz, description: e.target.value }) } />
        </EditorProvider>
      </div>

      <div>

        <div className="mb-3 row">
          <label htmlFor="wd-points" className="col-sm-2 col-form-label">
            Points</label>
          <div className="col-sm-10 col-md-4">
            <input id="wd-points" className="form-control" value={ quiz?.points } onChange={(e) => setQuiz({ ...quiz, points: e.target.value })} />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="wd-timelimit" className="col-sm-2 col-form-label">
            Time Limit {" (minutes)"}</label>
          <div className="col-sm-10 col-md-4">
            <input id="wd-timelimit" className="form-control" value={ quiz?.timeLimit } onChange={(e) => setQuiz({ ...quiz, timeLimit: e.target.value })} />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="wd-accessCode" className="col-sm-2 col-form-label">
            Access Code </label>
          <div className="col-sm-10 col-md-4">
            <input id="wd-accessCode" className="form-control" value={ quiz?.accessCode } onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })} />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="wd-howmanyattempts" className="col-sm-2 col-form-label">
            How Many Attempts</label>
          <div className="col-sm-10 col-md-4">
            <input id="wd-howmanyattempts" className="form-control" value={ quiz?.howManyAttempts } 
            onChange={(e) => { quiz?.multipleAttempts ? setQuiz({ ...quiz, howManyAttempts: e.target.value }) : setQuiz({ ...quiz, howManyAttempts: 1 }) } } />
          </div>
        </div>

        <div className="form-check form-switch mb-3">
          <input className="form-check-input" type="checkbox" id="multipleAttempts" checked={ quiz?.multipleAttempts } 
            onChange={ (e) => { setQuiz({ ...quiz, multipleAttempts: e.target.checked }); } }/>
          <label className="form-check-label" htmlFor="multipleAttempts">
            Multiple Attempts
          </label>
        </div>

        <div className="form-check form-switch mb-3">
          <input className="form-check-input" type="checkbox" id="shuffleAnswers" checked={ quiz?.shuffleAnswers } 
            onChange={ (e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked }) }/>
          <label className="form-check-label" htmlFor="shuffleAnswers">
            Shuffle Answers
          </label>
        </div>

        <div className="form-check form-switch mb-3">
          <input className="form-check-input" type="checkbox" id="showCorrectAnswers" checked={ quiz?.showCorrectAnswers } 
            onChange={ (e) => setQuiz({ ...quiz, showCorrectAnswers: e.target.checked }) }/>
          <label className="form-check-label" htmlFor="showCorrectAnswers">
            Show Correct Answers
          </label>
        </div>

        <div className="form-check form-switch mb-3">
          <input className="form-check-input" type="checkbox" id="oneQuestionAtATime" checked={ quiz?.oneQuestionAtATime } 
            onChange={ (e) => setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked }) }/>
          <label className="form-check-label" htmlFor="oneQuestionAtATime">
            One Question at a Time
          </label>
        </div>

        <div className="form-check form-switch mb-3">
          <input className="form-check-input" type="checkbox" id="webcamRequired" checked={ quiz?.webcamRequired } 
            onChange={ (e) => setQuiz({ ...quiz, webcamRequired: e.target.checked }) }/>
          <label className="form-check-label" htmlFor="webcamRequired">
            Webcam Required
          </label>
        </div>

        <div className="form-check form-switch mb-3">
          <input className="form-check-input" type="checkbox" id="lockQuestionsAfterAnswering" checked={ quiz?.lockQuestionsAfterAnswering } 
            onChange={ (e) => setQuiz({ ...quiz, lockQuestionsAfterAnswering: e.target.checked }) }/>
          <label className="form-check-label" htmlFor="lockQuestionsAfterAnswering">
            Lock Questions After Answering
          </label>
        </div>

        {/* Complete on your own */}
        <div className="mb-3 row">
          <label htmlFor="wd-group" className="col-sm-2 col-form-label">
            Assignment Group</label>
          <div className="col-sm-10 col-md-4">
            <select id="wd-group" className="form-select" value={ quiz?.group ? quiz.group : "QUIZZES" } onChange={(e) => setQuiz({ ...quiz, group: e.target.value })} >
              <option value="Exams">Exams</option>
              <option selected value="QUIZZES">
                QUIZZES</option>
              <option value="Assignments">Assignments</option>
              <option value="Project">Project</option>
            </select>
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="wd-quiz-type" className="col-sm-2 col-form-label">
            Quiz Type</label>
          <div className="col-sm-10 col-md-4">
            <select id="wd-quiz-type" className="form-select" value={ quiz?.type ? quiz.type : "Graded Quiz" } onChange={(e) => setQuiz({ ...quiz, type: e.target.value })} >
              <option selected value="Graded Quiz">
                Graded Quiz</option>
              <option value="Practice Quiz">Practice Quiz</option>
              <option value="Graded Survey">Graded Survey</option>
              <option value="Ungraded Survey">Ungraded Survey</option>
            </select>
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="wd-display-grade-as" className="col-sm-2 col-form-label">
            Display Grade as</label>
          <div className="col-sm-10 col-md-4">
            <select id="wd-display-grade-as" className="form-select" value={ quiz?.gradeFormat ? quiz.gradeFormat : "Percentage" } onChange={(e) => setQuiz({ ...quiz, gradeFormat: e.target.value })} >
              <option value="1">1</option>
              <option selected value="Percentage">
                Percentage</option>
              <option value="2">2</option>
            </select>
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="wd-submission-type" className="col-sm-2 col-form-label">
            Submission Type</label>

          <div className="col-sm-10 col-md-4 border border-lihgt rounded">
                 
            <div className="mt-3 mb-3 container">
              <select id="wd-submission-type" className="form-select" value={ quiz?.submissionType ? quiz.submissionType : "Online" } onChange={(e) => setQuiz({ ...quiz, submissionType: e.target.value })} >
                <option value="1">1</option>
                <option selected value="Online">
                  Online</option>
                <option value="2">2</option>
              </select>
            </div>
            
            <div className="mb-3 container">
              <div className="">
                <label className="form-label"><b>Online Entry Options</b></label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" name="check-online-entry-options" id="wd-text-entry"/>
                <label htmlFor="wd-text-entry" className="form-check-label">Text Entry</label><br/>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" name="check-online-entry-options" id="wd-website-url"/>
                <label htmlFor="wd-website-url" className="form-check-label">Website URL</label><br/>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" name="check-online-entry-options" id="wd-media-recordings"/>
                <label htmlFor="wd-media-recordings" className="form-check-label">Media Recordings</label><br/>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" name="check-online-entry-options" id="wd-student-annotation"/>
                <label htmlFor="wd-student-annotation" className="form-check-label">Student Annotation</label><br/>
              </div>
              <div className="form-check">             
                <input className="form-check-input" type="checkbox" name="check-online-entry-options" id="wd-file-upload"/>
                <label htmlFor="wd-file-upload" className="form-check-label">File Uploads</label>
              </div>
            </div>

          </div>
        </div>


        <div className="mb-3 row">
          <label id="wd-assign" className="col-sm-2 col-form-label">
            Assign</label>

          <div className="col-sm-10 col-md-4 border border-lihgt rounded">
            
            <div className="mt-2 mb-3 container">
              <label htmlFor="wd-assign-to" className="col-form-label">
                <b>Assign to</b></label>
              <input id="wd-assign-to" className="form-control" value={ quiz?.assignTo ? quiz.assignTo : "Everyone" } onChange={(e) => setQuiz({ ...quiz, assignTo: e.target.value })} />
            </div>

            <div className="mb-3 container">
              <label htmlFor="wd-due-date" className="col-form-label">
                <b>Due</b></label>
              <input type="date" id="wd-due-date" className="form-control" value={ quiz?.dueDate ? quiz.dueDate : "2024-05-13" } onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })} />
            </div>

            <div className="mb-3 container d-flex justify-content-between">
              <div className="mb-2">
                <label htmlFor="wd-available-from" className="col-form-label">
                  <b>Available from</b></label>
                <input type="date" id="wd-available-from" className="form-control" value={ quiz?.availableFrom ? quiz.availableFrom : "2024-05-06" } onChange={(e) => setQuiz({ ...quiz, availableFrom: e.target.value })} />
              </div>

              <div className="mb-2">
                <label htmlFor="wd-available-until" className="col-form-label">
                  <b>Until</b></label>
                <input type="date" id="wd-available-until" className="form-control" value={ quiz?.availableUntil ? quiz.availableUntil : "2024-05-20" } onChange={(e) => setQuiz({ ...quiz, availableUntil: e.target.value })} />
              </div>
            </div>

          </div>
        </div>

      </div>

        
      <br/>
      <hr />
      <button id="wd-save-publish-btn" onClick={saveAndPublish} className="btn btn-danger me-1 float-end">
        Save and Publish</button>
      <button id="wd-save-btn" onClick={save} className="btn btn-danger me-1 float-end">
        Save</button>
      { quizid !== "create" && (<Link id="wd-cancel-btn" to={`/Kanbas/Courses/${cid}/Quizzes/${quizid}/Details`} className="btn btn-secondary me-1 float-end">
        Cancel</Link>)}
      { quizid === "create" && (<Link id="wd-cancel-btn" to={`/Kanbas/Courses/${cid}/Quizzes`} className="btn btn-secondary me-1 float-end">
        Cancel</Link>)}
    </div>
);}
