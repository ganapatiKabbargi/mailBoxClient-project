import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "../store/auth-reducer";

const Login = () => {
  const inputEmailRef = useRef("");
  const inputPasswordRef = useRef("");
  const history = useHistory();
  const dispatch = useDispatch();

  const loginHandler = (e) => {
    e.preventDefault();
    const enteredEmail = inputEmailRef.current.value;
    const enteredPassword = inputPasswordRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCTKn5CsxdDR7yTIq_QV3sF2VVqgeq_qRE",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "Application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          let errorMessage = "login failed...";
          throw new Error(errorMessage);
        }
      })
      .then((data) => {
        alert("logged in successfully");

        dispatch(authActions.login(data.idToken));
        history.replace("/compose");
        console.log(data);
        localStorage.setItem("email", data.email.replace(/[.]/g, ""));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const signupHandler = () => {
    history.push("/signup");
  };
  return (
    <div className=" shadow w-25  rounded m-auto mt-5">
      <form className=" w-100 p-3 " onSubmit={loginHandler}>
        <h2 className="text-center">Login</h2>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            required
            ref={inputEmailRef}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            required
            ref={inputPasswordRef}
          />
        </div>

        <div>
          <button className="btn btn-primary w-100 mt-2 p-2">Login</button>
        </div>
      </form>
      <div>
        <button className="btn w-100 mb-2 text-primary">
          Forgot Password?
        </button>
      </div>
      <div>
        <button className="btn w-100 mb-2 " onClick={signupHandler}>
          Dont have an account? SignUp
        </button>
      </div>
    </div>
  );
};

export default Login;
