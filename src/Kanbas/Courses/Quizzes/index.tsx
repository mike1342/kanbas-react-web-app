import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { IoMdArrowDropdown } from "react-icons/io";
import QuizzesControlButtons from "./QuizzesControlButtons";

export default function Quizzes() {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [menuVisible, setMenuVisible] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleEdit = () => {};

  const handleDelete = () => {};

  const handlePublishToggle = () => {
    setIsPublished(!isPublished);
  };

  return (
    <div id="wd-quizzes">
      <div id="wd-quiz-options">
        <div className="row mb-5">
          <div id="wd-search-quizzes-container" className="col">
            <input
              id="wd-search-quizzes"
              placeholder="Search for Quiz"
              className="form-control"
            />
          </div>
          {currentUser.role === "FACULTY" && (
            <div className="col">
              <button
                id="wd-quiz-context-menu"
                className="btn btn-md btn-secondary me-1 text-black float-end"
                onClick={toggleMenu}
              >
                <BsThreeDotsVertical />
              </button>
              {menuVisible && (
                <div className="dropdown-menu show position-absolute end-0 mt-5">
                  <button className="dropdown-item" onClick={handleEdit}>
                    Edit
                  </button>
                  <button
                    className="dropdown-item text-danger"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={handlePublishToggle}
                  >
                    {isPublished ? "Unpublish" : "Publish"}
                  </button>
                </div>
              )}
              <a
                id="wd-add-quiz"
                className="btn btn-md btn-danger me-1 float-end"
                href={`#/Kanbas/Courses/${cid}/Quizzes/NewQuiz`}
              >
                <FaPlus
                  className="position-relative me-2"
                  style={{ bottom: "1px" }}
                />
                Quiz
              </a>
            </div>
          )}
        </div>
        <hr />
        <br />
        <div id="wd-quiz-modules">
          <ul id="wd-quizzes-list" className="list-group rounded-0">
            <li className="wd-quiz list-group-item p-0 mb-5 fs-5 btn-secondary">
              <div className="wd-title border p-3 ps-2">
                <IoMdArrowDropdown className="me-2 fs-3" />
                <span className="fw-bold">Assignment Quizzes</span>
                {currentUser.role === "FACULTY" && <QuizzesControlButtons />}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
