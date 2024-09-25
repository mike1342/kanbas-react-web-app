import { FC } from "react";
import { Link } from "react-router-dom";

const Signup: FC = () => {
    return (
        <div id="wd-signup-screen">
            <h3>Sign up</h3>
            <input placeholder="username" /><br/>
            <input placeholder="password" type="password" /><br/>
            <input placeholder="verify password" type="password" /><br/>
            <Link to="/Kanbas/Account/Profile">Sign up</Link><br />
            <Link to="/Kanbas/Account/Signin">Sign in</Link>
        </div>
    );
};

export default Signup;