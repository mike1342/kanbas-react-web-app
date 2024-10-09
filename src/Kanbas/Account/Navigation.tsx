import { Link, useLocation } from "react-router-dom";
import '../styles.css';

const AccountNavigation: React.FC = () => {
    const location = useLocation();
  const classes = (path: string) => location.pathname === path ? "list-group-item active border border-0" : "list-group-item text-danger border border-0";
    return (
        <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
        <Link to={`/Kanbas/Account/Signin`} className={classes("/Kanbas/Account/Signin")}  > Signin  </Link> <br/>
        <Link to={`/Kanbas/Account/Signup`} className={classes("/Kanbas/Account/Signup")}  > Signup  </Link> <br/>
        <Link to={`/Kanbas/Account/Profile`} className={classes("/Kanbas/Account/Profile")} > Profile </Link> <br/>
        </div>
    );
};

export default AccountNavigation;
