import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../store/userActions";
import { useEffect, useContext } from "react";
import { UserContext } from "../context/useContext";
import { Error } from "../components";

export const Login = () => {
  const { loading, userInfo, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const { feedback, toggleFeed } = useContext(UserContext);

  // redirect authenticated user to profile screen
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitForm = async (data) => {
    // call Redux Thunk
    /*
    Thunk est un concept de programmation dans lequel une fonction est utilisée pour retarder l'évaluation/le calcul d'une opération. Redux Thunk est un middleware qui vous permet de faire un appel à l'action auprès des créateurs qui renvoie une fonction au lieu d'un objet d'action.
    */
    try {
      const resultAction = await dispatch(userLogin(data)).unwrap(); // unwrap permet de récupérer l'object renvoyer par thunk pour le traiter
      // handle result here
      console.log(resultAction);
      const type = "success";
      const msg = "successfully logged user";
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
      <button type="submit" className="button" disabled={loading}>
        Login
      </button>
    </form>
  );
};
