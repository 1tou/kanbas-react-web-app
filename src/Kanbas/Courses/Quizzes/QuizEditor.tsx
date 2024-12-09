import { useParams } from "react-router";
//import { quizzes } from "../../Database";
import { Link, useNavigate } from "react-router-dom";
import { addQuiz, deleteQuiz, updateQuiz }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";

export default function QuizEditor() {
  const { quizid } = useParams();
  const { cid } = useParams();
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
      setQuiz({ _id: Date.now().toString(), title: "Edit title", course: cid });
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
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };
  useEffect(() => { fetchQuiz(); }, []);

  return (
    <div id="wd-quizzes-editor" className="container">


      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label">
          Quiz Name</label>
        <textarea className="form-control" id="wd-name" value={ quiz && quiz.title } onChange={(e) => setQuiz({ ...quiz, title: e.target.value }) }
                  rows={3}></textarea>
      </div>

      <div className="mb-3">
      <textarea id="wd-description" className="form-control" value={ quiz?.description ? quiz.description : "Edit description" } cols={45} rows={10} onChange={(e) => setQuiz({ ...quiz, description: e.target.value }) } >
        The quiz is available online
        Submit a link to the landing page of your Web application running on Netlify.
        The landing page should include the following: Your full name and section Links to each of the lab quizzes Link to the Kanbas application Links to all relevant source code repositories The Kanbas application should include a link to navigate back to the landing page.
      </textarea>
      </div>

      <div>

        <div className="mb-3 row">
          <label htmlFor="wd-points" className="col-sm-2 col-form-label">
            Points</label>
          <div className="col-sm-10 col-md-4">
            <input id="wd-points" className="form-control" value={ quiz?.points ? quiz.points : 100 } onChange={(e) => setQuiz({ ...quiz, points: e.target.value })} />
          </div>
        </div>

        {/* Complete on your own */}
        <div className="mb-3 row">
          <label htmlFor="wd-group" className="col-sm-2 col-form-label">
            Quiz Group</label>
          <div className="col-sm-10 col-md-4">
            <select id="wd-group" className="form-select" value={ quiz?.group ? quiz.group : "QUIZZES" } onChange={(e) => setQuiz({ ...quiz, group: e.target.value })} >
              <option value="1">1</option>
              <option selected value="QUIZZES">
                QUIZZES</option>
              <option value="2">2</option>
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
      <button id="wd-save-btn" onClick={save} className="btn btn-danger me-1 float-end">
        Save</button>
      <Link id="wd-cancel-btn" to={`/Kanbas/Courses/${cid}/Quizzes`} className="btn btn-secondary me-1 float-end">
        Cancel</Link>

    </div>
);}
