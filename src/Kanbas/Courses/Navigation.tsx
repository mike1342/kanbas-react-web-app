import { Link, useLocation, useParams } from "react-router-dom";
import '../styles.css';
const CoursesNavigation: React.FC = () => {
  const location = useLocation();
  const { cid } = useParams();
  const classes = (path: string) => location.pathname.includes(path) ? "list-group-item active border border-0" : "list-group-item text-danger border border-0";
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link key={link} to={`/Kanbas/Courses/${cid}/${link}`} id={`wd-course-${link.toLowerCase()}-link`}
          className={classes(`/Kanbas/Courses/${cid}/${link}`)}> {link} </Link>
      ))}
    </div>
  );
};

export default CoursesNavigation;
