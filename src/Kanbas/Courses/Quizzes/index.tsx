import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

export default function Quizzes() {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  return (
    <div id="wd-quizzes">
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
              id="wd-quiz-group"
              className="btn btn-md btn-secondary me-1 text-black float-end"
            >
              <BsThreeDotsVertical />
            </button>
            <a
              id="wd-add-quiz"
              className="btn btn-md btn-danger me-1 float-end"
              href={`#/Kanbas/Courses/${cid}/Quizes/NewQuiz`}
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
    </div>
  );
}
