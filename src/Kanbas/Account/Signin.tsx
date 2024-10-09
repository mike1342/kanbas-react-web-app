import { Link } from "react-router-dom";

const Signin: React.FC = () => {
    return (
        <div id="wd-signin-screen">
            <h3>Signin</h3>
            <input id="wd-username" placeholder="username" className="form-control mb-2"/>
            <input id="wd-password" placeholder="password" className="form-control mb-2" type="password" />
            <Link id="wd-signin-btn" to="/Kanbas/Dashboard" className="btn btn-primary w-100"> Sign in </Link>
            <Link id="wd-signup-link" to="/Kanbas/Account/Signup">Sign up</Link>
        </div>
    );
};

export default Signin;