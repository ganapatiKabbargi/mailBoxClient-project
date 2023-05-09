import React, { Fragment } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signupUser } from "../store/auth-actions";
import Navbar from "./Navbar";

const Signup = () => {
  const inputEmailRef = useRef("");
  const inputPasswordRef = useRef("");
  const inputConfirmPassword = useRef("");
  const history = useHistory();
  const dispatch = useDispatch();

  const signupHandler = (e) => {
    e.preventDefault();
    const enteredEmail = inputEmailRef.current.value;
    const enteredPassword = inputPasswordRef.current.value;
    const enteredConfirmPassword = inputConfirmPassword.current.value;

    const userDetails = {
      email: enteredEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    };
    dispatch(signupUser(userDetails, history));
  };

  const loginHandler = () => {
    history.push("/login");
  };

  return (
    <Fragment>
      <Navbar />
      <div
        className=" shadow w-25  rounded mx-auto  text-light"
        style={{
          background: " linear-gradient(to right, #42275a , #734b6d)",
          marginTop: "130px",
        }}
      >
        <form className=" w-100 p-3 " onSubmit={signupHandler}>
          <h2 className="text-center">SignUp</h2>
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
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              required
              ref={inputConfirmPassword}
            />
          </div>
          <div>
            <button
              className="btn w-100 mt-2 p-2 text-light"
              style={{
                background: " linear-gradient(to right, #02aab0 , #00cdac)",
              }}
            >
              Signup
            </button>
          </div>
        </form>
        <div>
          <button className="btn w-100 mb-2 text-light" onClick={loginHandler}>
            Already have an account? Login
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Signup;
