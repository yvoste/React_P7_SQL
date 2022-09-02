import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/userSlice";
import "../styles/header.css";

export const Nav = () => {
  const { userInfo } = useSelector((state) => state.user);
  console.log(userInfo);
  const dispatch = useDispatch();
  //console.log(getUserDetails());
  // automatically authenticate user if token is found
  // useEffect(() => {
  //   if (userToken) {
  //     dispatch(getUserDetails());
  //   }
  // }, [userToken, dispatch]);

  return (
    <header>
      <nav className="header-status">
        <>
          {!userInfo ? (
            <Link to="/" className="navbar-brand">
              Home
            </Link>
          ) : (
            <>
              <Link to="/" className="navbar-brand">
                Home
              </Link>
              <Link to="/user-profile">Profile</Link>
              <button className="button" onClick={() => dispatch(logout())}>
                Logout
              </button>
            </>
          )}
        </>
      </nav>
    </header>
  );
};
