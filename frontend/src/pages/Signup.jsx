import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Error } from "../components";
import { registerUser } from "../store/userActions";

export const Signup = () => {
  const [customError, setCustomError] = useState(null);

  const { loading, userInfo, error, success } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo, success]);

  const submitForm = (data) => {
    // check if passwords match
    if (data.password !== data.confirmPassword) {
      setCustomError("Password mismatch");
      return;
    }
    // transform email string to lowercase to avoid case sensitivity issues in login
    data.email = data.email.toLowerCase();

    dispatch(registerUser(data));
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {error && <Error>{error}</Error>}
      {customError && <Error>{customError}</Error>}
      <div className="form-group">
        <label htmlFor="pseudo">Pseudo</label>
        <input
          type="text"
          className="form-input"
          {...register("pseudo")}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-input"
          {...register("email")}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-input"
          {...register("password")}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Confirm Password</label>
        <input
          type="password"
          className="form-input"
          {...register("confirmPassword")}
          required
        />
      </div>
      <button type="submit" className="button" disabled={loading}>
        Register
      </button>
    </form>
  );
};
