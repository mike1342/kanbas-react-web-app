import { BsGripVertical, BsPlus } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import LessonControlButtons from "../Modules/LessonControlButtons";
import ModuleControlButtons from "../Modules/ModuleControlButtons";
import ModulesControls from "../Modules/ModulesControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import "../../styles.css";
import { VscNotebook } from "react-icons/vsc";
import { useParams } from "react-router";
import * as db from "../../Database";

const Assignments: React.FC = () => {
  const { cid } = useParams();
  const assignments = db.assignments.filter((assignment: any) => assignment.course === cid);

  const dateFormat = (dateStr: string) => {
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString('en-US', {month: 'long', day: 'numeric'});
    const formattedTime = "at 12:00am";
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <div id="wd-assignments">
      <div className="row mb-5">
        <div id="wd-search-assignment-container" className="col">
          <CiSearch className="me-2 fs-3" />
          <input id="wd-search-assignment" placeholder="Search..."/>
        </div>
        <div className="col">
          <button id="wd-add-assignment" className="float-end me-1 border rounded-1 bg-danger text-white">
            <BsPlus className="fs-3"/>
            Assignment
          </button>
          <button id="wd-add-assignment-group" className="float-end me-1 border rounded-1">
            <BsPlus className="fs-3"/>
            Group
          </button>
        </div>
      </div>
      <ul id="wd-assignment-list" className="list-group rounded-0">
        <li className="wd-assignment list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title border p-3 ps-2">
            <BsGripVertical className="me-2 fs-3" />
              <span className="fw-bold">ASSIGNMENTS</span>
            <AssignmentControlButtons percentage="40" />
          </div>
          {assignments && (
            <ul id="wd-assignment-list" className="list-group rounded-0">
              {assignments.map((assignment) => (
                <li className="wd-assignment-list-item list-group-item p-3 ps-1 d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3"/>
                  <VscNotebook className="me-2 fs-3 text-success" />
                  <div className="d-inline-block align-items-center">
                    <a className="wd-assignment-link text-decoration-none text-dark fw-bold"
                      href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}>
                      {assignment.title}
                    </a>
                    <p className="assignment-info fs-6 mb-0">
                      <span className="text-danger">Multiple Modules</span> | 
                      <strong>Not available until</strong> {dateFormat(assignment.start_date)} | 
                      <strong>Due</strong> {dateFormat(assignment.start_date)} | 
                      {assignment.points} pts
                    </p>
                  </div>
                  <div className="d-flex flex-grow-1"/>
                  <div className="assignment-item-control-btns">
                    <LessonControlButtons />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Assignments;

const dsad = (
<div>
  <ModulesControls /><br /><br /><br /><br />
  <ul id="wd-modules" className="list-group rounded-0">
    <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
      <div className="wd-title p-3 ps-2 bg-secondary">
        <BsGripVertical className="me-2 fs-3" />
          Week 1
        <ModuleControlButtons />
      </div>
      <ul className="wd-lessons list-group rounded-0">
        <li className="wd-lesson list-group-item p-3 ps-1">
          <BsGripVertical className="me-2 fs-3" />
            LEARNING OBJECTIVES 
          <LessonControlButtons />
        </li>
        <li className="wd-lesson list-group-item p-3 ps-1">
          <BsGripVertical className="me-2 fs-3" />
            Introduction to the course 
          <LessonControlButtons />
        </li>
        <li className="wd-lesson list-group-item p-3 ps-1">
          <BsGripVertical className="me-2 fs-3" />
            Learn what is Web Development
          <LessonControlButtons />
        </li>
        <li className="wd-lesson list-group-item p-3 ps-1">
          <BsGripVertical className="me-2 fs-3" />
            LESSON 1
          <LessonControlButtons />
        </li>
        <li className="wd-lesson list-group-item p-3 ps-1"> 
          <BsGripVertical className="me-2 fs-3" />
            LESSON 2
          <LessonControlButtons /> 
        </li>
      </ul>
    </li>
    <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
      <div className="wd-title p-3 ps-2 bg-secondary">
        <BsGripVertical className="me-2 fs-3" />
          Week 2
        <ModuleControlButtons />
      </div>
      <ul className="wd-lessons list-group rounded-0">
        <li className="wd-lesson list-group-item p-3 ps-1">
          <BsGripVertical className="me-2 fs-3" />
            LEARNING OBJECTIVES 
          <LessonControlButtons />
        </li>
        <li className="wd-lesson list-group-item p-3 ps-1">
          <BsGripVertical className="me-2 fs-3" />
            LESSON 1
          <LessonControlButtons />
        </li>
        <li className="wd-lesson list-group-item p-3 ps-1"> 
          <BsGripVertical className="me-2 fs-3" />
            LESSON 2
          <LessonControlButtons /> 
        </li>
      </ul>
    </li>
  </ul>
</div>);