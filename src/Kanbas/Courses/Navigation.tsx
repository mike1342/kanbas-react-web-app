import { Link, useLocation } from "react-router-dom";
import '../styles.css';
const CoursesNavigation: React.FC = () => {
  const location = useLocation();
  const classes = (path: string) => location.pathname === path ? "list-group-item active border border-0" : "list-group-item text-danger border border-0";

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      <Link to="/Kanbas/Courses/1234/Home" id="wd-course-home-link"
        className={classes("/Kanbas/Courses/1234/Home")}> Home </Link>
      <Link to="/Kanbas/Courses/1234/Modules" id="wd-course-modules-link"
        className={classes("/Kanbas/Courses/1234/Modules")}> Modules </Link>
      <Link to="/Kanbas/Courses/1234/Piazza" id="wd-course-piazza-link"
        className={classes("/Kanbas/Courses/1234/Piazza")}> Piazza </Link>
      <Link to="/Kanbas/Courses/1234/Zoom" id="wd-course-zoom-link"
        className={classes("/Kanbas/Courses/1234/Zoom")}> Zoom </Link>
      <Link to="/Kanbas/Courses/1234/Assignments" id="wd-course-quizzes-link"
        className={classes("/Kanbas/Courses/1234/Assignments")}> Assignments </Link>
      <Link to="/Kanbas/Courses/1234/Quizzes" id="wd-course-assignments-link"
        className={classes("/Kanbas/Courses/1234/Quizzes")}> Quizzes </Link>
      <Link to="/Kanbas/Courses/1234/People" id="wd-course-people-link"
        className={classes("/Kanbas/Courses/1234/People")} > People </Link>
    </div>
  );
};

export default CoursesNavigation;
