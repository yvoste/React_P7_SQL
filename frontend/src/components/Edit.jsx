import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { updateArticle } from "../store/articleActions";
import { Error } from "../components";
import { useState, useEffect } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import "../styles/profil.css";

export const Edit = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const location = useLocation();
  const { idArt } = location.state?.idA;

  console.log(idArt);

  const { loading, articles, error } = useSelector((state) => state.articles);

  const art = articles.find(({ id }) => id === idArt);

  console.log(art);

  const [customError] = useState(null);

  const [selectedFile] = useState();

  // defaul value of textarea in rows
  const [textareaheight, setTextareaheight] = useState(4);

  const [title, setTitle] = useState(art.title);
  const [content, setContent] = useState(art.content);
  const [img] = useState(art.img);
  const [image] = useState(art.image);

  const { register, handleSubmit } = useForm();
  let formData = new FormData();

  const updateValue = (e) => {
    if (e.target.name === "content") {
      const height = e.target.scrollHeight;
      const rows = e.target.rows;
      const rowHeight = 15; // arbitraire
      const trows = Math.ceil(height / rowHeight) - 1;
      console.log(height, rows, trows);
      if (trows < textareaheight) {
        setTextareaheight(trows);
      }
      let content = e.target.value;
      console.log(content);
      setContent(content);
    } else {
      let title = e.target.value;
      console.log(title);
      setTitle(title);
    }
  };

  const onSubmit = (data) => {
    console.log(data);

    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("user_id", art.user_id);
    formData.append("image", art.image);
    formData.append("idMessage", idArt);

    // One possibilty to watch formData
    // formData.forEach((value, key) => {
    //   console.log(key + "__" + value);
    // });

    const bidouble = {
      data: formData,
      articles: articles,
    };

    dispatch(updateArticle(bidouble))
      .then(unwrapResult)
      .then((obj) => {
        console.log({ obj });
        navigate("/list");
      })
      .catch((obj) => console.log({ objErr: obj }));
  };

  // redirect authenticated user to profile screen
  // useEffect(() => {
  //   if (userInfo) {
  //     navigate("/");
  //   }
  // }, [navigate, userInfo]);

  const handleFileChange = (e) => {
    if (document.getElementById("thumbi") !== null) {
      document.getElementById("thumbi").remove();
    }
    let img = document.createElement("img");
    img.setAttribute("id", "thumbi");
    img.setAttribute("class", "mini");
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
    document.getElementById("thumbi").remove();
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
    <div className="d-flex justify-content-center extraSize">
      <form onSubmit={handleSubmit(onSubmit)} className="col-10 sign-up-form">
        {error && <Error>{error}</Error>}
        {customError && <Error>{customError}</Error>}
        <div className=" mb-3 specEdit">
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
        <div className=" mb-3 specEdit">
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
            rows={textareaheight}
            onChange={(e) => updateValue(e)}
          />
        </div>
        <div className="mb-3 specImg">
          <div className="">
            <span id="preview" className="mini"></span>
            {img && <img id="thumbi" className="mini" src={img} alt="" />}
          </div>
          <label htmlFor="content" className="form-label">
            {image ? "Changer l'image" : "Ajouter une image"}
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
