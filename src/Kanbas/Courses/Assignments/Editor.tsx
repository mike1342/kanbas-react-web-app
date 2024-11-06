import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useState } from "react";
import { addAssignment, updateAssignment } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import * as uuid from 'uuid';

const emptyAssignment = {
  _id: "", 
  title: "", 
  course: "",
  start_date: "",
  end_date: "",
  points: 100, 
  description: ""
};

const AssignmentsEditor: React.FC = () => {
  const { aid, cid } = useParams();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);

  const addingAssignment = pathname.includes("NewAssignment");
  const initAssignment =  addingAssignment ? emptyAssignment : assignments.find((assignment: any) => assignment._id === aid);

  const [assignment, setAssignment] = useState<any>(initAssignment);

  const handleSave = () => {
    if (addingAssignment) {
      dispatch(addAssignment({...assignment, _id: uuid.v4(), course: cid}));
    } else {
      dispatch(updateAssignment(assignment));
    }
  };

  return (
    <div id="wd-assignments-editor" className="container mt-4">
      <div className="mb-3">
        <label htmlFor="wd-name">Assignment Name</label>
        <input id="wd-name" className="form-control" value={assignment?.title} onChange={(e) => setAssignment({ ...assignment, title:  e.target.value })} />
      </div>

      <div className="mb-3">
        <label htmlFor="wd-description">Description</label>
        <textarea
          id="wd-description"
          className="form-control"
          rows={6}
          defaultValue={assignment?.description}
          onChange={(e) => setAssignment({ ...assignment, description:  e.target.value })}
        />
      </div>

      <div className="row mb-3">
        <div className="col-md-2 d-flex justify-content-end">
          <label htmlFor="wd-points" className="text-end">Points</label>
        </div>
        <div className="col-md-4 px-0">
          <input id="wd-points" className="form-control" value={assignment?.points} type="number" onChange={(e) => setAssignment({ ...assignment, points:  e.target.value })} />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-2 d-flex justify-content-end">
          <label htmlFor="wd-group" className="text-end">Assignment Group</label>
        </div>
        <div className="col-md-4 px-0">
          <select id="wd-group" className="form-select">
            <option>ASSIGNMENTS</option>
            <option>QUIZZES</option>
            <option>EXAMS</option>
            <option>PROJECT</option>
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-2 d-flex justify-content-end">
          <label htmlFor="wd-display-grade-as" className="text-end">Display Grade as</label>
        </div>
        <div className="col-md-4 d-flex px-0">
          <select id="wd-display-grade-as" className="form-select">
            <option>Percentage</option>
            <option>Points</option>
            <option>Letter</option>
            <option>Complete/Incomplete</option>
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-2 d-flex justify-content-end">
          <label htmlFor="wd-submission-type" className="text-end">Submission Type</label>
        </div>
        <div className="col-md-4 border rounded p-3">
          <select id="wd-submission-type" className="form-select">
            <option>Online</option>
          </select>
          <br />
          <span><strong>Online Entry Options</strong></span>
          <div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="wd-text-entry" />
              <label className="form-check-label" htmlFor="wd-text-entry">Text Entry</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="wd-website-url" />
              <label className="form-check-label" htmlFor="wd-website-url">Website URL</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="wd-media-recordings" />
              <label className="form-check-label" htmlFor="wd-media-recordings">Media Recordings</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="wd-student-annotation" />
              <label className="form-check-label" htmlFor="wd-student-annotation">Student Annotation</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="wd-file-upload" />
              <label className="form-check-label" htmlFor="wd-file-upload">File Uploads</label>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-2 d-flex justify-content-end">
          <label htmlFor="wd-assign-to" className="text-end">Assign</label>
        </div>
        <div className="col-md-4 border rounded p-3">
          <label><strong>Assign To</strong></label>
          <input id="wd-assign-to" className="form-control" defaultValue="Everyone" />
          <br />
          <label htmlFor="wd-due-date">Due</label>
          <input id="wd-due-date" className="form-control" type="date" value={assignment?.end_date} onChange={(e) => setAssignment({ ...assignment, end_date:  e.target.value })}/>
          <br />
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="wd-available-from">Available from</label>
              <input id="wd-available-from" className="form-control" type="date" value={assignment?.start_date} onChange={(e) => setAssignment({ ...assignment, start_date:  e.target.value })} />
            </div>
            <div className="col-md-6">
              <label htmlFor="wd-available-until">Until</label>
              <input id="wd-available-until" className="form-control" type="date" value={assignment?.end_date} onChange={(e) => setAssignment({ ...assignment, end_date:  e.target.value })}/>
            </div>
          </div>
        </div>
      </div>

      <hr />
      <div className="d-flex justify-content-end">
        <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-secondary me-2">Cancel</Link>
        <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-danger" onClick={handleSave}>Save</Link>
      </div>
    </div>


  );
}

export default AssignmentsEditor;
