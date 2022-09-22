import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Hero from "../../components/Hero/Hero";
// import FeedNav from "./FeedNav";
import FeedNav from "../../components/FeedNav/FeedNav";
import Posts from "../../components/Posts/Posts";
import Sidebar from "../../components/Sidebar/Sidebar";
import Pagination from "../../components/Pagination/Pagination";
import { articlesURL } from "../../config/config";
// import Pagination from "./Pagination";
import { updateArticles, updatePageIndex } from "../../redux/reducer/articles";

function Home(props) {
  const { updateArticles, articlesInfo, updatePageIndex } = props;
  let {
    articles,
    error,
    articlesCount,
    articlePerPage,
    activePageIndex,
    activeTag,
  } = articlesInfo;

  const [state, setState] = useState({
    // articles: null,
    // error: null,
    // articlesCount: 0,
    // articlePerPage: 10,
    // activePageIndex: 1,
    activeTab: "",
    activeTag: "",
    author: "",
  });

  useEffect(() => {
    fetchData();
  }, [state.activePageIndex, state.activeTab, state.activeTag]);

  const fetchData = () => {
    const limit = articlePerPage;
    const offset = (activePageIndex - 1) * limit;
    const tag = state.activeTab;
    const author = state.author;

    fetch(
      articlesURL +
        `/?offset=${offset}&limit=${limit}` +
        (tag && `&tag=${tag}`) +
        (author && `&author=${author}`)
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((data) =>
        updateArticles({
          articles: data.articles,
          error: "",
          articlesCount: data.articlesCount,
        })
      )
      .catch((error) =>
        setState({
          error: error,
        })
      );
  };

  const changeIndex = (index) => {
    console.log("hello", index);
    updatePageIndex({
      activePageIndex: index,
    });
  };

  const emptyTab = () => {
    setState({
      activeTab: "",
      activeTag: "",
      author: "",
    });
  };

  const addTab = (value) => {
    setState({
      activeTab: value,
      activeTag: "",
    });
  };

  const yourFeedFn = (author) => {
    setState({
      author,
      activeTag: "your feed",
    });
  };

  const favoriteArticle = (slug) => {
    fetch(articlesURL + `/${slug}/favorite`, {
      method: "POST",
      headers: {
        authorization: `Token ${props.user.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then(({ article }) => {
        fetchData();
      });
  };

  const unFavoriteArticle = (slug) => {
    fetch(articlesURL + `/${slug}/favorite`, {
      method: "DELETE",
      headers: {
        authorization: `Token ${this.props.user.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then(({ article }) => {
        fetchData();
      });
  };

  const { isLogedInUser, user } = props;

  return (
    <>
      <main>
        <Hero />
        <section className="py-8">
          <div className="container flex justify-between ">
            <div className="flex-60">
              <FeedNav
                activeTab={state.activeTab}
                emptyTab={emptyTab}
                isLogedInUser={isLogedInUser}
                user={user}
                yourFeedFn={yourFeedFn}
                activeTag={activeTag}
              />
              <Posts
                articles={articles}
                error={error}
                favoriteArticle={favoriteArticle}
                unFavoriteArticle={unFavoriteArticle}
              />
              <Pagination
                articlePerPage={articlePerPage}
                articlesCount={articlesCount}
                activePageIndex={activePageIndex}
                changeIndex={changeIndex}
              />
            </div>
            <Sidebar addTab={addTab} />
          </div>
        </section>
      </main>
    </>
  );
}

const mapStateToProps = (state) => ({
  articlesInfo: state.articles,
});
const mapDispatchToProps = {
  updateArticles,
  updatePageIndex,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
