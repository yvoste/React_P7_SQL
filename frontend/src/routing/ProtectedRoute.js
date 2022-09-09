import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const connect = (value) => {
    console.log(value); // change the static value by using setter
    if (value === "signup") {
      navigate("/register");
    } else {
      navigate("/login");
    }
  };

  // show unauthorized screen if no user is found in redux store
  if (!userInfo) {
    return (
      <div className="unauthorized">
        <h1>You must registered or logged to access</h1>
        <h2>please choose</h2>
        <button onClick={() => connect("signup")} className="btn btn-primary">
          Sign Up
        </button>
        <button onClick={() => connect("login")} className="btn btn-primary">
          Login
        </button>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
