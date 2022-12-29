import { authActions } from "./auth-reducer";

export const signupUser = (user) => {
  return async (dispatch, history) => {
    try {
      if (user.password === user.confirmPassword) {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCTKn5CsxdDR7yTIq_QV3sF2VVqgeq_qRE",
          {
            method: "POST",
            body: JSON.stringify({
              email: user.email,
              password: user.password,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          alert("Successfully Signed Up...");
          console.log("Successfully Signed Up...");
          history.push("/login");
        } else {
          let errorMessage = "Authentication Failed...";
          throw new Error(errorMessage);
        }
      } else {
        alert("Password Incorrect");
      }
    } catch (err) {
      alert(err.message);
    }
  };
};

export const loginUser = (user) => {
  return async (dispatch, history) => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCTKn5CsxdDR7yTIq_QV3sF2VVqgeq_qRE",
        {
          method: "POST",
          body: JSON.stringify({
            email: user.email,
            password: user.password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );

      if (response.ok) {
        const data = response.json();
        dispatch(authActions.login(data.idToken));
        history.replace("/inbox");
        console.log(data);
        localStorage.setItem("email", data.email.replace(/[.]/g, ""));
        alert("logged in successfully");
      } else {
        let errorMessage = "login failed...";
        throw new Error(errorMessage);
      }
    } catch (err) {
      alert(err.message);
    }
  };
};
