import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { updateArticle } from "../store/articleActions";
import { Error } from "../components";
import { useState, useContext } from "react";
import { UserContext } from "../context/useContext";
import "../styles/profil.css";

export const Edit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { register, handleSubmit } = useForm(); // hook react pour les formulaires controllés

  let formData = new FormData();

  // utilise location.state pour récupérer l'objet envoyer depuis Card => editArticle contentant id de l'article et l'index de l'article dans le store
  const { idArt, indexo } = location.state?.idA;

  const { loading, articles, error } = useSelector((state) => state.articles);
  const art = articles.find(({ id }) => id === idArt);

  const [customError] = useState(null);

  const [selectedFile] = useState();

  const { feedback, toggleFeed } = useContext(UserContext);

  // calcul de la hauteur du textarer si modification, valeur par default 6 rows
  const [textareaheight, setTextareaheight] = useState(6);

  const [title, setTitle] = useState(art.title); // variable avec setter
  const [content, setContent] = useState(art.content); // variable avec setter
  const [img] = useState(art.img);
  const [image] = useState(art.image);

  /**
   * Modifie la valuer des inputs concernés et la hauteur du textarea si il y lieu
   * @param {object} e
   */
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

  /**
   * Soumission du formulaire
   * @param {Object} data
   */
  const onSubmit = async (data) => {
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("user_id", art.user_id);
    formData.append("image", art.image);
    formData.append("idMessage", idArt);
    // One possibilty to watch formData
    // formData.forEach((value, key) => {
    //   console.log(key + "__" + value);
    // });
    const objectToTransmitted = {
      data: formData,
      articles: articles,
      indexo: indexo,
    };

    // call Redux Thunk
    /*
    Thunk est un concept de programmation dans lequel une fonction est utilisée pour retarder l'évaluation/le calcul d'une opération. Redux Thunk est un middleware qui vous permet de faire un appel à l'action auprès des créateurs qui renvoie une fonction au lieu d'un objet d'action.
    */
    try {
      const resultAction = await dispatch(
        updateArticle(objectToTransmitted)
      ).unwrap(); // unwrap permet de récupérer l'object renvoyer par thunk pour le traiter
      // handle result here
      console.log(resultAction);
      const type = "success";
      const msg = "successfully updated item";
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
