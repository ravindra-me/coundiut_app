import React from "react";
// import Loader from "./Loader";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";
function Posts(props) {
  let { favoriteArticle, unFavoriteArticle, articles } = props;
  if (!articles) {
    return <Loader />;
  }
  if (articles.length < 1) {
    return <h1>No article here</h1>;
  }

  return articles.map((article, index) => (
    <Post
      key={index}
      article={article}
      favoriteArticle={favoriteArticle}
      unFavoriteArticle={unFavoriteArticle}
    />
  ));
}

export default Posts;
