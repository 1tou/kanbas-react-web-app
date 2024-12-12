import { useParams } from "react-router";
//import { questions } from "../../Database";
import { Link, useNavigate } from "react-router-dom";
import { setQuestions, addQuestion, deleteQuestion, updateQuestion }
  from "./reducer";
//import { addQuiz, deleteQuiz, updateQuiz } from "../reducer";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import * as quizzesClient from "../client";
import * as questionsClient from "./client";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function QuestionEditor() {
  const { questionid } = useParams();
  const { quizid } = useParams();
  const { cid } = useParams();
  //const question = questions.find((question: any) => question._id === questionid);
  const [question, setQuestion] = useState<any>({});
  //const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  //const [quiz, setQuiz] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { questions } = useSelector((state: any) => state.questionsReducer);

  const createQuestionForQuiz = async () => {
    if (!quizid) return;
    const newQuestion = await quizzesClient.createQuestionForQuiz(quizid, question);
    dispatch(addQuestion(newQuestion));
  };
  const saveQuestion = async (question: any) => {
    await questionsClient.updateQuestion(question);
    dispatch(updateQuestion(question));
  };
  const fetchQuestion = () => {
    //if (questionid === '0') return navigate(`/Kanbas/Courses/${cid}/Questions/${new Date().getTime().toString()}`);
    if ( questionid === "create" )
      setQuestion({ _id: Date.now().toString(), title: "Edit name", quiz: quizid, type: "MultipleChoice", choices: [], possibleAnswers: [], answer: "" });
    else
      setQuestion(questions.find((question: any) => question._id === questionid));
  };
  const save = () => {
    if (questionid === "create")
      //dispatch(addQuestion(question));
      createQuestionForQuiz();  
    else
      //dispatch(updateQuestion(question));
      saveQuestion(question);
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizid}/Questions`);
  };
  useEffect(() => { fetchQuestion(); }, []);

  const QuestionNotice = ({questionType} : {questionType: string}) => {
    let element;
    switch (questionType) {
        case "MultipleChoice":
            element = <span>Enter your quesation and multiple answers, then select the one correct answer.</span>;
            break;
        case "TrueFalse":
            element = <span>Enter your quesation text, then selcet if True or False is the correct answer.</span>;
            break;
        case "FillInTheBlank":
            element = <span>Enter your quesation text, then define all possible correct answers for the blank. Students will see the question followed by a small text box to type their answer.</span>;
            break;
        default:
            element = <span>Enter your quesation and multiple answers, then select the one correct answer.</span>;
            break;
    }
    return <div>{element}</div>;
  }


  return (
    <div id="wd-questions-editor" className="container">

      <div>
        <select value={question.type} onChange={(e) => { e.target.value!==question.type && setQuestion({ ...question, type: e.target.value }) } }
                className="form-select float-start w-25 wd-select-role" >
          <option value="MultipleChoice">Multiple Choice Question</option>
          <option value="TrueFalse">True/False Question</option>
          <option value="FillInTheBlank">Fill in the Blank Question</option>
        </select>

        <div className="float-end mb-3 row">
          <label htmlFor="wd-question-points" className="col-sm-2 col-form-label">
            pts:</label>
          <div className="col-sm-10 col-md-4">
            <input id="wd-question-points" className="form-control" value={ question?.points ? question.points : 0 } 
              onChange={(e) => setQuestion({ ...question, points: Number(e.target.value) }) } />
          </div>
        </div>
      </div><br/><br/><hr/>

      <div>
        <QuestionNotice questionType={question.type} />
      </div><br/>

      <div className="mb-3">
        <label htmlFor="wd-question-title" className="form-label fs-5">
          Question Title:</label>
        <textarea className="form-control" id="wd-question-title" value={ question?.title ? question.title : "" } rows={3} 
          onChange={ (e) => setQuestion({ ...question, title: e.target.value }) }>
        </textarea>
      </div>
      
      <div className="mb-3">
        <label htmlFor="wd-question-description" className="form-label fs-5">
            Question Description:</label>
        <textarea id="wd-question-description" className="form-control" value={ question?.description ? question.description : "" } cols={45} rows={10} 
          onChange={ (e) => setQuestion({ ...question, description: e.target.value }) } >
            The question is available online
        </textarea>
      </div><br/>

      <div className="mb-3 fs-5">
        Answers:
      </div><br/>

      
      <div>
        {question.type==="MultipleChoice" && 
        (<div>
          <div>
            {question.choices && question.choices
              .map((choice: any, index: number ) => (
                <li className="wd-choice-list-item list-group-item p-2 ps-1">           
                  <div className="mb-2 row">
                    <div className="form-check col-sm-1 mt-1">
                      <input className="form-check-input" type="radio" 
                        name="choiceRadios" id={`choice${index+1}`} value={choice} checked={question.answer === choice} 
                        onChange={ (e) => setQuestion({ ...question, answer: e.target.value }) }/>
                    </div>
                    <label htmlFor="wd-choice-item" className="col-sm-2 col-form-label">
                      Choice {index+1} : </label>
                    <div className="col-sm-10 col-md-4">
                      <input id="wd-choice-item" className="form-control" value={question?.choices[index]} onChange={
                        (e) => { let newChoices=[...question.choices]; newChoices[index]=e.target.value; setQuestion({ ...question, choices: newChoices }); } } />
                    </div>
                    <div className="col-sm-2">
                      <FaTrash className="text-danger me-3"
                      onClick={ () => setQuestion({ ...question, choices: question.choices.filter((_:any, i:any) => i!==index) }) } />
                    </div>
                  </div>
                </li>
            ))}
          </div>
          <div className="mb-3 float-end">
            <button id="wd-add-choice" className="btn btn-danger me-2 float-end"
              onClick={() => { setQuestion({ ...question, choices: [ ...question.choices, "New Answer" ] }) } }>
              <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
              Add Another Answer</button>
          </div><br/>
        </div>)}

        {question.type==="TrueFalse" && 
        (<div className="row mb-3">
            <div className="mb-2 col-sm-10">
              <div className="form-check mb-3">
                <input className="form-check-input" type="radio" 
                  name="trueFalseRadios" id="true" value="true" checked={question.answer === "true"} 
                  onChange={ (e) => setQuestion({ ...question, answer: e.target.value }) }/>
                <label className="form-check-label" htmlFor="true">
                    True </label></div>
              <div className="form-check">
                <input className="form-check-input" type="radio" 
                  name="trueFalseRadios" id="false" value="false" checked={question.answer === "false"} 
                  onChange={ (e) => setQuestion({ ...question, answer: e.target.value }) }/>
                <label className="form-check-label" htmlFor="false">
                    False </label></div>
            </div>
        </div>)}

        
        {question.type==="FillInTheBlank" && 
        (<div>
          <div>
            {question.possibleAnswers && question.possibleAnswers
              .map((possibleAnswer: any, index: number ) => (
                <li className="wd-answer-list-item list-group-item p-2 ps-1">           
                  <div className="mb-2 row">
                    <label htmlFor="wd-answer-item" className="col-sm-2 col-form-label">
                      Possible Answer {index+1} : </label>
                    <div className="col-sm-10 col-md-4">
                      <input id="wd-answer-item" className="form-control" value={question?.possibleAnswers[index]} onChange={
                        (e) => { let newAnswers=[...question.possibleAnswers]; newAnswers[index]=e.target.value; setQuestion({ ...question, possibleAnswers: newAnswers }); } } />
                    </div>
                    <div className="col-sm-2">
                      <FaTrash className="text-danger me-3"
                      onClick={ () => setQuestion({ ...question, possibleAnswers: question.possibleAnswers.filter((_:any, i:any) => i!==index) }) } />
                    </div>
                  </div>
                </li>
            ))}
          </div>
          <div className="mb-3 float-end">
            <button id="wd-add-answer" className="btn btn-danger me-2 float-end"
              onClick={() => { setQuestion({ ...question, possibleAnswers: [ ...question.possibleAnswers, "New Answer" ] }) } }>
              <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
              Add Another Answer</button>
          </div><br/>
        </div>)}

        
      </div>

        
      <br/>
      <hr />
      
      <Link id="wd-cancel-btn" to={`/Kanbas/Courses/${cid}/Quizzes/${quizid}/Questions`} className="btn btn-secondary me-1 float-start">
        Cancel</Link>
      <button id="wd-save-btn" onClick={save} className="btn btn-danger me-1 float-start">
        Update Question</button>

    </div>
);}
