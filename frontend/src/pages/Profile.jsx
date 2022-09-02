import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { getUserDetails, setUserDetails } from "../store/userActions";
import { Error } from "../components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/profil.css";

export const Profile = () => {
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.user
  );
  const [customError, setCustomError] = useState(null);
  const [selectedFile] = useState();
  const navigate = useNavigate();
  const [pseudo, setPseudo] = useState(userInfo.pseudo);
  const [bio, setBio] = useState(userInfo.bio);
  const [avatar] = useState(userInfo.avatar);

  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  let formData = new FormData();

  // useEffect(() => {
  //   if (userInfo) {
  //     console.log(userInfo);
  //     dispatch(getUserDetails(userInfo.id_user));
  //   }
  // }, [userInfo, dispatch]);

  const updateValue = (e) => {
    if (e.target.name === "bio") {
      let bio = e.target.value;
      console.log(bio);
      setBio(bio);
    } else {
      let pseudo = e.target.value;
      console.log(pseudo);
      setPseudo(pseudo);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    formData.append("pseudo", data.pseudo);
    formData.append("bio", data.bio);
    formData.append("userId", data.userId);

    // One possibilty to watch formData
    formData.forEach((value, key) => {
      console.log(key + "__" + value);
    });
    console.log(typeof formData);

    const { post } = dispatch(setUserDetails(formData));
    //toggleLoader(false);
    if (post) {
      navigate("/");
    }
  };

  const handleFileChange = (e) => {
    if (document.getElementById("thumb") !== null) {
      document.getElementById("thumb").remove();
    }
    let img = document.createElement("img");
    img.setAttribute("id", "thumb");
    if (e.target && e.target.files[0]) {
      formData.append("file", e.target.files[0], e.target.files[0].name);
    }
    img.file = e.target.files[0];
    let preview = document.getElementById("preview");
    preview.appendChild(img);
    let reader = new FileReader();
    reader.onload = (function (aImg) {
      return function (e) {
        aImg.src = e.target.result;
      };
    })(img);
    reader.readAsDataURL(e.target.files[0]);
    changeClass();
  };

  const handleDel = () => {
    console.log("delete");
    changeClass();
    formData.delete("image");
    document.getElementById("thumb").remove();
    if (document.getElementById("errorsFile") !== null) {
      document.getElementById("errorsFile").textContent = "";
    }
  };

  /** Toggle class to display trash or not */
  const changeClass = () => {
    const elem = document.getElementById("manipTrash");
    if (elem.classList.contains("hide")) {
      elem.classList.remove("hide");
      elem.classList.add("show");
    } else if (elem.classList.contains("show")) {
      elem.classList.remove("show");
      elem.classList.add("hide");
    }
  };

  return (
    <div className="d-flex justify-content-center">
      {userInfo && (
        <form onSubmit={handleSubmit(onSubmit)} className="col-10 sign-up-form">
          {error && <Error>{error}</Error>}
          {customError && <Error>{customError}</Error>}
          <div className=" mb-3">
            <input
              {...register("userId")}
              type="hidden"
              name="userId"
              id="userId"
              value={userInfo.id_user}
              onChange={(e) => updateValue(e)}
            />
          </div>
          <div className=" mb-3">
            <label htmlFor="pseudo" className="form-label">
              Pseudo
            </label>
            <input
              {...register("pseudo")}
              placehoder="pseudo"
              type="text"
              name="pseudo"
              id="pseudo"
              value={pseudo}
              onChange={(e) => updateValue(e)}
            />
          </div>
          <div className=" mb-3">
            <label htmlFor="bio" className="form-label">
              Bio
            </label>
            <textarea
              {...register("bio")}
              placehoder="bio"
              type="textarea"
              name="bio"
              id="bio"
              value={bio}
              onChange={(e) => updateValue(e)}
            />
          </div>
          <div className="mb-3">
            <div className="">
              <span id="preview"></span>
              {avatar && <img id="thumb" src={avatar} alt="" />}
            </div>
            <input
              {...register("fileupload")}
              type="file"
              value={selectedFile}
              id="fileupload"
              name="fileupload"
              style={{ display: "none" }}
              onChange={(e) => handleFileChange(e)}
            />
            <label
              id="filelabel"
              htmlFor="fileupload"
              style={{ cursor: "pointer" }}
            >
              BROWSER
              <i className="material-icons left editI">cloud_upload</i>
            </label>
          </div>
          <div id="manipTrash" className="hide">
            <label
              id="filelabel"
              htmlFor="fileupload"
              style={{ cursor: "pointer" }}
            >
              DELETE
              <i
                id="removeTrash"
                className="material-icons left matI customDel"
                onClick={() => handleDel()}
              >
                delete_sweep
              </i>
            </label>
          </div>
          <button type="submit" className="button" disabled={loading}>
            Register
          </button>
        </form>
      )}
    </div>
  );
};