import Modules from "../Modules";
import CourseStatus from "./Status";
const Home: React.FC = () => {
  return (
    <table id="wd-home">
      <tr>
        <td valign="top">
          <Modules />
        </td>
        <td valign="top">
          <CourseStatus />
        </td>
      </tr>
    </table>
  );
}

export default Home;
