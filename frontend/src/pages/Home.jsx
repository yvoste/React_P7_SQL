import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Home = () => {
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

  return (
    <div>
      <h1>Groupo</h1>
      {userInfo ? (
        <p>Welcome {userInfo ? userInfo.pseudo : ""}</p>
      ) : (
        <>
          <button onClick={() => connect("signup")} className="btn btn-primary">
            Sign Up
          </button>
          <button onClick={() => connect("login")} className="btn btn-primary">
            Login
          </button>
        </>
      )}
    </div>
  );
};
