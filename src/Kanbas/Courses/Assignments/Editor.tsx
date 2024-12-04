import { useParams } from "react-router";
import { assignments } from "../../Database";
import { Link, useNavigate } from "react-router-dom";
import { addAssignment, deleteAssignment, updateAssignment }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";

export default function AssignmentEditor() {
  const { aid } = useParams();
  const { cid } = useParams();
  //const assignment = assignments.find((assignment: any) => assignment._id === aid);
  const [assignment, setAssignment] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);

  const createAssignmentForCourse = async () => {
    if (!cid) return;
    const newAssignment = await coursesClient.createAssignmentForCourse(cid, assignment);
    dispatch(addAssignment(newAssignment));
  };
  const saveAssignment = async (assignment: any) => {
    await assignmentsClient.updateAssignment(assignment);
    dispatch(updateAssignment(assignment));
  };
  const fetchAssignment = () => {
    //if (aid === '0') return navigate(`/Kanbas/Courses/${cid}/Assignments/${new Date().getTime().toString()}`);
    if ( aid === "create" )
      setAssignment({ _id: Date.now().toString(), title: "Edit name", course: cid });
    else
      setAssignment(assignments.find((assignment: any) => assignment._id === aid));
  };
  const save = () => {
    if (aid === "create")
      //dispatch(addAssignment(assignment));
      createAssignmentForCourse();  
    else
      //dispatch(updateAssignment(assignment));
      saveAssignment(assignment);
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };
  useEffect(() => { fetchAssignment(); }, []);

  return (
    <div id="wd-assignments-editor" className="container">


      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label">
          Assignment Name</label>
        <textarea className="form-control" id="wd-name" value={ assignment && assignment.title } onChange={(e) => setAssignment({ ...assignment, title: e.target.value }) }
                  rows={3}></textarea>
      </div>

      <div className="mb-3">
      <textarea id="wd-description" className="form-control" value={ assignment?.description ? assignment.description : "Edit description" } cols={45} rows={10} onChange={(e) => setAssignment({ ...assignment, description: e.target.value }) } >
        The assignment is available online
        Submit a link to the landing page of your Web application running on Netlify.
        The landing page should include the following: Your full name and section Links to each of the lab assignments Link to the Kanbas application Links to all relevant source code repositories The Kanbas application should include a link to navigate back to the landing page.
      </textarea>
      </div>

      <div>

        <div className="mb-3 row">
          <label htmlFor="wd-points" className="col-sm-2 col-form-label">
            Points</label>
          <div className="col-sm-10 col-md-4">
            <input id="wd-points" className="form-control" value={ assignment?.points ? assignment.points : 100 } onChange={(e) => setAssignment({ ...assignment, points: e.target.value })} />
          </div>
        </div>

        {/* Complete on your own */}
        <div className="mb-3 row">
          <label htmlFor="wd-group" className="col-sm-2 col-form-label">
            Assignment Group</label>
          <div className="col-sm-10 col-md-4">
            <select id="wd-group" className="form-select" value={ assignment?.group ? assignment.group : "ASSIGNMENTS" } onChange={(e) => setAssignment({ ...assignment, group: e.target.value })} >
              <option value="1">1</option>
              <option selected value="ASSIGNMENTS">
                ASSIGNMENTS</option>
              <option value="2">2</option>
            </select>
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="wd-display-grade-as" className="col-sm-2 col-form-label">
            Display Grade as</label>
          <div className="col-sm-10 col-md-4">
            <select id="wd-display-grade-as" className="form-select" value={ assignment?.gradeformat ? assignment.gradeformat : "Percentage" } onChange={(e) => setAssignment({ ...assignment, gradeformat: e.target.value })} >
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
              <select id="wd-submission-type" className="form-select" value={ assignment?.submissiontype ? assignment.submissiontype : "Online" } onChange={(e) => setAssignment({ ...assignment, submissiontype: e.target.value })} >
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
              <input id="wd-assign-to" className="form-control" value={ assignment?.assignto ? assignment.assignto : "Everyone" } onChange={(e) => setAssignment({ ...assignment, assignto: e.target.value })} />
            </div>

            <div className="mb-3 container">
              <label htmlFor="wd-due-date" className="col-form-label">
                <b>Due</b></label>
              <input type="date" id="wd-due-date" className="form-control" value={ assignment?.duedate ? assignment.duedate : "2024-05-13" } onChange={(e) => setAssignment({ ...assignment, duedate: e.target.value })} />
            </div>

            <div className="mb-3 container d-flex justify-content-between">
              <div className="mb-2">
                <label htmlFor="wd-available-from" className="col-form-label">
                  <b>Available from</b></label>
                <input type="date" id="wd-available-from" className="form-control" value={ assignment?.availablefrom ? assignment.availablefrom : "2024-05-06" } onChange={(e) => setAssignment({ ...assignment, availablefrom: e.target.value })} />
              </div>

              <div className="mb-2">
                <label htmlFor="wd-available-until" className="col-form-label">
                  <b>Until</b></label>
                <input type="date" id="wd-available-until" className="form-control" value={ assignment?.availableuntil ? assignment.availableuntil : "2024-05-20" } onChange={(e) => setAssignment({ ...assignment, availableuntil: e.target.value })} />
              </div>
            </div>

          </div>
        </div>

      </div>

        
      <br/>
      <hr />
      <button id="wd-save-btn" onClick={save} className="btn btn-danger me-1 float-end">
        Save</button>
      <Link id="wd-cancel-btn" to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-secondary me-1 float-end">
        Cancel</Link>

    </div>
);}
