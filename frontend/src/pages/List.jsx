import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "../components";
import { getArticles } from "../store/articleActions";
import "../styles/list.css";

export const List = () => {
  const { articles } = useSelector((state) => state.articles);
  const { userInfo } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [pseudo] = useState(userInfo.pseudo);
  const [avatar] = useState(userInfo.avatar);

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
          {articles?.map((article, index) => (
            // transmission des props au composant enfant pour chaque tour key  +  content + callback + values
            <Card key={article.id} article={article} indexo={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
