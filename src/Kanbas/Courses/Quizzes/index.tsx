import { useState } from "react";
import { BsGripVertical, BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { IoMdArrowDropdown } from "react-icons/io";
import QuizzesControlButtons from "./QuizzesControlButtons";
import { FaRocket } from "react-icons/fa";
import { FillInQuestion, MCQuestion, Quiz, TFQuestion } from "../../../types";
import { RootState } from "../../store";

export default function Quizzes() {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
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

  const dateFormat = (dateStr: string) => {
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
    const formattedTime = "at 12:00am";
    return `${formattedDate} ${formattedTime}`;
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
              {quizzes && (
                <ul id="wd-quiz-list" className="list-group rounded-0">
                  {quizzes.map((quiz: Quiz) => {
                    const currentDate = new Date();
                    const availableDate = new Date(quiz.availableFrom);
                    const availableUntilDate = new Date(quiz.availableUntil);

                    // Determine availability status
                    let availabilityStatus;
                    if (currentDate < availableDate) {
                      availabilityStatus = `Not available until ${dateFormat(
                        quiz.availableFrom.toString()
                      )}`;
                    } else if (
                      currentDate >= availableDate &&
                      currentDate <= availableUntilDate
                    ) {
                      availabilityStatus = "Available";
                    } else if (currentDate > availableUntilDate) {
                      availabilityStatus = "Closed";
                    }

                    return (
                      <li
                        className="wd-quiz-list-item list-group-item p-3 ps-1 d-flex align-items-center"
                        key={quiz._id}
                      >
                        <BsGripVertical className="me-2 fs-3" />
                        <FaRocket className="me-2 fs-3 text-success" />
                        <div className="d-inline-block align-items-center">
                          <a
                            className="wd-quiz-link text-decoration-none text-dark fw-bold"
                            href={`#/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}
                          >
                            {quiz.title}
                          </a>
                          <p className="quiz-info fs-6 mb-0">
                            <strong>Availability:</strong> {availabilityStatus}{" "}
                            | <strong>Due:</strong>{" "}
                            {dateFormat(quiz.dueDate.toString())} |{" "}
                            <strong>Points:</strong> {quiz.points} |{" "}
                          </p>
                        </div>
                        <div className="d-flex flex-grow-1" />
                        {currentUser.role === "FACULTY" && (
                          <div className="quiz-item-control-btns">
                            <QuizzesControlButtons />
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
