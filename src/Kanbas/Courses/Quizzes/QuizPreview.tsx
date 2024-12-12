import { useParams } from "react-router";
//import { questions } from "../../Database";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import * as quizzesClient from "./client";
import * as questionsClient from "./Questions/client";
import * as userClient from "../../Account/client";
import { FaPlus, FaTrash } from "react-icons/fa";
import { setQuestions, addQuestion, deleteQuestion, updateQuestion }
  from "./Questions/reducer";
import { addQuiz, deleteQuiz, updateQuiz }
  from "./reducer";
import GreenCheckmark from "../Modules/GreenCheckmark";
import RedXMark from "../Modules/RedXMark";

export default function QuizPreview() {
  const { quizid } = useParams();
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { questions } = useSelector((state: any) => state.questionsReducer);
  const [questionNumber, setQuestionNumber] = useState<any>({});
  const [questionIndex, setQuestionIndex] = useState<any>({});
  const [previousQuizGrade, setPreviousQuizGrade] = useState<any>({});
  const [newAnswers, setNewAnswers] = useState<any[]>([]);
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const [quiz, setQuiz] = useState<any>({});

  const fetchQuiz = () => {
    setQuiz(quizzes.find((quiz: any) => quiz._id === quizid));
  };
  const fetchQuestions = async () => {
    const questions = await quizzesClient.findQuestionsForQuiz(quizid as string);
    dispatch(setQuestions(questions));
    setQuestionIndex(0);
    setQuestionNumber( questions && questions.length );
  };
  const fetchPreviousQuizGrade = async () => {
    const previousQuizGrade = await userClient.findQuizGradeForUser(currentUser._id, quizid as string);
    if(previousQuizGrade)
        setPreviousQuizGrade(previousQuizGrade);
    else
        setPreviousQuizGrade({});
  };
  const fetchPreviousAnswerForQuestion = (questionId : any) => {
    const previousQuestionGrades = previousQuizGrade && previousQuizGrade?.questionGrades;
    const foundQuestionGrade = previousQuestionGrades && previousQuestionGrades.find((questionGrade : any) => questionGrade.question === questionId);
    const questionAnswer = (foundQuestionGrade && foundQuestionGrade?.answer) ? foundQuestionGrade.answer : "";
    return questionAnswer;
  };
  const fetchPreviousGradeForQuestion = (questionId : any) => {
    const previousQuestionGrades = previousQuizGrade && previousQuizGrade?.questionGrades;
    const foundQuestionGrade = previousQuestionGrades && previousQuestionGrades.find((questionGrade : any) => questionGrade.question === questionId);
    const questionGrade = (foundQuestionGrade && foundQuestionGrade?.grade) ? foundQuestionGrade.grade : 0;
    return questionGrade;
  };
  const fetchAnswerForQuestion = (questionId : any) => {
    const found = newAnswers.find((answer : any) => answer.question === questionId);
    return (found && found?.answer) ? found.answer : "";
  };
  const submit = async () => {
    const newQuizGrade = await userClient.createQuizGrade(currentUser._id, quizid as string, newAnswers);
    if(newQuizGrade)
        setPreviousQuizGrade(newQuizGrade);
    setNewAnswers([]);
    const curQuiz = quizzes.find((quiz: any) => quiz._id === quizid);
    let latestScore = newQuizGrade.totalGrade;
    await quizzesClient.updateQuiz({...curQuiz, latestScore: latestScore});
    dispatch(updateQuiz({...curQuiz, latestScore: latestScore}));
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizid}/Details`);
  };
  useEffect(() => {
    fetchQuestions();
    fetchPreviousQuizGrade();
    fetchQuiz();
  }, []);


  return (
    <div id="wd-questions-editor" className="container">

      <h3>Questions</h3><hr/>

      <div className="mb-3">
        <div className="d-flex mb-3">
          <div className="me-2"><b>Question { questionIndex+1 }: { questions && questionIndex<questionNumber && questions[questionIndex]?.title }</b></div>
          { previousQuizGrade?.user && (fetchPreviousGradeForQuestion(questions && questionIndex<questionNumber && questions[questionIndex]?._id) > 0 ? (<GreenCheckmark />) : (<RedXMark />)) }
        </div>
        <p>{ questions && questionIndex<questionNumber && questions[questionIndex]?.description }</p>
      </div><br/><hr/>
      
      <div>

        {questions && questionIndex<questionNumber && questions[questionIndex]?.type==="MultipleChoice" && 
        (<div>
          {questions[questionIndex]?.choices && questions[questionIndex]?.choices
            .map((choice: any, index: number ) => (
              <li className="wd-choice-list-item list-group-item p-2 ps-1">           
                <div className="form-check mb-3">
                  <input className="form-check-input" type="radio" 
                    name="choiceRadios" id={`choice${index+1}`} value={choice} checked={fetchAnswerForQuestion(questions[questionIndex]._id) === choice}
                    onChange={ (e) => { const updatedNewAnswers = newAnswers.filter((answer: any) => answer.question !== questions[questionIndex]._id);
                        setNewAnswers([...updatedNewAnswers, { question: questions[questionIndex]._id , answer: e.target.value} ]);
                     } }/>
                  <label htmlFor={`choice${index+1}`} className="form-check-label">
                    {choice} </label>
                </div>
              </li>
          ))}
        </div>)}

        {questions && questionIndex<questionNumber && questions[questionIndex]?.type==="TrueFalse" && 
        (<div className="row mb-3">
          <div className="mb-2 col-sm-10">
            <div className="form-check mb-3">
              <input className="form-check-input" type="radio" 
                name="trueFalseRadios" id="true" value="true" checked={fetchAnswerForQuestion(questions[questionIndex]._id) === "true"}
                onChange={ (e) => { const updatedNewAnswers = newAnswers.filter((answer: any) => answer.question !== questions[questionIndex]._id);
                    setNewAnswers([...updatedNewAnswers, { question: questions[questionIndex]._id , answer: e.target.value} ]);
                 } }/>
              <label className="form-check-label" htmlFor="true">
                  True </label></div>
            <div className="form-check">
              <input className="form-check-input" type="radio" 
                name="trueFalseRadios" id="false" value="false" checked={fetchAnswerForQuestion(questions[questionIndex]._id) === "false"}
                onChange={ (e) => { const updatedNewAnswers = newAnswers.filter((answer: any) => answer.question !== questions[questionIndex]._id);
                    setNewAnswers([...updatedNewAnswers, { question: questions[questionIndex]._id , answer: e.target.value} ]);
                 } }/>
              <label className="form-check-label" htmlFor="false">
                  False </label></div>
          </div>
        </div>)}
   
        {questions && questionIndex<questionNumber && questions[questionIndex]?.type==="FillInTheBlank" && 
        (<div>
          <div className="mb-2 row">
            <label htmlFor="wd-answer-item" className="col-sm-2 col-form-label">
              Your Answer : </label>
            <div className="col-sm-10 col-md-4">
              <input id="wd-answer-item" className="form-control" value={fetchAnswerForQuestion(questions[questionIndex]._id)} onChange={
                (e) => { const updatedNewAnswers = newAnswers.filter((answer: any) => answer.question !== questions[questionIndex]._id);
                    setNewAnswers([...updatedNewAnswers, { question: questions[questionIndex]._id , answer: e.target.value} ]);
                 } } />
            </div>
          </div>
        </div>)}


        <hr/>
        
        { previousQuizGrade?.user && (<div>
          <p>
              Previous Answer : {fetchPreviousAnswerForQuestion(questions && questionIndex<questionNumber && questions[questionIndex]?._id)}
          </p>
          <p>
              Grade : {fetchPreviousGradeForQuestion(questions && questionIndex<questionNumber && questions[questionIndex]?._id)}
          </p>
        </div>)}
        


      </div>

        
      <br/>
      <br/>


      
      <button id="wd-next-btn" onClick={ () => {setQuestionIndex( (questionIndex+1) % questionNumber)} } className="btn btn-secondary me-1 float-end">
        Next</button><br/><br/><hr />
      
      {(!previousQuizGrade.user || ( quiz?.howManyAttempts && previousQuizGrade?.attempts && previousQuizGrade?.attempts < quiz?.howManyAttempts )) 
        && (<button id="wd-submit-btn" onClick={submit} className="btn btn-secondary me-1 float-end">
        Submit Quiz</button>)}
      
      <br/><br/><hr />

      <div className="fs-5 mb-3">
        Questions:
      </div>
      <div>
        {questions && questions
          .map((question: any, index: number ) => (
            <li className="wd-choice-list-item list-group-item p-2 ps-1">           
              <div className="">
                <button id="wd-question-choose-btn" onClick={ () => {setQuestionIndex(index)} } className="btn btn-danger me-1">
                  Question {index+1}</button>
              </div>
            </li>
        ))}
      </div>

    </div>
);}
