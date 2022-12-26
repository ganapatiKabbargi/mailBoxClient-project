import React from "react";
import { useRef } from "react";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const inputEmailRef = useRef("");
  const inputPasswordRef = useRef("");
  const inputConfirmPassword = useRef("");
  const history = useHistory();

  const signupHandler = (e) => {
    e.preventDefault();
    const enteredEmail = inputEmailRef.current.value;
    const enteredPassword = inputPasswordRef.current.value;
    const enteredConfirmPassword = inputConfirmPassword.current.value;
    if (enteredPassword === enteredConfirmPassword) {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCTKn5CsxdDR7yTIq_QV3sF2VVqgeq_qRE",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (response.ok) {
            enteredEmail = "";
            enteredPassword = "";
            enteredConfirmPassword = "";
            return response.json();
          } else {
            let errorMessage = "Authentication Failed...";
            throw new Error(errorMessage);
          }
        })
        .then((data) => {
          alert("Successfully Signed Up...");
          console.log("Successfully Signed Up...");
          history.push("/login");
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      alert("Password Incorrect");
    }
  };

  const loginHandler = () => {
    history.push("/login");
  };

  return (
    <div className=" shadow w-25  rounded m-auto mt-5">
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
          <button className="btn btn-primary w-100 mt-2 p-2">Signup</button>
        </div>
      </form>
      <div>
        <button className="btn w-100 mb-2 " onClick={loginHandler}>
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};

export default Signup;
