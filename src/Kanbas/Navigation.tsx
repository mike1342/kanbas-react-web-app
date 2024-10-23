import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendar } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
const KanbasNavigation: React.FC = () => {

  const location = useLocation();
  const isSelected = (path: string) => location.pathname.includes(path);
  const selectedClasses = "list-group-item text-center border-0 bg-white text-danger";
  const unselectedClasses = "list-group-item text-white bg-black text-center border-0";
  const defaultAcctClasses = "list-group-item text-center border-0 bg-black text-white";

  const links = [
    { label: "Dashboard", path: "/Kanbas/Dashboard", icon: AiOutlineDashboard },
    { label: "Courses",   path: "/Kanbas/Dashboard", icon: LiaBookSolid },
    { label: "Calendar",  path: "/Kanbas/Calendar",  icon: IoCalendar },
    { label: "Inbox",     path: "/Kanbas/Inbox",     icon: FaInbox },
    { label: "Labs",      path: "/Labs",             icon: LiaCogSolid },
  ];


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

      {
        links.map((link) => (
          <Link key={link.path} to={link.path} id={"wd-" + link.label.toLowerCase() + "-link"}
          className={isSelected(link.path) ? selectedClasses : unselectedClasses}>
            {link.icon({ className: "fs-1 text-danger" })}<br />
            {link.label}
          </Link>
        ))
      }
    </div>
  );
};

export default KanbasNavigation;

