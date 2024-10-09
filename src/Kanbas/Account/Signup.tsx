import { FC } from "react";
import { Link } from "react-router-dom";

const Signup: FC = () => {
    return (
        <div id="wd-signup-screen">
            <h3>Signup</h3>
            <input placeholder="username" className="form-control mb-2"/>
            <input placeholder="password" type="password" className="form-control mb-2"/>
            <Link to="/Kanbas/Account/Profile" className="btn btn-primary w-100">Sign up</Link>
            <Link to="/Kanbas/Account/Signin">Sign in</Link>
        </div>
    );
};

export default Signup;