import { Routes, Route, Navigate, useParams, useLocation } from "react-router";
import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentsEditor from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import Quizzes from "./Quizzes";
import QuizDetailsEditor from "./Quizzes/QuizDetailsEditor";
import QuizDetailsScreen from "./Quizzes/QuizDetailsScreen";
import StartQuiz from "./Quizzes/StartQuiz";
import QuizScreen from "./Quizzes/QuizScreen";

const Courses = ({ courses }: { courses: any[] }) => {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentsEditor />} />
            <Route
              path="Assignments/NewAssignment"
              element={<AssignmentsEditor />}
            />
            <Route path="/Quizzes" element={<Quizzes />} />
            <Route path="Quizzes/NewQuiz" element={<QuizDetailsEditor />} />
            <Route
              path="Quizzes/:qid/QuizDetailsScreen"
              element={<QuizDetailsScreen />}
            />
            <Route
              path="Quizzes/:qid/QuizDetailsEditor"
              element={<QuizDetailsEditor />}
            />
            <Route path="Quizzes/:qid/StartQuiz" element={<StartQuiz />} />
            <Route path="Quizzes/:qid/QuizScreen" element={<QuizScreen />} />
            <Route path="People" element={<PeopleTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Courses;
