import { FaChevronDown } from "react-icons/fa6";

const AssignmentsEditor: React.FC = () => {
  return (
    <div id="wd-assignments-editor" className="container mt-4">
      <div className="mb-3">
        <label htmlFor="wd-name">Assignment Name</label>
        <input id="wd-name" className="form-control" value="A1" />
      </div>

      <div className="mb-3">
        <label htmlFor="wd-description">Description</label>
        <textarea
          id="wd-description"
          className="form-control"
          rows={6}
          defaultValue="The assignment is available online. Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section, links to each of the lab assignments, link to the Kanbas application, links to all relevant source code repositories. The Kanbas application should include a link to navigate back to the landing page."
        />
      </div>

      <div className="row mb-3">
        <div className="col-md-2 d-flex justify-content-end">
          <label htmlFor="wd-points" className="text-end">Points</label>
        </div>
        <div className="col-md-4 px-0">
          <input id="wd-points" className="form-control" value={100} type="number" />
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
          <input id="wd-due-date" className="form-control" type="date" value="2024-05-13" />
          <br />
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="wd-available-from">Available from</label>
              <input id="wd-available-from" className="form-control" type="date" value="2024-05-06" />
            </div>
            <div className="col-md-6">
              <label htmlFor="wd-available-until">Until</label>
              <input id="wd-available-until" className="form-control" type="date" value="2024-05-20" />
            </div>
          </div>
        </div>
      </div>

      <hr />
      <div className="d-flex justify-content-end">
        <button className="btn btn-secondary me-2">Cancel</button>
        <button className="btn btn-danger">Save</button>
      </div>
    </div>


  );
}

export default AssignmentsEditor;
