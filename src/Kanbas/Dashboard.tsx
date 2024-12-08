import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addEnrollment, deleteEnrollment, setEnrollments } from "./enrollmentsReducer";
import * as enrollmentsClient from "./enrollmentsClient";

const Dashboard = ({ courses, userCourses, course, setCourse, addNewCourse,
  deleteCourse, updateCourse }: {
  courses: any[]; userCourses: any[]; course: any; setCourse: (course: any) => void;
  addNewCourse: () => void; deleteCourse: (course: any) => void;
  updateCourse: () => void; }) => {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const dispatch = useDispatch();

  const [showAllCourses, setShowAllCourses] = useState(false);

  useEffect(() => {
    console.log(enrollments);
  }, [enrollments]);
  
  useEffect(() => {
    const fetchEnrollments = async () => {
      console.log('fetching enrollments');
      const enrollments = await enrollmentsClient.findEnrollments(currentUser._id);
      dispatch(setEnrollments(enrollments));
    };

    fetchEnrollments();
  }, []);

  const saveEnrollment = async (event: any, course: any) => {
    event.preventDefault();
    const enrollment = await enrollmentsClient.createEnrollment(currentUser._id, course._id);
    dispatch(addEnrollment(enrollment));
  };

  const removeEnrollment = async (event: any, enrollment: any) => {
    event.preventDefault();
    await enrollmentsClient.deleteEnrollment(enrollment._id);
    dispatch(deleteEnrollment(enrollment._id));
  }

  const toggleEnrollments = () => {
    setShowAllCourses(state => !state);
  };

  const checkEnrollment = (enrollment: any, course: any) => enrollment.course === course._id;

  const handleLinkClick = (event: any, course: any) => {
    if (!enrollments.find((enrollment: any) => checkEnrollment(enrollment, course))) {
      event.preventDefault();
    }
  };
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {currentUser.role === "FACULTY" && <><h5>New Course</h5><br /><input value={course.name} className="form-control mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })} /><textarea value={course.description} className="form-control"
          onChange={(e) => setCourse({ ...course, description: e.target.value })} /><button className="btn btn-primary float-end"
            id="wd-add-new-course-click"
            onClick={addNewCourse}> Add </button><button className="btn btn-warning float-end me-2"
              onClick={updateCourse} id="wd-update-course-click">
          Update
        </button><hr /></>}
      {currentUser.role === "STUDENT" && 
        <button className="btn btn-primary float-end" id="wd-enroll-course-click" onClick={toggleEnrollments}>
          Enrollments
        </button>
      }
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {(showAllCourses ? courses : userCourses)
          .map((course) => {
            let enrollment = null;
            if (Array.isArray(enrollments)) {
              enrollment = enrollments.find((enrollment: any) => checkEnrollment(enrollment, course));
            }
            return (
            <div className="wd-dashboard-course col" style={{ width: "270px" }}>
              <div className="card rounded-3 overflow-hidden">
                <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                      to={`/Kanbas/Courses/${course._id}/Home`} onClick={(event) => handleLinkClick(event, course)}>
                  <img src="/logo512.png" width="100%" height={160}/>
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                      {course.name}
                    </h5>
                    <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                      {course.description}
                    </p>
                    {showAllCourses ? 
                      !enrollment ?
                        <button className="btn btn-success" onClick={(event) => saveEnrollment(event, course)}> Enroll </button> :
                        <button className="btn btn-danger" onClick={(event) => removeEnrollment(event, enrollment)}> Unenroll </button>
                    : <button className="btn btn-primary"> Go </button>}
                    {currentUser.role === "FACULTY" && <><button id="wd-edit-course-click"
                      onClick={(event) => {
                        event.preventDefault();
                        setCourse(course);
                      } }
                      className="btn btn-warning me-2 float-end">
                      Edit
                    </button><button onClick={(event) => {
                      event.preventDefault();
                      deleteCourse(course._id);
                    } } className="btn btn-danger float-end"
                      id="wd-delete-course-click">
                        Delete
                      </button></>}
                  </div>
                </Link>
              </div>
            </div>
          );})}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
