import React, { useState } from "react";
import "./App.scss";
import RoutesCom from "./js/routes/Routes";
import Loader from "./js/components/Loader/Loader";
import { useEffect } from "react";
import user, { updateUserInfo } from "./js/redux/reducer/user";
import { userUrl } from "./js/config/config";
import { connect } from "react-redux";

function App(props) {
  const { updateUserInfo, user } = props;
  const [authResolved, setAuthResolved] = useState(false);

  const state = {
    isLogedInUser: false,
    user: null,
    isVerifying: true,
    article: null,
    params: {
      username: "",
    },
    profile: null,
  };

  useEffect(() => {
    let storageKey = localStorage["localStorageUser"];
    if (storageKey) {
      fetch(userUrl, {
        method: "GET",
        headers: {
          authorization: `Token ${storageKey}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        })
        .then(({ user }) => {
          updateUserInfo({
            isLogedInUser: true,
            user,
            isVerifying: false,
            profile: user,
          });
          localStorage.setItem("localStorageUser", user.token);
          setAuthResolved(true);
        })
        .catch((errors) => {
          console.log(errors);
          setAuthResolved(true);
        });
    } else {
      // setState({
      //   isVerifying: false,
      // });
      setAuthResolved(true);
    }
  }, []);

  const logout = () => {
    this.setState({
      isLogedInUser: false,
      user: null,
      isVerifying: false,
    });
    localStorage.clear();
    let { history } = this.props;
  };

  const editArticleFn = (article) => {
    console.log(article);
    this.setState({
      article,
    });
  };

  return authResolved ? <RoutesCom isAuth={user.isLogedInUser} /> : <Loader />;
}

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = {
  updateUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
