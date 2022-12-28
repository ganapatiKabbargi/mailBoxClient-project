import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "../store/auth-reducer";

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.replace("/login");
  };
  return (
    <nav className="navbar navbar-light bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand">E-Mail</a>
        <form className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
          <button className="btn" onClick={logoutHandler}>
            Logout
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
