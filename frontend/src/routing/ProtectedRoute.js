import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { userInfo } = useSelector((state) => state.user);

  // show unauthorized screen if no user is found in redux store
  if (!userInfo) {
    return (
      <div className="unauthorized">
        <h1>You must logged to access</h1>
        <span>
          <Link to="/">Home</Link>
        </span>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
