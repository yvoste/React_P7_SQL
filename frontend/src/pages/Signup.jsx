import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/useContext";
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

  const { feedback, toggleFeed } = useContext(UserContext);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo, success]);

  const submitForm = async (data) => {
    // check if passwords match
    if (data.password !== data.confirmPassword) {
      setCustomError("Password mismatch");
      return;
    }
    // transform email string to lowercase to avoid case sensitivity issues in login
    data.email = data.email.toLowerCase();

    // call Redux Thunk
    /*
    Thunk est un concept de programmation dans lequel une fonction est utilisée pour retarder l'évaluation/le calcul d'une opération. Redux Thunk est un middleware qui vous permet de faire un appel à l'action auprès des créateurs qui renvoie une fonction au lieu d'un objet d'action.
    */
    try {
      const resultAction = await dispatch(registerUser(data)).unwrap(); // unwrap permet de récupérer l'object renvoyer par thunk pour le traiter
      // handle result here
      console.log(resultAction);
      const type = "success";
      const msg = "successfully registered user";
      const state = true;
      const newFeed = { ...feedback, type, msg, state };
      toggleFeed(newFeed);
      navigate("/list");
    } catch (rejectedValueOrSerializedError) {
      // handle error here
      console.log(rejectedValueOrSerializedError);
      const type = "error";
      const msg = rejectedValueOrSerializedError;
      const state = true;
      const newFeed = { ...feedback, type, msg, state };
      toggleFeed(newFeed);
    }
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
