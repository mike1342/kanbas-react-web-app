import Modules from "../Modules";
import CourseStatus from "./Status";
const Home: React.FC = () => {
  return (
    <div className="d-flex" id="wd-home">
      <div className="flex-fill">
        <Modules />
      </div>
      <div className="d-none d-md-block ps-3">
        <CourseStatus />
      </div>
    </div>
  );
}

export default Home;
