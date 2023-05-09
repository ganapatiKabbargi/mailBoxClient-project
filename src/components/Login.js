import React, { Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "../store/auth-reducer";
import { loginUser } from "../store/auth-actions";
import { fetchEmailData } from "../store/email-actions";
import Navbar from "./Navbar";
import { themeActions } from "../store/theme-reducer";
import Loader from "../UI/Loader";

const Login = () => {
  const inputEmailRef = useRef("");
  const inputPasswordRef = useRef("");
  const history = useHistory();
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.theme.loader);

  const loginHandler = (e) => {
    dispatch(themeActions.showLoading());
    dispatch(themeActions.login());
    e.preventDefault();
    const enteredEmail = inputEmailRef.current.value;
    const enteredPassword = inputPasswordRef.current.value;

    const user = {
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
    };

    dispatch(loginUser(user, history));
  };

  const signupHandler = () => {
    history.push("/signup");
  };
  return (
    <Fragment>
      <Navbar />
      {loader && <Loader />}
      {!loader && (
        <div
          className=" shadow w-25  rounded mx-auto  text-light"
          style={{
            background: " linear-gradient(to right, #4e54c8 , #8f94fb)",
            marginTop: "130px",
          }}
        >
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
              <button
                className="btn w-100 mt-2 p-2 text-light"
                style={{
                  background: " linear-gradient(to right, #00b09b , #96c93b)",
                }}
              >
                Login
              </button>
            </div>
          </form>
          <div>
            <button className="btn w-100 mb-2 text-light">
              Forgot Password?
            </button>
          </div>
          <div>
            <button
              className="btn w-100 mb-2 text-light"
              onClick={signupHandler}
            >
              Dont have an account? SignUp
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Login;
