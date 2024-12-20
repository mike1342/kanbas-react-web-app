import { useEffect } from "react";
import { BsGripVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { IoMdArrowDropdown } from "react-icons/io";
import QuizzesControlButtons from "./QuizzesControlButtons";
import { FaRocket } from "react-icons/fa";
import { Quiz } from "../../../types";
import { RootState } from "../../store";
import * as coursesClient from "../client";
import { setQuizzes, deleteQuiz, updateQuiz } from "./reducer";
import * as quizClient from "./client";
import { Link } from "react-router-dom";

export default function Quizzes() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);

  
  useEffect(() => {
    const fetchQuizzes = async () => {
      const quizzes = await coursesClient.findQuizzesForCourse(cid as string, currentUser._id);
      dispatch(setQuizzes(quizzes));
    };

    fetchQuizzes();
  }, [cid, currentUser._id, dispatch]);

  const removeQuiz = async (quizId: string) => {
    await quizClient.deleteQuiz(quizId);
    dispatch(deleteQuiz(quizId));
  };

  const handlePublishToggle = async (publish: boolean, quiz: Quiz) => {
    const updatedQuiz = { ...quiz, isPublished: publish };
    await quizClient.updateQuiz(updatedQuiz);
    dispatch(updateQuiz(updatedQuiz));
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
                {/* {currentUser.role === "FACULTY" && <QuizzesControlButtons />} */}
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
                          <Link
                            className="wd-quiz-link text-decoration-none text-dark fw-bold"
                            to={
                              currentUser.role === "FACULTY"
                                ? `/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/QuizDetailsScreen`
                                : `/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/StartQuiz`
                            }
                            state={{ quiz }}
                          >
                            {quiz.title}
                          </Link>
                          <p className="quiz-info fs-6 mb-0">
                            <strong>Availability: </strong> {availabilityStatus}{" "}
                            | <strong>Due: </strong>
                            {dateFormat(quiz.dueDate.toString())} |{" "}
                            {quiz.points} pts | {quiz.questions.length}{" "}
                            Questions
                          </p>
                        </div>
                        <div className="d-flex flex-grow-1" />
                        {currentUser.role === "FACULTY" && (
                          <div className="quiz-item-control-btns">
                            <QuizzesControlButtons
                              deleteQuiz={removeQuiz}
                              quiz={quiz}
                              handlePublishToggle={handlePublishToggle}
                            />
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
