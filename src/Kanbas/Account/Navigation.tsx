import { Link, useLocation } from "react-router-dom";
import '../styles.css';
import { useSelector } from "react-redux";

const AccountNavigation: React.FC = () => {
  const location = useLocation();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];

  const classes = (path: string) => location.pathname === path ? "list-group-item active border border-0" : "list-group-item text-danger border border-0";
  return (
      <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
        {links.map((link) => (
          <><Link to={`/Kanbas/Account/${link}`} className={classes(`/Kanbas/Account/${link}`)}> {link} </Link><br /></>
        ))}
        {currentUser && currentUser.role === "ADMIN" && (
        <Link to={`/Kanbas/Account/Users`} className={`${classes("/Kanbas/Account/Users")}`}> Users </Link> )}
      </div>
  );
};

export default AccountNavigation;
