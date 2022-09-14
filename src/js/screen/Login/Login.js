import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loginURL } from "../../config/config";
function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
    errors: {
      email: "",
      password: "",
    },
  });

  //handle change for the input field
  const handleChange = (event) => {
    const { value, name } = event.target;
    const errors = { ...data.errors };
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
      default:
        break;
    }
    setData({
      [name]: value,
      errors,
    });
  };

  //handler submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, errors } = data;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: { email, password } }),
    };
    try {
      const response = await fetch(loginURL, requestOptions);
      if (!response.ok) {
        const jsonData = await response.json();
        setData((preState) => {
          return {
            ...preState,
            errors: {
              ...preState.errors,
              email: "Email and password is incorrect",
            },
          };
        });
        throw new Error("data do not  fetch");
      }
      let user = await response.json();
      let { history } = this.props;
      this.props.isLogedInUserFn(user["user"]);
      history.push("/");
    } catch (error) {
      console.log({ error });
    }
  };

  let { email, password, errors } = data;

  return (
    <section className="py-16">
      <div className="container flex justify-center items-center ">
        <form
          action=""
          className="p-8 shadow-lg border rounded-xl width-40"
          onSubmit={handleSubmit}
        >
          <legend className="text-4xl text-center mb-4">Login</legend>
          <Link to="/signup">
            <p className="text-center text-green-500">Need an account?</p>
          </Link>
          <div className="mt-16">
            <div className="mb-4">
              <input
                type="email"
                name="email"
                id=""
                placeholder="Email"
                className="block border-2 py-2 px-4 rounded  w-full"
                value={email}
                onChange={handleChange}
              />
              <span className="mb-4 text-red-500">{errors.email}</span>
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                id=""
                placeholder="Password"
                className="block border-2 py-2 px-4 rounded w-full "
                value={password}
                onChange={handleChange}
              />
              <span className="text-red-500">{errors.password}</span>
            </div>
            <div className="text-right">
              <input
                type="submit"
                value="Sign In"
                className="bg-green-500 px-4 py-2 rounded text-white font-bold"
                disabled={errors.email || errors.password}
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
