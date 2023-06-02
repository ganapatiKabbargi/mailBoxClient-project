import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "../store/auth-reducer";
import { SiGmail } from "react-icons/si";

const Navbar = () => {
  const logedIn = useSelector((state) => state.auth.isLogedIn);
  const dispatch = useDispatch();
  const history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    dispatch(authActions.logout());
    history.replace("/login");
  };

  console.log("Navbar RUNNING...");
  return (
    <nav
      className="navbar navbar-light  shadow "
      style={{
        background: " linear-gradient(to right, #ad5389 , #3c1053)",
        position: "fixed",
        width: "100%",
        top: "0px",
      }}
    >
      <div className="container-fluid" style={{ height: "60px" }}>
        <a className="navbar-brand text-white fs-2 fw-bold">
          {" "}
          <SiGmail className="me-5 mb-2" style={{ color: "red" }} />
          MailBox Client
        </a>
        <form className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-light" type="submit">
            Search
          </button>

          {logedIn && (
            <button
              className="btn fs-5 text-white ms-5"
              onClick={logoutHandler}
            >
              Logout
            </button>
          )}
        </form>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);
