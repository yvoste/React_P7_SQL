import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../styles/card.css";

export const Card = ({ article }) => {
  const { userInfo } = useSelector((state) => state.user);

  const doneLiked = article.users_like.includes(userInfo.id_user) ? 1 : 0;
  const doneDisliked = article.users_dislike.includes(userInfo.id_user) ? 1 : 0;

  const navigate = useNavigate();

  const author = {
    id: article.user_id,
    pseudo: article.pseudo,
    bio: article.bio ? article.bio : "",
    avatar: article.avatar,
  };

  const goToUserDetail = () => {
    navigate("/user-details", { state: { author } });
  };

  const delArticle = (id) => {
    console.log(id);
  };

  const addReactions = (react, id) => {
    console.log(react, id);
  };

  const editArticle = (id) => {
    console.log(id);
    const idA = {
      idArt: id,
    };
    console.log(idA);
    navigate("/edit", { state: { idA } });
  };

  return (
    <div className="bloc-card col-sm-11 col-md-5 col-lg-3 p-3">
      <div
        className="card-tit-pseud"
        onClick={() => goToUserDetail(article.user_id)}
      >
        <div className="author">
          <div className="author-det">
            <img id="thumbList" src={article.avatar} alt="" />
            <h6 className="pseud">{article.pseudo}</h6>
            <p className="userRole">{article.isAdmin ? "Admin" : "User"}</p>
          </div>
          <p className="card-date">{article.dateUpdate}</p>
        </div>
      </div>
      <div className="card-content">
        {article.img && (
          <img className="card-img-top" src={article.img} alt={article.name} />
        )}
        <div className="card-body">
          <div className="card-tit-pseud">
            <h5 className="card-title">{article.title}</h5>
          </div>
          <p className="card-text">{article.content}</p>
        </div>
      </div>

      <div className="d-flex">
        {/* la logique : si le user a deja cliqué il faut envoyer 0 sinon 1 ou -1*/}
        <div id="reacts" disable="{disabled}">
          <span className="reaction">
            {article.likes}
            {doneDisliked ? (
              <i className="material-icons left matI grisor">thumb_up</i>
            ) : (
              <i
                className="material-icons left matI verdor"
                onClick={() =>
                  addReactions(doneLiked === 1 ? 0 : 1, article.id)
                }
              >
                thumb_up
              </i>
            )}
          </span>
          {/* addReactions come from Parent component like a prop but it's a callback function which change nb like or dislike and change the state items to false from true then useEffect reload data in parent*/}
          <span className="reaction">
            {article.dislikes}
            {doneLiked ? (
              <i className="material-icons left matI grisor">thumb_down</i>
            ) : (
              <i
                className="material-icons left matI redor"
                onClick={() =>
                  addReactions(doneDisliked === 1 ? 0 : -1, article.id)
                }
              >
                thumb_down
              </i>
            )}
          </span>
        </div>

        {userInfo.isAdmin || userInfo.id_user === article.user_id ? (
          <div>
            <i
              className="material-icons left customEdit"
              onClick={() => editArticle(article.id)}
            >
              edit
            </i>

            <i
              className="material-icons left customDel"
              onClick={() => delArticle(article.id)}
            >
              delete_sweep
            </i>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};
