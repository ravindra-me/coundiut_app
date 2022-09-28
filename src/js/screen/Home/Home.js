import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

//import custom Component
import Hero from "../../components/Hero/Hero";
import FeedNav from "../../components/FeedNav/FeedNav";
import Posts from "../../components/Posts/Posts";
import Sidebar from "../../components/Sidebar/Sidebar";
import Pagination from "../../components/Pagination/Pagination";

//import config and data
import { articlesURL } from "../../config/config";

// import actions
import {
  updateArticles,
  updatePageIndex,
  updateActiveTag,
  updateAuthor,
  updateActiveTab,
} from "../../redux/reducer/articles";
import Loader from "../../components/Loader/Loader";

function Home(props) {
  const {
    updateArticles,
    articlesInfo,
    updatePageIndex,
    updateActiveTag,
    updateAuthor,
    updateActiveTab,
    isAuthorized,
    user,
  } = props;

  let {
    articles,
    error,
    articlesCount,
    articlePerPage,
    activePageIndex,
    activeTag,
    activeTab,
    author,
  } = articlesInfo;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [activePageIndex, activeTab, activeTag]);

  const fetchData = () => {
    const limit = articlePerPage;
    const offset = (activePageIndex - 1) * limit;
    const tag = activeTag;
    setLoading(true);
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
      .then((data) => {
        updateArticles({
          articles: data.articles,
          error: "",
          articlesCount: data.articlesCount,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const changeIndex = (index) => {
    updatePageIndex({
      activePageIndex: index,
    });
  };

  const emptyTab = () => {
    updateActiveTab({
      activeTab: "",
    });
    updateActiveTag({
      activeTag: "",
    });
    updateAuthor({
      author: "",
    });
  };

  const addTab = (value) => {
    updateActiveTab({
      activeTab: value,
    });
    updateActiveTag({
      activeTag: "",
    });
  };

  const yourFeedFn = (author) => {
    updateAuthor({
      author: author,
    });
    updateActiveTag({
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
  return (
    <>
      <main>
        <Hero />
        <section className="py-8">
          <div className="container flex justify-between ">
            <div className="flex-60">
              <FeedNav
                activeTab={activeTab}
                emptyTab={emptyTab}
                isLogedInUser={isAuthorized}
                user={user}
                yourFeedFn={yourFeedFn}
                activeTag={activeTag}
              />
              {!loading ? (
                <>
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
                </>
              ) : (
                <Loader />
              )}
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
  user: state.user,
});

const mapDispatchToProps = {
  updateArticles,
  updatePageIndex,
  updateActiveTag,
  updateAuthor,
  updateActiveTab,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
