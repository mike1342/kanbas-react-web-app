import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendar } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
const KanbasNavigation: React.FC = () => {

  const location = useLocation();
  const isSelected = (path: string) => location.pathname === path;
  const selectedClasses = "list-group-item text-center border-0 bg-white text-danger";
  const unselectedClasses = "list-group-item text-white bg-black text-center border-0";
  const defaultAcctClasses = "list-group-item text-center border-0 bg-black text-white";

  return (
    <div id="wd-kanbas-navigation" style={{ width: 120 }}
    className="list-group rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2">
      <a href="https://www.northeastern.edu/" id="wd-neu-link" target="_blank"
      className="list-group-item bg-black border-0 text-center">
        <img src="/images/NEU.png" width="75px" />
      </a>
      <Link to="/Kanbas/Account" id="wd-account-link"
      className={isSelected("/Kanbas/Account/Signin") ? selectedClasses : defaultAcctClasses}>
        <FaRegCircleUser className={"fs-1 text " + (isSelected("/Kanbas/Account/Signin") ? "text-red" : "text-white")} /><br />
        Account
      </Link>
      <Link to="/Kanbas/Dashboard" id="wd-dashboard-link"
      className={isSelected('/Kanbas/Dashboard') ? selectedClasses : unselectedClasses}>
        <AiOutlineDashboard className="fs-1 text-danger" /><br />
        Dashboard
      </Link>
      <Link to="/Kanbas/Dashboard" id="wd-course-link"
      className={isSelected('/Kanbas/Dashboard') ? selectedClasses : unselectedClasses}>
        <LiaBookSolid className="fs-1 text-danger" /><br />
        Courses
      </Link>
      <Link to="/Kanbas/Calendar" id="wd-calendar-link"
      className={isSelected("/Kanbas/Calendar") ? selectedClasses : unselectedClasses}>
        <IoCalendar className="fs-1 text-danger" /><br />
        Calendar
        </Link>
      <Link to="/Kanbas/Inbox" id="wd-inbox-link"
      className={isSelected("/Kanbas/Inbox") ? selectedClasses : unselectedClasses}>
        <FaInbox className="fs-1 text-danger" /><br />
        Inbox
      </Link>
      <Link to="/Labs" id="wd-labs-link"
      className={isSelected("/Labs") ? selectedClasses : unselectedClasses}>
        <LiaCogSolid className="fs-1 text-danger" /><br />
        Labs
      </Link>
    </div>
  );
};

export default KanbasNavigation;

