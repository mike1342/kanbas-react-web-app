const AssignmentsEditor: React.FC = () => {
  return (
    <div id="wd-assignments-editor">
      <label>Assignment Name</label>
      <input id="wd-name" value="A1 - ENV + HTML" /><br/><br/>

      <textarea id="wd-description" rows={6} cols={60} defaultValue="The assignment is available online. Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section, links to each of the lab assignments, link to the Kanbas application, links to all relevant source code repositories. The Kanbas application should include a link to navigate back to the landing page."></textarea>
      <br/><br/>

      <table>
        <tr>
          <td align="right" valign="top">
            <label>Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} type="number" />
          </td>
        </tr>
        <br/>
        <tr>
          <td align="right" valign="top">
            <label>Assignment Group</label>
          </td>
          <td>
            <select id="wd-group">
              <option>ASSIGNMENTS</option>
              <option>QUIZZES</option>
              <option>EXAMS</option>
              <option>PROJECT</option>
            </select>
          </td>
        </tr>
        <br/>
        <tr>
          <td align="right" valign="top">
            <label>Display Grade as</label>
          </td>
          <td>
            <select id="wd-display-grade-as">
              <option>Percentage</option>
              <option>Points</option>
              {/* Add more grade options here */}
            </select>
          </td>
        </tr>
        <br/>
        <tr>
          <td align="right" valign="top">
            <label>Submission Type</label>            
          </td>
          <td>
            <select id="wd-submission-type">
              <option>Online</option>              
            </select>
            <br/><br/>
            <span>Online Entry Options</span><br/>
            <input type="checkbox" id="wd-text-entry" /> Text Entry<br/>
            <input type="checkbox" id="wd-website-url" /> Website URL<br/>
            <input type="checkbox" id="wd-media-recordings" /> Media Recordings<br/>
            <input type="checkbox" id="wd-student-annotation" /> Student Annotation<br/>
            <input type="checkbox" id="wd-file-upload" /> File Uploads<br/>
          </td>
        </tr>
        <br/>
        <tr>
          <td align="right" valign="top">
            <label>Assign</label>
          </td>
          <td>
            <label>Assign To</label>
            <br/>
            <input id="wd-assign-to" value="Everyone" />

            <br/><br/>

            <label>Due</label>
            <br/>
            <input id="wd-due-date" type="date" value="2024-05-13" />

            <br/><br/>

            <div>
              <div style={{"display": "inline-block"}}>
                <label>Available from</label>
                <br/>
                <input id="wd-available-from" type="date" value="2024-05-06" />
              </div>
              <div style={{"display": "inline-block"}}>
                <label>Until</label>
                <br/>
                <input id="wd-available-until" type="date" value="2024-05-20" />
              </div>
            </div>
          </td>
        </tr>
      </table>

      <hr/>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <button>Cancel</button>
        <button>Save</button>
      </div>
    </div>
  );
}

export default AssignmentsEditor;
