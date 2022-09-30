import React, { useEffect } from "react";
// import ProfileBanner from "./ProfileBanner";

import Posts from "../../components/Posts/Posts";
import Loader from "../../components/Loader/Loader";
import ProfileBanner from "./ProfileBanner";

import { userProfile, articlesURL } from "../../config/config";
import { useState } from "react";
import { connect } from "react-redux";

function Profile(props) {
  const { username, user } = props;
  const [state, setState] = useState({
    activeTab: "author",
    articles: null,
    error: "",
    profile: null,
    params: username,
  });

  console.log(state, "state");

  useEffect(() => {
    fetchData();
  }, [state.params]);

  const fetchProfile = () => {
    fetch(userProfile + `/${username}`)
      .then((data) => {
        if (!data.ok) {
          data.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return data.json();
      })
      .then(({ profile }) => {
        console.log(profile);
        setState((preState) => ({ ...preState, profile: { ...profile } }));
      })
      .catch((error) => console.log(error));
  };

  const fetchData = () => {
    const { activeTab } = state;
    fetch(articlesURL + `/?${activeTab}=${username}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Can not fatch data for specific user`);
        }
        return res.json();
      })
      .then((data) => {
        console.log({ data }, "datat");
        setState((preState) => ({ ...preState, articles: data.articles }));
      })
      .catch((error) => setState({ ...state, error: error }));
    fetchProfile();
  };

  const handleActivetab = (activeTab) => {
    setState({ ...state, activeTab: activeTab }, () => fetchData());
  };

  const handleFollow = (username, user) => {
    const requestOptions = {
      method: "POST",
      headers: {
        authorization: `Token ${user.token}`,
      },
    };
    fetch(userProfile + `/${username}/follow`, requestOptions)
      .then((data) => {
        if (!data.ok) {
          return data.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return data.json();
      })
      .then(({ profile }) => {
        fetchProfile();
      })
      .catch((errors) => console.log(errors));
  };

  const favoriteArticle = (slug) => {
    console.log(slug);
    fetch(articlesURL + `/${slug}/favorite`, {
      method: "POST",
      headers: {
        authorization: `Token ${user.token}`,
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
        console.log(article);
        fetchData();
      });
  };

  const unFavoriteArticle = (slug) => {
    console.log(slug, "unfav");
    fetch(articlesURL + `/${slug}/favorite`, {
      method: "DELETE",
      headers: {
        authorization: `Token ${user.token}`,
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

  //   if (!state.profile) {
  //     return <Loader />;
  //   }

  return (
    <>
      {state.profile ? (
        <>
          <ProfileBanner
            profile={state.profile}
            user={user ? user : ""}
            handleFollow={handleFollow}
          />
          <section className="py-8">
            <div className="container">
              <div className="border-b-2  pb-2">
                <ul className="flex">
                  <li className="mr-4">
                    <button
                      className={`${
                        state.activeTab === "author" ? "active" : ""
                      }`}
                      onClick={() => handleActivetab("author")}
                    >
                      My Article
                    </button>
                  </li>

                  <li className="mr-4">
                    <button
                      className={`${
                        state.activeTab === "favorited" ? "active" : ""
                      }`}
                      onClick={() => handleActivetab("favorited")}
                    >
                      Favorited Article{" "}
                    </button>
                  </li>
                </ul>
              </div>
              <Posts
                articles={state?.articles}
                unFavoriteArticle={unFavoriteArticle}
                favoriteArticle={favoriteArticle}
              />
            </div>
          </section>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps)(Profile);
