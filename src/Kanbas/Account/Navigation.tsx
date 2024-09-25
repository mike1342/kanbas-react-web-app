import { Link } from "react-router-dom";
const AccountNavigation: React.FC = () => {
    return (
        <div id="wd-account-navigation">
        <Link to={`/Kanbas/Account/Signin`}  > Signin  </Link> <br/>
        <Link to={`/Kanbas/Account/Signup`}  > Signup  </Link> <br/>
        <Link to={`/Kanbas/Account/Profile`} > Profile </Link> <br/>
        </div>
    );
};

export default AccountNavigation;
