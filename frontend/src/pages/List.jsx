import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "../components";
import { getArticles } from "../store/articleActions";
import { useNavigate } from "react-router-dom";
import "../styles/list.css";

export const List = () => {
  const { loading, articles, error } = useSelector((state) => state.articles);
  const { userInfo } = useSelector((state) => state.user);
  const [id_user] = useState(userInfo.id_user);
  const dispatch = useDispatch();

  //const [posts, setPosts] = useState(null); // initial posts is empty

  //const [isAdmin] = useState(userInfo.isAdmin);
  const [pseudo] = useState(userInfo.pseudo);
  const [isConnect] = useState(userInfo.isConnect);
  const [avatar] = useState(userInfo.avatar);
  const navigate = useNavigate();

  useEffect(() => {
    if (!articles) {
      dispatch(getArticles());
      console.log(articles);
    }
  }, [articles, dispatch]);

  return (
    <div className="container-fluid">
      <div className="container-fluid">
        <div className="d-flex listEntete">
          <img id="thumbList" src={avatar} alt="" />
          <h3 className="display-3 text-dark">Hello {pseudo}</h3>
          <p className="userRole">{userInfo.isAdmin ? "Admin" : "User"}</p>
        </div>
        <div className="d-flex global_posts">
          {articles?.map((article) => (
            // transmission des props au composant enfant pour chaque tour key  +  content + callback + values
            <Card key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
};
