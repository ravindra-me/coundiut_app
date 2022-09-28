import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signupURL } from "../../config/config";
import { updateUserInfo } from "../../redux/reducer/user";

const initialState = {
  username: "",
  email: "",
  password: "",
  errors: {
    email: "",
    password: "",
    username: "",
  },
};

function SignUp(props) {
  const { updateUserInfo } = props;
  const [state, setState] = useState(initialState);
  const history = useNavigate();
  const handleChange = (event) => {
    const { value, name } = event.target;
    const errors = { ...state.errors };
    switch (name) {
      case "email":
        errors.email =
          value.indexOf("@") === -1 ? "Email does not contain @" : "";
        break;
      case "password":
        let passwordError;
        let vr = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/;
        if (value.length < 6) {
          passwordError = "password must b included 6 charecters";
        }
        if (!vr.test(value)) {
          passwordError =
            "password must be include 8 at least one letter, one number and one special character";
        }
        errors.password = passwordError;
        break;
      case "username":
        errors.username =
          value.length < 4 ? "username must be includes 5 characters" : "";
        break;
      default:
        break;
    }

    setState({
      ...state,
      [name]: value,
      errors,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, email, password, errors } = state;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: { username, email, password } }),
    };
    try {
      const response = await fetch(signupURL, requestOptions);
      if (!response.ok) {
        const jsonData = await response
          .json()
          .then(({ errors }) => {
            return Promise.reject(errors);
          })
          .catch((errors) =>
            setState({
              errors,
            })
          );
        throw new Error("data do not  fetch");
      }
      let { user } = await response.json();
      updateUserInfo({
        isLogedInUser: true,
        user,
        isVerifying: false,
        profile: user,
      });
      localStorage.setItem("localStorageUser", user.token);
      history("/");
    } catch (error) {
      console.log({ error });
    }
  };

  const { email, password, username, errors } = state;
  return (
    <section className="py-16">
      <div className="container flex justify-center items-center ">
        <form
          action=""
          className="p-8 shadow-lg border rounded-xl width-40"
          onSubmit={handleSubmit}
        >
          <legend className="text-4xl text-center mb-4 primary-heading">
            Sign Up
          </legend>
          <Link to="/login">
            <p className="text-center text-green-500">Have a account?</p>
          </Link>
          <div className="mt-16">
            <div className="mb-4">
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="block border-2 py-2 px-4 rounded  w-full"
                value={username}
                onChange={handleChange}
                required
              />
              <span className="mb-4 text-red-500">{errors.username}</span>
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="block border-2 py-2 px-4 rounded  w-full"
                value={email}
                onChange={handleChange}
                required
              />
              <span className="mb-4 text-red-500">{errors.email}</span>
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="block border-2 py-2 px-4 rounded w-full "
                value={password}
                onChange={handleChange}
                required
              />
              <span className="text-red-500">{errors.password}</span>
            </div>
            <div className="text-right">
              {errors.email || errors.password ? (
                ""
              ) : (
                <input
                  type="submit"
                  value="Sign Up"
                  className="bg-green-500 px-4 py-2 rounded"
                />
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = {
  updateUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
