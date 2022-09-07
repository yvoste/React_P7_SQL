import { useLocation, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { setUserDetails } from "../store/userActions";
import { Error } from "../components";
import { useState } from "react";
import "../styles/profil.css";

export const Edit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { title, content, img, image } = location.state?.article;
  console.log(title, content, img, image);

  const { loading, userInfo, error } = useSelector((state) => state.user);
  const [customError] = useState(null);
  const [selectedFile] = useState();

  const [id_user] = useState(userInfo.id_user);
  const [pseudo, setPseudo] = useState(userInfo.pseudo);
  const [bio, setBio] = useState(userInfo.bio);
  const [avatar] = useState(userInfo.avatar);

  const { register, handleSubmit } = useForm();
  let formData = new FormData();

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
    }
    // } else if (elem.classList.contains("show")) {
    //   elem.classList.remove("show");
    //   elem.classList.add("hide");
    // }
  };
  return (
    <div className="d-flex justify-content-center">
      <form onSubmit={handleSubmit(onSubmit)} className="col-10 sign-up-form">
        {error && <Error>{error}</Error>}
        {customError && <Error>{customError}</Error>}
        <div className=" mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            {...register("title")}
            placehoder="title"
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => updateValue(e)}
          />
        </div>
        <div className=" mb-3">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            {...register("content")}
            placehoder="content"
            type="textarea"
            name="content"
            id="content"
            value={content}
            onChange={(e) => updateValue(e)}
          />
        </div>
        <div className="mb-3">
          <div className="">
            <span id="preview"></span>
            {img && <img id="thumb" src={img} alt="" />}
          </div>
          <label htmlFor="content" className="form-label">
            {img ? "Changer l'image" : "Ajouter une image"}
          </label>
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
            <i className="material-icons left editI">cloud_upload</i>
            BROWSER
          </label>
        </div>
        <div id="manipTrash" className="hide">
          <i
            id="removeTrash"
            className="material-icons left matI customDel"
            onClick={() => handleDel()}
          >
            delete_sweep
          </i>
        </div>
        <button type="submit" className="button" disabled={loading}>
          UPDATE
        </button>
      </form>
    </div>
  );
};
