import { Routes, Route, Navigate, useParams, useLocation } from "react-router";
import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentsEditor from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import { useEffect, useState } from "react";
import {findUsersForCourse} from "./client";

const Courses = ({ courses }: { courses: any[]; }) => {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const [courseUsers, setCourseUsers] = useState<any[]>([]);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await findUsersForCourse(cid as string);
      setCourseUsers(users);
    };
    fetchUsers();
  }, [cid]);

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
            <Route path="Assignments/NewAssignment" element={<AssignmentsEditor />} />
            <Route path="People" element={<PeopleTable users={courseUsers} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Courses;
